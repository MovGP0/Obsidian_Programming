---
title: Popularity and Non-personalized Recommendations
source: Practical Recommender Systems
source_chapter: 5
---
**Non-personalized recommenders** ignore the active user's individual taste. They recommend items based on global or segment-level signals.

These recommenders are simple but important. They are useful before enough personal data exists and serve as strong baselines for more complex algorithms.

## Common strategies

| Strategy        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| Most popular    | Rank items by views, purchases, ratings, or another global count. |
| Trending        | Rank by recent growth rather than all-time count.                 |
| Recent          | Prefer newly added or newly updated items.                        |
| Editorial       | Human-curated recommendations.                                    |
| Segment popular | Popular within geography, language, category, device, or cohort.  |

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

## Rust example: popularity with time decay

```rust
use std::collections::HashMap;

struct ItemEvent
{
    item_id: String,
    age_hours: f64,
    weight: f64,
}

fn trending_items(events: &[ItemEvent], half_life_hours: f64, count: usize)
    -> Vec<(String, f64)>
{
    let decay_rate = std::f64::consts::LN_2 / half_life_hours;
    let mut scores = HashMap::<String, f64>::new();

    for event in events
    {
        let decay = (-decay_rate * event.age_hours.max(0.0)).exp();
        *scores.entry(event.item_id.clone()).or_default() += event.weight * decay;
    }

    let mut ranked = scores.into_iter().collect::<Vec<_>>();
    ranked.sort_by(|a, b| b.1.total_cmp(&a.1));
    ranked.truncate(count);
    ranked
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

## Related algorithms

- [[Association Rule Recommendations]]
- [[Cold Start Strategies]]
- [[Evaluating Recommender Systems]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 5.
