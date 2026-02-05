Defines a formatter that converts a `LogEvent` into a single line for the log file. Optional file headers can be emitted by implementing `ILogFileHeaderProvider`.

```csharp
using System;
using System.Collections.Generic;

namespace Logging;

public interface ILogEntryFormatter
{
    string Format(LogEvent logEvent);
}

public interface ILogFileHeaderProvider
{
    IEnumerable<string> GetHeaderLines(DateTimeOffset timestamp);
}
```
