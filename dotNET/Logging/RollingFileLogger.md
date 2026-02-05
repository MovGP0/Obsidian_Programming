Renders log events into a single-line format and enqueues them for background writing.

```csharp
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace Logging;

public sealed class RollingFileLogger : ILogger
{
    private readonly string categoryName;
    private readonly RollingFileLoggerProvider provider;
    private readonly RollingFileLoggerOptions options;

    public RollingFileLogger(
        string categoryName,
        RollingFileLoggerProvider provider,
        RollingFileLoggerOptions options)
    {
        this.categoryName = categoryName;
        this.provider = provider;
        this.options = options;
    }

    public IDisposable? BeginScope<TState>(TState state)
        where TState : notnull
        => provider.ScopeProvider.Push(state);

    public bool IsEnabled(LogLevel logLevel)
        => provider.IsEnabled(logLevel);

    public void Log<TState>(
        LogLevel logLevel,
        EventId eventId,
        TState state,
        Exception? exception,
        Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        if (!provider.ScopeFilter.ShouldLog(provider.ScopeProvider))
        {
            return;
        }

        var message = formatter(state, exception);
        if (string.IsNullOrEmpty(message) && exception is null)
        {
            return;
        }

        var timestamp = options.UseUtcTimestamp ? DateTimeOffset.UtcNow : DateTimeOffset.Now;
        var properties = ExtractProperties(state);
        var scopes = ExtractScopes(provider.ScopeProvider, options.MaxScopeItems, properties);

        var logEvent = new LogEvent
        {
            Timestamp = timestamp,
            LogLevel = logLevel,
            CategoryName = categoryName,
            EventId = eventId,
            Message = message,
            Exception = exception,
            Properties = properties,
            Scopes = scopes
        };

        var line = provider.Formatter.Format(logEvent);
        if (string.IsNullOrEmpty(line))
        {
            return;
        }

        provider.Write(new LogEntry(timestamp, line));
    }

    private static Dictionary<string, object?> ExtractProperties<TState>(TState state)
    {
        if (state is IEnumerable<KeyValuePair<string, object?>> kvps)
        {
            var dict = new Dictionary<string, object?>();
            foreach (var kvp in kvps)
            {
                dict[kvp.Key] = kvp.Value;
            }

            return dict;
        }

        return new Dictionary<string, object?>();
    }

    private static IReadOnlyList<string> ExtractScopes(
        IExternalScopeProvider scopeProvider,
        int maxItems,
        IDictionary<string, object?> properties)
    {
        var scopes = new List<string>();
        if (maxItems <= 0)
        {
            return scopes;
        }

        var state = new ScopeState(scopes, properties, maxItems);
        scopeProvider.ForEachScope((scope, s) => s.Append(scope), state);
        return scopes;
    }

    private sealed class ScopeState
    {
        private readonly List<string> scopes;
        private readonly IDictionary<string, object?> properties;
        private readonly int maxItems;
        private int count;

        public ScopeState(List<string> scopes, IDictionary<string, object?> properties, int maxItems)
        {
            this.scopes = scopes;
            this.properties = properties;
            this.maxItems = maxItems;
        }

        public void Append(object? scope)
        {
            if (count >= maxItems)
            {
                return;
            }

            if (scope is IEnumerable<KeyValuePair<string, object?>> kvps)
            {
                foreach (var kvp in kvps)
                {
                    properties.TryAdd(kvp.Key, kvp.Value);
                }
            }

            var text = ScopeFormatter.GetScopeText(scope);
            if (!string.IsNullOrWhiteSpace(text))
            {
                scopes.Add(text);
                count++;
            }
        }
    }
}
```
