**Cold start** happens when the system lacks enough data for a user, an item, or both.

## Types

| Type       | Problem                                      |
| ---------- | -------------------------------------------- |
| New user   | No history to personalize from.              |
| New item   | No interactions to learn from.               |
| Gray sheep | User behavior does not fit common patterns.  |
| New system | Neither users nor items have enough history. |

## Strategies

| Strategy                      | Works best for                                            |
| ----------------------------- | --------------------------------------------------------- |
| Popularity and trending       | Anonymous users and system bootstrap.                     |
| Segment-level recommendations | Users with coarse context such as location or category.   |
| Onboarding questionnaire      | New users when a few explicit preferences are acceptable. |
| Content-based filtering       | New items with good metadata.                             |
| Association rules             | Users with one or a few known interactions.               |
| Business rules                | Safety, availability, or domain-specific constraints.     |
| Exploration                   | Learning about users and items while limiting risk.       |

## C# example: switching fallback

```csharp
static IReadOnlyList<string> RecommendWithFallbacks(
    string userId,
    IReadOnlyDictionary<string, int> userInteractionCounts,
    Func<string, IReadOnlyList<string>> collaborative,
    Func<string, IReadOnlyList<string>> contentBased,
    Func<IReadOnlyList<string>> trending)
{
    var interactionCount = userInteractionCounts.GetValueOrDefault(userId);

    if (interactionCount >= 20)
    {
        return collaborative(userId);
    }

    if (interactionCount > 0)
    {
        return contentBased(userId);
    }

    return trending();
}
```

## Design principle

Do not treat cold start as an exception. It is a normal state. A recommender should deliberately choose a fallback path for every data condition.

