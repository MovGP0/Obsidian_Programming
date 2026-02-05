---
title: Text Entry Formatter
---

Default line formatter. Produces the same readable format as the original example and optionally appends scopes.

```csharp
using System;
using System.Globalization;
using System.Text;

namespace Logging;

public sealed class TextLogEntryFormatter : ILogEntryFormatter
{
    public string TimestampFormat { get; init; } = "yyyy-MM-dd HH:mm:ss.fff zzz";
    public bool IncludeScopes { get; init; } = true;

    public string Format(LogEvent logEvent)
    {
        var sb = new StringBuilder(256);

        sb.Append(logEvent.Timestamp.ToString(TimestampFormat, CultureInfo.InvariantCulture));
        sb.Append(" [");
        sb.Append(logEvent.LogLevel);
        sb.Append("] ");
        sb.Append(logEvent.CategoryName);
        sb.Append(": ");
        sb.Append(logEvent.Message);

        if (logEvent.Exception is not null)
        {
            sb.AppendLine();
            sb.Append(logEvent.Exception);
        }

        if (IncludeScopes && logEvent.Scopes.Count > 0)
        {
            sb.Append(" | scopes: ");
            for (var i = 0; i < logEvent.Scopes.Count; i++)
            {
                if (i > 0)
                {
                    sb.Append(", ");
                }

                sb.Append(logEvent.Scopes[i]);
            }
        }

        return sb.ToString();
    }
}
```
