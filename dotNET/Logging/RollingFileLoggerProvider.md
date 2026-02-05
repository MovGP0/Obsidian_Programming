Creates loggers, wires scope handling, and owns the rolling writer. This is the type you register with `ILoggingBuilder`.

```csharp
using Microsoft.Extensions.Logging;

namespace Logging;

public sealed class RollingFileLoggerProvider : ILoggerProvider, ISupportExternalScope
{
    private readonly RollingFileLoggerOptions options;
    private readonly RollingFileWriter writer;
    private readonly ScopeFilter scopeFilter;
    private readonly ILogEntryFormatter formatter;
    private IExternalScopeProvider scopeProvider;

    public RollingFileLoggerProvider(RollingFileLoggerOptions options)
    {
        this.options = options;
        formatter = options.Formatter ?? new TextLogEntryFormatter();
        writer = new RollingFileWriter(options, formatter);
        scopeFilter = new ScopeFilter(options.RequiredScopes is null ? null : options.RequiredScopes.ToArray());
        scopeProvider = new LoggerExternalScopeProvider();
    }

    public ILogger CreateLogger(string categoryName)
        => new RollingFileLogger(categoryName, this, options);

    public void SetScopeProvider(IExternalScopeProvider scopeProvider)
        => this.scopeProvider = scopeProvider ?? new LoggerExternalScopeProvider();

    internal bool IsEnabled(LogLevel logLevel)
        => logLevel >= options.MinimumLogLevel;

    internal IExternalScopeProvider ScopeProvider => scopeProvider;

    internal ScopeFilter ScopeFilter => scopeFilter;

    internal ILogEntryFormatter Formatter => formatter;

    internal void Write(LogEntry entry)
        => writer.Enqueue(entry);

    public void Dispose()
    {
        writer.Dispose();
    }
}
```

Registration examples

```csharp
using Logging;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddProvider(new RollingFileLoggerProvider(new RollingFileLoggerOptions
{
    FilePathPattern = "logs/app-{date:yyyy-MM-dd}.log",
    MinimumLogLevel = LogLevel.Information,
    RotateDaily = true,
    MaxFileSizeBytes = 50 * 1024 * 1024,
    RetainedFileCountLimit = 14,
    ChannelCapacity = 100_000,
    OverflowStrategy = LogQueueOverflowStrategy.DropOldest,
    IncludeScopes = true,
    RequiredScopes = new[] { "Tenant:", "CorrelationId:" }
}));
```

Console app without Host

```csharp
using Logging;
using Microsoft.Extensions.Logging;

using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.AddProvider(new RollingFileLoggerProvider(new RollingFileLoggerOptions
    {
        FilePathPattern = "logs/app-{date:yyyy-MM-dd}.log",
        MinimumLogLevel = LogLevel.Debug
    }));
});

var logger = loggerFactory.CreateLogger("Demo");
using (logger.BeginScope("Tenant:contoso"))
{
    logger.LogInformation("File logging works.");
}
```
