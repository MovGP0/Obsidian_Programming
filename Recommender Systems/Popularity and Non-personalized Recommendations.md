# Popularity and Non-personalized Recommendations

Non-personalized recommenders ignore the active user's individual taste. They recommend items based on global or segment-level signals.

These recommenders are simple but important. They are useful before enough personal data exists and serve as strong baselines for more complex algorithms.

## Common strategies

| Strategy | Description |
| -------- | ----------- |
| Most popular | Rank items by views, purchases, ratings, or another global count. |
| Trending | Rank by recent growth rather than all-time count. |
| Recent | Prefer newly added or newly updated items. |
| Editorial | Human-curated recommendations. |
| Segment popular | Popular within geography, language, category, device, or cohort. |

## C# example: popularity with time decay

```csharp
public readonly record struct ItemEvent(
    string ItemId,
    DateTimeOffset Timestamp,
    double Weight);

static IReadOnlyList<string> GetTrendingItems(
    IEnumerable<ItemEvent> events,
    DateTimeOffset now,
    int count)
{
    return events
        .GroupBy(e => e.ItemId)
        .Select(group => new
        {
            ItemId = group.Key,
            Score = group.Sum(e =>
            {
                var ageHours = Math.Max(0, (now - e.Timestamp).TotalHours);
                var decay = Math.Exp(-ageHours / 72.0);
                return e.Weight * decay;
            })
        })
        .OrderByDescending(x => x.Score)
        .Take(count)
        .Select(x => x.ItemId)
        .ToList();
}
```

## Advantages

- Works for anonymous users.
- Easy to explain.
- Low latency.
- Strong fallback when personalized models fail.

## Problems

- Reinforces already popular items.
- Can ignore long-tail catalog value.
- Does not adapt to individual taste.
- Can become stale without recency or diversity controls.

Use popularity as a baseline. A more complex recommender should be able to beat it for the target metric.

