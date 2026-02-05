---
title: Common Log Format (CLF) Formatter
---
Outputs Common Log Format lines. This formatter expects HTTP-style fields in `LogEvent.Properties`.

Required property keys
- `http.client_ip`
- `http.user`
- `http.request_line`
- `http.status_code`
- `http.response_bytes`

Optional property keys
- `http.ident`

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Logging;

public sealed class ClfLogEntryFormatter : ILogEntryFormatter
{
    public string Format(LogEvent logEvent)
    {
        var props = logEvent.Properties;

        var ip = GetString(props, "http.client_ip", "-");
        var ident = GetString(props, "http.ident", "-");
        var user = GetString(props, "http.user", "-");
        var request = GetString(props, "http.request_line", "-");
        var status = GetString(props, "http.status_code", "-");
        var bytes = GetString(props, "http.response_bytes", "-");

        var timestamp = FormatClfTimestamp(logEvent.Timestamp);
        return $"{ip} {ident} {user} [{timestamp}] \"{request}\" {status} {bytes}";
    }

    private static string GetString(IReadOnlyDictionary<string, object?> props, string key, string fallback)
    {
        if (props.TryGetValue(key, out var value) && value is not null)
        {
            return Convert.ToString(value, CultureInfo.InvariantCulture) ?? fallback;
        }

        return fallback;
    }

    private static string FormatClfTimestamp(DateTimeOffset timestamp)
    {
        var date = timestamp.ToString("dd/MMM/yyyy:HH:mm:ss", CultureInfo.InvariantCulture);
        var offset = FormatOffset(timestamp.Offset);
        return $"{date} {offset}";
    }

    private static string FormatOffset(TimeSpan offset)
    {
        var sign = offset < TimeSpan.Zero ? "-" : "+";
        var abs = offset.Duration();
        return $"{sign}{abs.Hours:00}{abs.Minutes:00}";
    }
}
```
