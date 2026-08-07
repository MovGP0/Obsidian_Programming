---
title: Content-based Filtering
source: Practical Recommender Systems
source_chapter: 10
---
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

$$
p_u = \frac{\sum_{i \in I_u} w_{ui} p_i}{\sum_{i \in I_u} w_{ui}}
$$

## TF-IDF for text

For descriptions, titles, or reviews, TF-IDF gives higher weight to terms that are frequent in an item but uncommon across the catalog.

$$
\operatorname{tfidf}(t, i) = \operatorname{tf}(t, i) \cdot \operatorname{idf}(t)
$$

See [[TF-IDF for Content-based Recommendation]] for term weighting and [[Latent Dirichlet Allocation for Recommendation]] for topic profiles.

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

## Rust example: recommend by profile cosine

```rust
use std::collections::{HashMap, HashSet};

fn cosine(a: &HashMap<String, f64>, b: &HashMap<String, f64>) -> f64
{
    let dot = a.iter()
        .map(|(key, value)| value * b.get(key).copied().unwrap_or(0.0))
        .sum::<f64>();
    let norm_a = a.values().map(|value| value * value).sum::<f64>().sqrt();
    let norm_b = b.values().map(|value| value * value).sum::<f64>().sqrt();

    if norm_a == 0.0 || norm_b == 0.0
    {
        0.0
    }
    else
    {
        dot / (norm_a * norm_b)
    }
}

fn recommend_content_based(
    user_profile: &HashMap<String, f64>,
    item_profiles: &HashMap<String, HashMap<String, f64>>,
    seen: &HashSet<String>,
    count: usize,
) -> Vec<String>
{
    let mut scored = item_profiles.iter()
        .filter(|(item, _)| !seen.contains(*item))
        .map(|(item, profile)| (item.clone(), cosine(user_profile, profile)))
        .collect::<Vec<_>>();

    scored.sort_by(|a, b| b.1.total_cmp(&a.1));
    scored.into_iter().take(count).map(|(item, _)| item).collect()
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

## Related algorithms

- [[Similarity Measures]]
- [[Neighborhood Collaborative Filtering]]
- [[Hybrid Recommenders]]
- [[Cold Start Strategies]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 10.
