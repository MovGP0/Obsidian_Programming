Determines whether a log entry should be written based on scopes. This uses a case-insensitive substring match against scope text produced by `ScopeFormatter.GetScopeText`.

```csharp
using Microsoft.Extensions.Logging;
using System;

namespace Logging;

public sealed class ScopeFilter
{
    private readonly string[] requiredScopes;

    public ScopeFilter(string[]? requiredScopes)
    {
        this.requiredScopes = requiredScopes is { Length: > 0 }
            ? requiredScopes
            : Array.Empty<string>();
    }

    public bool IsEnabled => requiredScopes.Length > 0;

    public bool ShouldLog(IExternalScopeProvider? scopeProvider)
    {
        if (!IsEnabled)
        {
            return true;
        }

        if (scopeProvider is null)
        {
            return false;
        }

        var state = new ScopeMatchState(requiredScopes);
        scopeProvider.ForEachScope((scope, s) => s.TryMatch(scope), state);
        return state.Matched;
    }

    private sealed class ScopeMatchState
    {
        private readonly string[] required;

        public bool Matched { get; private set; }

        public ScopeMatchState(string[] required)
        {
            this.required = required;
        }

        public void TryMatch(object? scope)
        {
            if (Matched)
            {
                return;
            }

            var text = ScopeFormatter.GetScopeText(scope);
            if (string.IsNullOrEmpty(text))
            {
                return;
            }

            foreach (var requiredItem in required)
            {
                if (text.IndexOf(requiredItem, StringComparison.OrdinalIgnoreCase) >= 0)
                {
                    Matched = true;
                    return;
                }
            }
        }
    }
}
```
