---
title: Hybrid Recommenders
source: Practical Recommender Systems
source_chapter: 12
---
**Hybrid recommenders** combine multiple recommendation strategies. This is common in production because no single algorithm handles every data condition well.

## Types

| Type              | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| Switching         | Choose one recommender based on context, such as cold user vs. warm user. |
| Mixed             | Show results from multiple recommenders side by side or interleaved.      |
| Weighted ensemble | Combine scores from several recommenders with fixed or learned weights.   |
| Monolithic        | Use features from multiple sources inside one model.                      |
| Stacking          | Train a second-level model to combine outputs from base recommenders.     |

## C# example: weighted score ensemble

```csharp
public readonly record struct ScoredItem(string ItemId, double Score);

static IReadOnlyList<ScoredItem> WeightedHybrid(
    IReadOnlyDictionary<string, double> collaborativeScores,
    IReadOnlyDictionary<string, double> contentScores,
    double collaborativeWeight,
    double contentWeight,
    int count)
{
    return collaborativeScores.Keys
        .Union(contentScores.Keys)
        .Select(itemId =>
        {
            var score =
                (collaborativeScores.GetValueOrDefault(itemId) * collaborativeWeight)
                + (contentScores.GetValueOrDefault(itemId) * contentWeight);

            return new ScoredItem(itemId, score);
        })
        .OrderByDescending(x => x.Score)
        .Take(count)
        .ToList();
}
```

## Rust example: weighted ensemble

```rust
use std::collections::{HashMap, HashSet};

fn weighted_hybrid(
    collaborative: &HashMap<String, f64>,
    content: &HashMap<String, f64>,
    collaborative_weight: f64,
    content_weight: f64,
    count: usize,
) -> Vec<(String, f64)>
{
    let item_ids = collaborative.keys()
        .chain(content.keys())
        .cloned()
        .collect::<HashSet<_>>();

    let mut scored = item_ids.into_iter()
        .map(|item|
        {
            let score = collaborative.get(&item).copied().unwrap_or(0.0)
                * collaborative_weight
                + content.get(&item).copied().unwrap_or(0.0) * content_weight;
            (item, score)
        })
        .collect::<Vec<_>>();

    scored.sort_by(|a, b| b.1.total_cmp(&a.1));
    scored.truncate(count);
    scored
}
```

## Feature-weighted stacking

A stronger hybrid can make weights depend on meta-features:

- number of ratings for the user
- number of interactions for the item
- similarity confidence
- item age
- category
- whether content metadata is complete

Example: rely more on content-based filtering for new items, and more on collaborative filtering when an item has many interactions.

See [[Feature-weighted Linear Stacking]] for the adaptive form described in the book.

## Why hybrids work

Different algorithms fail differently. A hybrid can use:

- popularity for anonymous users
- association rules for one-click context
- content-based filtering for new items
- collaborative filtering for warm users
- learning-to-rank for final ordering

## Related algorithms

- [[Content-based Filtering]]
- [[Neighborhood Collaborative Filtering]]
- [[Matrix Factorization]]
- [[Ranking and Learning to Rank]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 12.
