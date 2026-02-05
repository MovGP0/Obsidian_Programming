Defines configuration for the rolling file logger. This is the single place to tune file naming, rotation, buffering, and scope behavior.

Key behaviors
- Uses a file path pattern with a `{date:...}` token for daily rotation.
- Controls channel capacity and overflow strategy for high-throughput scenarios.
- Enables or disables scope output and scope-based filtering.
- Supports size-based rollover and retention.
- Allows pluggable formatters (text, JSONL, CLF, ELF, W3C, CEF).

```csharp
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace Logging;

public enum LogQueueOverflowStrategy
{
    Block,
    DropNewest,
    DropOldest
}

public sealed class RollingFileLoggerOptions
{
    /// <summary>
    /// Example: "logs/app-{date:yyyy-MM-dd}.log".
    /// </summary>
    public required string FilePathPattern { get; init; } = "logs/app-{date:yyyy-MM-dd}.log";

    public LogLevel MinimumLogLevel { get; init; } = LogLevel.Information;

    /// <summary>Use UTC timestamps instead of local time.</summary>
    public bool UseUtcTimestamp { get; init; } = true;

    /// <summary>If false, no rotation is performed even if the pattern contains a date token.</summary>
    public bool RotateDaily { get; init; } = true;

    /// <summary>
    /// Optional maximum file size in bytes. When reached, the logger rolls to the next sequence file.
    /// If the pattern does not contain "{sequence}", the writer appends "-0000" style suffixes.
    /// </summary>
    public long? MaxFileSizeBytes { get; init; }

    /// <summary>
    /// Optional maximum number of log files to keep for this pattern. Oldest files are deleted first.
    /// </summary>
    public int? RetainedFileCountLimit { get; init; }

    /// <summary>Bounded channel capacity for log events.</summary>
    public int ChannelCapacity { get; init; } = 50_000;

    public LogQueueOverflowStrategy OverflowStrategy { get; init; } = LogQueueOverflowStrategy.DropNewest;

    /// <summary>Maximum number of entries written per batch.</summary>
    public int MaxBatchSize { get; init; } = 512;

    /// <summary>Flush to disk at least every N milliseconds.</summary>
    public int FlushPeriodMilliseconds { get; init; } = 500;

    /// <summary>Include scopes in the rendered log line.</summary>
    public bool IncludeScopes { get; init; } = true;

    /// <summary>Maximum number of scope items written to a line.</summary>
    public int MaxScopeItems { get; init; } = 32;

    /// <summary>
    /// Optional custom formatter. If null, TextLogEntryFormatter is used.
    /// </summary>
    public ILogEntryFormatter? Formatter { get; init; }

    /// <summary>
    /// If provided, only log entries that have at least one matching scope string.
    /// Matching is case-insensitive substring matching.
    /// </summary>
    public IReadOnlyList<string>? RequiredScopes { get; init; }
}
```
