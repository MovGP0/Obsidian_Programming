---
title: ArcSight Common Event Format (CEF) Formatter
---
Outputs ArcSight Common Event Format (CEF). The header uses static device metadata; dynamic values are emitted as extensions.

```csharp
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Logging;

public sealed class CefLogEntryFormatterOptions
{
    public string DeviceVendor { get; init; } = "Custom";
    public string DeviceProduct { get; init; } = "RollingFileLogger";
    public string DeviceVersion { get; init; } = "1.0";
    public string SignatureId { get; init; } = "0";
    public string Name { get; init; } = "LogEvent";
    public int Severity { get; init; } = 5;
    public bool UseLogLevelSeverity { get; init; } = true;
    public bool IncludeMessageExtension { get; init; } = true;
}

public sealed class CefLogEntryFormatter : ILogEntryFormatter
{
    private readonly CefLogEntryFormatterOptions options;

    public CefLogEntryFormatter(CefLogEntryFormatterOptions? options = null)
    {
        this.options = options ?? new CefLogEntryFormatterOptions();
    }

    public string Format(LogEvent logEvent)
    {
        var severity = options.UseLogLevelSeverity
            ? MapSeverity(logEvent.LogLevel)
            : options.Severity;

        var header = string.Join("|", new[]
        {
            "CEF:0",
            EscapeHeader(options.DeviceVendor),
            EscapeHeader(options.DeviceProduct),
            EscapeHeader(options.DeviceVersion),
            EscapeHeader(options.SignatureId),
            EscapeHeader(options.Name),
            severity.ToString(CultureInfo.InvariantCulture)
        });

        var extensions = BuildExtensions(logEvent);
        return $"{header}|{extensions}";
    }

    private string BuildExtensions(LogEvent logEvent)
    {
        var sb = new StringBuilder(256);

        AppendExtension(sb, "rt", ((long)logEvent.Timestamp.ToUnixTimeMilliseconds()).ToString(CultureInfo.InvariantCulture));
        AppendExtension(sb, "cat", logEvent.CategoryName);
        AppendExtension(sb, "eventId", logEvent.EventId.Id.ToString(CultureInfo.InvariantCulture));

        if (!string.IsNullOrWhiteSpace(logEvent.EventId.Name))
        {
            AppendExtension(sb, "eventName", logEvent.EventId.Name);
        }

        if (options.IncludeMessageExtension)
        {
            AppendExtension(sb, "msg", logEvent.Message);
        }

        if (logEvent.Exception is not null)
        {
            AppendExtension(sb, "exception", logEvent.Exception.ToString());
        }

        foreach (var kvp in logEvent.Properties)
        {
            var key = kvp.Key;
            if (string.IsNullOrWhiteSpace(key))
            {
                continue;
            }

            var value = kvp.Value is null
                ? "-"
                : Convert.ToString(kvp.Value, CultureInfo.InvariantCulture) ?? "-";
            AppendExtension(sb, key, value);
        }

        return sb.ToString().TrimEnd();
    }

    private static void AppendExtension(StringBuilder sb, string key, string value)
    {
        sb.Append(key);
        sb.Append("=");
        sb.Append(EscapeExtensionValue(value));
        sb.Append(" ");
    }

    private static string EscapeHeader(string value)
    {
        return value.Replace("\\", "\\\\", StringComparison.Ordinal)
            .Replace("|", "\\|", StringComparison.Ordinal)
            .Replace("\r", "\\r", StringComparison.Ordinal)
            .Replace("\n", "\\n", StringComparison.Ordinal);
    }

    private static string EscapeExtensionValue(string value)
    {
        return value.Replace("\\", "\\\\", StringComparison.Ordinal)
            .Replace("=", "\\=", StringComparison.Ordinal)
            .Replace("\r", "\\r", StringComparison.Ordinal)
            .Replace("\n", "\\n", StringComparison.Ordinal);
    }

    private static int MapSeverity(LogLevel level)
    {
        return level switch
        {
            LogLevel.Trace => 0,
            LogLevel.Debug => 1,
            LogLevel.Information => 3,
            LogLevel.Warning => 5,
            LogLevel.Error => 8,
            LogLevel.Critical => 10,
            _ => 5
        };
    }
}
```
