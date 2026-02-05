---
title: JSON object per line (JSONL) Formatter
---
Formats each log event as a single JSON object per line (JSONL). Properties and scopes are included when present.

```csharp
using System.Collections.Generic;
using System.Text.Json;

namespace Logging;

public sealed class JsonlLogEntryFormatter : ILogEntryFormatter
{
    public JsonSerializerOptions SerializerOptions { get; } = new()
    {
        WriteIndented = false
    };

    public string Format(LogEvent logEvent)
    {
        var payload = new Dictionary<string, object?>
        {
            ["timestamp"] = logEvent.Timestamp,
            ["level"] = logEvent.LogLevel.ToString(),
            ["category"] = logEvent.CategoryName,
            ["eventId"] = logEvent.EventId.Id,
            ["eventName"] = logEvent.EventId.Name,
            ["message"] = logEvent.Message
        };

        if (logEvent.Exception is not null)
        {
            payload["exception"] = logEvent.Exception.ToString();
        }

        if (logEvent.Properties.Count > 0)
        {
            payload["properties"] = logEvent.Properties;
        }

        if (logEvent.Scopes.Count > 0)
        {
            payload["scopes"] = logEvent.Scopes;
        }

        return JsonSerializer.Serialize(payload, SerializerOptions);
    }
}
```
