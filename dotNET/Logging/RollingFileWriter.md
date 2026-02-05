Background writer that drains a bounded channel, batches entries, rotates daily, rolls on size, and enforces a retention limit.

```csharp
using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace Logging;

internal readonly record struct LogEntry(DateTimeOffset Timestamp, string Text);

public sealed class RollingFileWriter : IDisposable
{
    private const string SequenceToken = "{sequence}";
    private static readonly Regex DateTokenRegex = new(
        "\{date:(?<format>[^}]+)\}",
        RegexOptions.Compiled | RegexOptions.CultureInvariant);
    private static readonly UTF8Encoding Utf8NoBom = new(encoderShouldEmitUTF8Identifier: false);

    private readonly RollingFileLoggerOptions options;
    private readonly Channel<LogEntry> channel;
    private readonly CancellationTokenSource cts = new();
    private readonly Task worker;
    private readonly int newLineByteCount;
    private readonly ILogEntryFormatter formatter;

    private StreamWriter? writer;
    private DateOnly currentDate;
    private string currentPath = string.Empty;
    private long currentSizeBytes;
    private int currentSequence;

    public RollingFileWriter(RollingFileLoggerOptions options, ILogEntryFormatter formatter)
    {
        this.options = options;
        this.formatter = formatter;
        newLineByteCount = Utf8NoBom.GetByteCount(Environment.NewLine);

        var fullMode = options.OverflowStrategy switch
        {
            LogQueueOverflowStrategy.Block => BoundedChannelFullMode.Wait,
            LogQueueOverflowStrategy.DropOldest => BoundedChannelFullMode.DropOldest,
            _ => BoundedChannelFullMode.DropWrite
        };

        channel = Channel.CreateBounded<LogEntry>(new BoundedChannelOptions(options.ChannelCapacity)
        {
            SingleReader = true,
            SingleWriter = false,
            FullMode = fullMode
        });

        worker = Task.Run(ConsumeAsync);
    }

    private bool IsSizeRotationEnabled => options.MaxFileSizeBytes.HasValue && options.MaxFileSizeBytes.Value > 0;

    public void Enqueue(LogEntry entry)
    {
        if (options.OverflowStrategy == LogQueueOverflowStrategy.Block)
        {
            channel.Writer.WriteAsync(entry, cts.Token).AsTask().GetAwaiter().GetResult();
            return;
        }

        channel.Writer.TryWrite(entry);
    }

    private async Task ConsumeAsync()
    {
        var reader = channel.Reader;
        var flushPeriod = TimeSpan.FromMilliseconds(options.FlushPeriodMilliseconds);
        var lastFlush = DateTimeOffset.UtcNow;

        try
        {
            while (await reader.WaitToReadAsync(cts.Token).ConfigureAwait(false))
            {
                var batchCount = 0;

                while (reader.TryRead(out var entry))
                {
                    WriteLine(entry);
                    batchCount++;

                    if (batchCount >= options.MaxBatchSize)
                    {
                        break;
                    }
                }

                if (batchCount > 0 && DateTimeOffset.UtcNow - lastFlush >= flushPeriod)
                {
                    writer?.Flush();
                    lastFlush = DateTimeOffset.UtcNow;
                }
            }
        }
        catch (OperationCanceledException)
        {
            // graceful shutdown
        }
        finally
        {
            writer?.Flush();
            writer?.Dispose();
        }
    }

    private void WriteLine(LogEntry entry)
    {
        EnsureWriter(entry.Timestamp);
        writer!.WriteLine(entry.Text);
        currentSizeBytes += Utf8NoBom.GetByteCount(entry.Text) + newLineByteCount;
    }

    private void EnsureWriter(DateTimeOffset timestamp)
    {
        var targetDate = options.UseUtcTimestamp ? DateOnly.FromDateTime(timestamp.UtcDateTime) : DateOnly.FromDateTime(timestamp.LocalDateTime);

        if (writer is null)
        {
            OpenWriter(timestamp, resetSequence: true);
            return;
        }

        if (options.RotateDaily && currentDate != targetDate)
        {
            CloseWriter();
            OpenWriter(timestamp, resetSequence: true);
            return;
        }

        if (IsSizeRotationEnabled && currentSizeBytes >= options.MaxFileSizeBytes!.Value)
        {
            CloseWriter();
            currentSequence++;
            OpenWriter(timestamp, resetSequence: false);
        }
    }

    private void OpenWriter(DateTimeOffset timestamp, bool resetSequence)
    {
        if (resetSequence)
        {
            currentSequence = 0;
        }

        currentDate = options.UseUtcTimestamp ? DateOnly.FromDateTime(timestamp.UtcDateTime) : DateOnly.FromDateTime(timestamp.LocalDateTime);

        while (true)
        {
            var path = ResolveFilePath(timestamp, currentSequence);
            var directory = Path.GetDirectoryName(path);
            if (!string.IsNullOrWhiteSpace(directory))
            {
                Directory.CreateDirectory(directory);
            }

            var stream = new FileStream(path, FileMode.Append, FileAccess.Write, FileShare.Read);
            var length = stream.Length;

            if (IsSizeRotationEnabled && length >= options.MaxFileSizeBytes!.Value)
            {
                stream.Dispose();
                currentSequence++;
                continue;
            }

            writer = new StreamWriter(stream, Utf8NoBom);
            currentPath = path;
            currentSizeBytes = length;

            if (length == 0 && formatter is ILogFileHeaderProvider headerProvider)
            {
                foreach (var headerLine in headerProvider.GetHeaderLines(timestamp))
                {
                    writer.WriteLine(headerLine);
                    currentSizeBytes += Utf8NoBom.GetByteCount(headerLine) + newLineByteCount;
                }
            }
            break;
        }

        ApplyRetention();
    }

    private void CloseWriter()
    {
        writer?.Flush();
        writer?.Dispose();
        writer = null;
    }

    private string ResolveFilePath(DateTimeOffset timestamp, int sequence)
    {
        var path = options.RotateDaily
            ? ResolveDailyPath(timestamp)
            : options.FilePathPattern;

        if (IsSizeRotationEnabled || path.Contains(SequenceToken, StringComparison.Ordinal))
        {
            var sequenceText = sequence.ToString("0000", CultureInfo.InvariantCulture);
            if (path.Contains(SequenceToken, StringComparison.Ordinal))
            {
                path = path.Replace(SequenceToken, sequenceText, StringComparison.Ordinal);
            }
            else
            {
                path = InsertSequenceBeforeExtension(path, sequenceText);
            }
        }

        return path;
    }

    private string ResolveDailyPath(DateTimeOffset timestamp)
    {
        var date = options.UseUtcTimestamp ? timestamp.UtcDateTime : timestamp.LocalDateTime;

        return DateTokenRegex.Replace(
            options.FilePathPattern,
            m => date.ToString(m.Groups["format"].Value, CultureInfo.InvariantCulture));
    }

    private static string InsertSequenceBeforeExtension(string path, string sequenceText)
    {
        var directory = Path.GetDirectoryName(path);
        var name = Path.GetFileNameWithoutExtension(path);
        var extension = Path.GetExtension(path);
        var fileName = $"{name}-{sequenceText}{extension}";
        return string.IsNullOrWhiteSpace(directory) ? fileName : Path.Combine(directory, fileName);
    }

    private void ApplyRetention()
    {
        if (!options.RetainedFileCountLimit.HasValue || options.RetainedFileCountLimit.Value <= 0)
        {
            return;
        }

        var directory = Path.GetDirectoryName(currentPath);
        if (string.IsNullOrWhiteSpace(directory))
        {
            return;
        }

        var searchPattern = BuildRetentionSearchPattern();
        var files = new DirectoryInfo(directory).GetFiles(searchPattern);
        if (files.Length <= options.RetainedFileCountLimit.Value)
        {
            return;
        }

        foreach (var file in files
            .OrderByDescending(f => f.LastWriteTimeUtc)
            .Skip(options.RetainedFileCountLimit.Value))
        {
            try
            {
                file.Delete();
            }
            catch (IOException)
            {
            }
            catch (UnauthorizedAccessException)
            {
            }
        }
    }

    private string BuildRetentionSearchPattern()
    {
        var fileNamePattern = Path.GetFileName(options.FilePathPattern);
        var pattern = DateTokenRegex.Replace(fileNamePattern, "*");

        if (pattern.Contains(SequenceToken, StringComparison.Ordinal))
        {
            pattern = pattern.Replace(SequenceToken, "*", StringComparison.Ordinal);
        }
        else if (IsSizeRotationEnabled)
        {
            pattern = InsertSequenceWildcard(pattern);
        }

        return pattern;
    }

    private static string InsertSequenceWildcard(string fileNamePattern)
    {
        var extension = Path.GetExtension(fileNamePattern);
        var name = Path.GetFileNameWithoutExtension(fileNamePattern);
        return string.IsNullOrWhiteSpace(extension)
            ? $"{name}-*"
            : $"{name}-*{extension}";
    }

    public void Dispose()
    {
        channel.Writer.TryComplete();
        cts.Cancel();
        worker.GetAwaiter().GetResult();
        cts.Dispose();
    }
}
```
