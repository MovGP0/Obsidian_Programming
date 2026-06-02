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

## Feature-weighted stacking

A stronger hybrid can make weights depend on meta-features:

- number of ratings for the user
- number of interactions for the item
- similarity confidence
- item age
- category
- whether content metadata is complete

Example: rely more on content-based filtering for new items, and more on collaborative filtering when an item has many interactions.

## Why hybrids work

Different algorithms fail differently. A hybrid can use:

- popularity for anonymous users
- association rules for one-click context
- content-based filtering for new items
- collaborative filtering for warm users
- learning-to-rank for final ordering

