---
title: W3C Extended Log Format (W3C) Formatter
---
Outputs W3C extended log format (IIS-style). The file header includes `#Version`, `#Date`, and `#Fields`.

Common property keys
- `http.client_ip`
- `http.user`
- `http.method`
- `http.uri_stem`
- `http.uri_query`
- `http.status_code`
- `http.response_bytes`
- `http.user_agent`
- `http.referer`

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Logging;

public sealed class W3cLogEntryFormatter : ILogEntryFormatter, ILogFileHeaderProvider
{
    public IReadOnlyList<string> Fields { get; init; } = new[]
    {
        "date",
        "time",
        "c-ip",
        "cs-username",
        "cs-method",
        "cs-uri-stem",
        "cs-uri-query",
        "sc-status",
        "sc-bytes",
        "cs(User-Agent)",
        "cs(Referer)"
    };

    public IEnumerable<string> GetHeaderLines(DateTimeOffset timestamp)
    {
        yield return "#Version: 1.0";
        yield return $"#Date: {timestamp.UtcDateTime:yyyy-MM-dd HH:mm:ss}";
        yield return "#Fields: " + string.Join(" ", Fields);
    }

    public string Format(LogEvent logEvent)
    {
        var values = Fields.Select(field => ResolveField(field, logEvent)).ToArray();
        return string.Join(" ", values);
    }

    private static string ResolveField(string field, LogEvent logEvent)
    {
        var props = logEvent.Properties;
        return field switch
        {
            "date" => logEvent.Timestamp.UtcDateTime.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
            "time" => logEvent.Timestamp.UtcDateTime.ToString("HH:mm:ss", CultureInfo.InvariantCulture),
            "c-ip" => GetString(props, "http.client_ip"),
            "cs-username" => GetString(props, "http.user"),
            "cs-method" => GetString(props, "http.method"),
            "cs-uri-stem" => GetString(props, "http.uri_stem"),
            "cs-uri-query" => GetString(props, "http.uri_query"),
            "sc-status" => GetString(props, "http.status_code"),
            "sc-bytes" => GetString(props, "http.response_bytes"),
            "cs(User-Agent)" => GetString(props, "http.user_agent"),
            "cs(Referer)" => GetString(props, "http.referer"),
            _ => GetString(props, field)
        };
    }

    private static string GetString(IReadOnlyDictionary<string, object?> props, string key)
    {
        if (props.TryGetValue(key, out var value) && value is not null)
        {
            return Sanitize(Convert.ToString(value, CultureInfo.InvariantCulture) ?? "-");
        }

        return "-";
    }

    private static string Sanitize(string value)
    {
        return value.Replace(" ", "%20", StringComparison.Ordinal)
            .Replace("\t", "%09", StringComparison.Ordinal);
    }
}
```
