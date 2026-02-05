Represents a single log entry before formatting. Formatters consume this object to produce a line for the log file.

```csharp
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace Logging;

public sealed class LogEvent
{
    public DateTimeOffset Timestamp { get; init; }
    public LogLevel LogLevel { get; init; }
    public string CategoryName { get; init; } = string.Empty;
    public EventId EventId { get; init; }
    public string Message { get; init; } = string.Empty;
    public Exception? Exception { get; init; }
    public IReadOnlyDictionary<string, object?> Properties { get; init; } = new Dictionary<string, object?>();
    public IReadOnlyList<string> Scopes { get; init; } = Array.Empty<string>();
}
```
