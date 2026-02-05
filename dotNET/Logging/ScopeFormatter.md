Renders scope objects into a readable, single-line format. It supports both simple scope strings and dictionary scopes created via `BeginScope(new Dictionary<string, object?> { ... })`.

```csharp
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Text;

namespace Logging;

public static class ScopeFormatter
{
    public static bool TryAppendScopes(
        StringBuilder sb,
        IExternalScopeProvider? scopeProvider,
        int maxItems)
    {
        if (scopeProvider is null || maxItems <= 0)
        {
            return false;
        }

        var state = new ScopeState(sb, maxItems);
        scopeProvider.ForEachScope((scope, s) => s.Append(scope), state);
        return state.Appended;
    }

    public static string? GetScopeText(object? scope)
    {
        if (scope is null)
        {
            return null;
        }

        if (scope is IEnumerable<KeyValuePair<string, object?>> kvps)
        {
            var sb = new StringBuilder(128);
            var first = true;

            foreach (var kvp in kvps)
            {
                if (!first)
                {
                    sb.Append(";");
                    sb.Append(" ");
                }

                sb.Append(kvp.Key);
                sb.Append("=");
                sb.Append(kvp.Value ?? "null");
                first = false;
            }

            return sb.ToString();
        }

        return scope.ToString();
    }

    private sealed class ScopeState
    {
        private readonly StringBuilder sb;
        private readonly int maxItems;
        private int count;

        public bool Appended { get; private set; }

        public ScopeState(StringBuilder sb, int maxItems)
        {
            this.sb = sb;
            this.maxItems = maxItems;
        }

        public void Append(object? scope)
        {
            if (count >= maxItems)
            {
                return;
            }

            var text = GetScopeText(scope);
            if (string.IsNullOrWhiteSpace(text))
            {
                return;
            }

            if (!Appended)
            {
                sb.Append(" | scopes: ");
                Appended = true;
            }
            else
            {
                sb.Append(", ");
            }

            sb.Append(text);
            count++;
        }
    }
}
```
