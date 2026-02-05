This folder documents a production-ready, native `Microsoft.Extensions.Logging` file logger with daily rotation, size rollovers, scope filtering, and retention. No third-party packages are required.

What you get
- Daily rotation via `{date:...}` token.
- Optional size-based rollovers via `MaxFileSizeBytes`.
- Optional retention via `RetainedFileCountLimit`.
- High-throughput ingestion with a bounded channel and batch writes.
- Scope-aware filtering and scope rendering.
- Pluggable formatters (text, JSONL, CLF, ELF, W3C, CEF).

Objects and responsibilities
- [[RollingFileLoggerOptions]] defines configuration and tokens.
- [[RollingFileLoggerProvider]] wires the logger into `ILoggingBuilder`.
- [[RollingFileLogger]] formats log lines and enqueues entries.
- [[RollingFileWriter]] writes, rotates, rolls, and applies retention.
- [[ScopeFormatter]] renders scope objects.
- [[ScopeFilter]] enforces scope-based filtering.
- [[LogEvent]] is the formatter input model.

Formatters
- [[ILogEntryFormatter]] defines the formatter contract and optional headers.
- [[TextLogEntryFormatter]] is a simple line formatter.
- [[JsonlLogEntryFormatter]] outputs JSON object per line (JSONL).
- [[ClfLogEntryFormatter]] outputs Common Log Format.
- [[ElfLogEntryFormatter]] outputs Extended Log Format with file headers.
- [[W3cLogEntryFormatter]] outputs W3C extended log format with file headers.
- [[CefLogEntryFormatter]] outputs ArcSight CEF.

File naming and rotation
- `{date:yyyy-MM-dd}` is replaced with the local or UTC date.
- `{sequence}` is replaced with a zero-padded sequence (0000, 0001, ...).
- If `MaxFileSizeBytes` is set and `{sequence}` is not present, the writer appends `-0000` style suffixes.

Retention
- `RetainedFileCountLimit` keeps the newest N files that match the pattern.
- The retention sweep runs on each rotation or rollover.

## Examples

### ASP.NET Core
```csharp
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
    Formatter = new JsonlLogEntryFormatter(),
    IncludeScopes = true,
    RequiredScopes = new[] { "Tenant:", "CorrelationId:" }
}));
```

### Console
```csharp
using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.AddProvider(new RollingFileLoggerProvider(new RollingFileLoggerOptions
    {
        FilePathPattern = "logs/app-{date:yyyy-MM-dd}.log",
        MinimumLogLevel = LogLevel.Debug,
        MaxFileSizeBytes = 10 * 1024 * 1024,
        RetainedFileCountLimit = 7
    }));
});
```
