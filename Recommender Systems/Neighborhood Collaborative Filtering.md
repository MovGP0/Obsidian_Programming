**Neighborhood collaborative filtering** recommends from similar users or similar items. It uses behavior patterns, not item metadata.

## User-user collaborative filtering

User-user filtering finds users similar to the active user and recommends items those neighbors liked.

```text
similar users -> their liked items -> weighted score
```

It is intuitive but can be expensive because user populations change often.

## Item-item collaborative filtering

Item-item filtering finds items similar to items the active user liked.

```text
user's liked items -> similar items -> weighted score
```

This is often more stable because item catalogs change slower than user behavior. Item similarity can be precomputed offline.

## C# example: item-item recommendation

```csharp
public readonly record struct SimilarItem(string ItemId, double Similarity);

static IReadOnlyList<string> RecommendFromSimilarItems(
    IReadOnlyDictionary<string, double> userRatings,
    IReadOnlyDictionary<string, List<SimilarItem>> itemSimilarities,
    int count)
{
    var scores = new Dictionary<string, double>();
    var weights = new Dictionary<string, double>();

    foreach (var (ratedItem, rating) in userRatings)
    {
        if (!itemSimilarities.TryGetValue(ratedItem, out var neighbors))
        {
            continue;
        }

        foreach (var neighbor in neighbors)
        {
            if (userRatings.ContainsKey(neighbor.ItemId))
            {
                continue;
            }

            scores[neighbor.ItemId] = scores.GetValueOrDefault(neighbor.ItemId)
                + (neighbor.Similarity * rating);
            weights[neighbor.ItemId] = weights.GetValueOrDefault(neighbor.ItemId)
                + Math.Abs(neighbor.Similarity);
        }
    }

    return scores
        .Where(x => weights[x.Key] > 0)
        .Select(x => new
        {
            ItemId = x.Key,
            Score = x.Value / weights[x.Key]
        })
        .OrderByDescending(x => x.Score)
        .Take(count)
        .Select(x => x.ItemId)
        .ToList();
}
```

## Practical levers

- similarity function
- minimum overlap between users or items
- number of neighbors
- rating normalization
- recency weighting
- whether to include negative similarity

## Pros and cons

Neighborhood methods are explainable and easy to prototype. They suffer when data is sparse, when users have unusual tastes, or when new items have little interaction history.

