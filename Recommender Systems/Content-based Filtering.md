**Content-based filtering** recommends items similar to items the user already liked. It uses item features rather than only user behavior.

## Item profile

An item profile can contain:

- category
- tags
- author, actor, brand, or creator
- release year
- price range
- text description
- extracted topics
- embedding vector

Features must be normalized so one large numeric feature does not dominate the similarity score.

## User profile

A user profile is usually an aggregate of liked item profiles. Recent and strong interactions can receive higher weight.

```text
user profile = weighted average of profiles for liked items
```

## TF-IDF for text

For descriptions, titles, or reviews, TF-IDF gives higher weight to terms that are frequent in an item but uncommon across the catalog.

```text
tfidf(term, item) = term_frequency(term, item) * inverse_document_frequency(term)
```

## C# example: recommend by profile cosine

```csharp
static IReadOnlyList<string> RecommendContentBased(
    IReadOnlyDictionary<string, double> userProfile,
    IReadOnlyDictionary<string, Dictionary<string, double>> itemProfiles,
    IReadOnlySet<string> alreadySeen,
    int count)
{
    return itemProfiles
        .Where(x => !alreadySeen.Contains(x.Key))
        .Select(x => new
        {
            ItemId = x.Key,
            Score = CosineSimilarity(userProfile, x.Value)
        })
        .OrderByDescending(x => x.Score)
        .Take(count)
        .Select(x => x.ItemId)
        .ToList();
}

static double CosineSimilarity(
    IReadOnlyDictionary<string, double> a,
    IReadOnlyDictionary<string, double> b)
{
    var dot = a.Sum(x => b.TryGetValue(x.Key, out var y) ? x.Value * y : 0);
    var normA = Math.Sqrt(a.Values.Sum(x => x * x));
    var normB = Math.Sqrt(b.Values.Sum(x => x * x));
    return normA == 0 || normB == 0 ? 0 : dot / (normA * normB);
}
```

## Strengths

- Works for new items if metadata exists.
- Can explain recommendations through shared features.
- Does not require many users.

## Weaknesses

- Can over-specialize and recommend only near duplicates.
- Depends heavily on metadata quality.
- May miss taste signals not present in item features.

