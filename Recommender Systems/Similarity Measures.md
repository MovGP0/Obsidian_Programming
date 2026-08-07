---
title: Similarity Measures
source: Practical Recommender Systems
source_chapter: 7
---
**Similarity functions** compare users, items, or profiles. They are used in neighborhood collaborative filtering, content-based filtering, clustering, and deduplication.

## Jaccard similarity

Jaccard compares sets:

$$
J(A, B) = \frac{|A \cap B|}{|A \cup B|}
$$

It works well for unary data such as "items purchased" or "tags assigned".

```csharp
static double Jaccard<T>(IReadOnlySet<T> a, IReadOnlySet<T> b)
{
    var intersection = a.Count(x => b.Contains(x));
    var union = a.Count + b.Count - intersection;
    return union == 0 ? 0 : (double)intersection / union;
}
```

## Manhattan distance

Manhattan distance sums absolute differences:

$$d(x, y) = \sum(|x_i - y_i|)$$

It is useful when dimensions are independent and linear.

## Euclidean distance

Euclidean distance is straight-line distance:

$$d(x, y) = \sqrt(\sum((x_i - y_i)^2))$$

It penalizes large differences more strongly than Manhattan distance.

## Cosine similarity

Cosine similarity compares vector direction rather than magnitude:

$$cos(x, y) = (x \cdot y) / (||x|| ||y||)$$

It is common for rating vectors, text vectors, and sparse item profiles.

```csharp
static double CosineSimilarity(
    IReadOnlyDictionary<string, double> a,
    IReadOnlyDictionary<string, double> b)
{
    var dot = 0.0;
    foreach (var (key, value) in a)
    {
        if (b.TryGetValue(key, out var other))
        {
            dot += value * other;
        }
    }

    var normA = Math.Sqrt(a.Values.Sum(x => x * x));
    var normB = Math.Sqrt(b.Values.Sum(x => x * x));
    return normA == 0 || normB == 0 ? 0 : dot / (normA * normB);
}
```

## Pearson correlation

Pearson correlation compares centered vectors. It handles users who rate consistently high or consistently low by subtracting each user's mean.

Use Pearson when rating scale bias matters. Use cosine when vector magnitude and direction are meaningful and centering is not required.

## Rust examples

```rust
use std::collections::HashSet;
use std::hash::Hash;

fn jaccard<T: Eq + Hash>(a: &HashSet<T>, b: &HashSet<T>) -> f64
{
    let union = a.union(b).count();
    if union == 0
    {
        0.0
    }
    else
    {
        a.intersection(b).count() as f64 / union as f64
    }
}

fn manhattan(a: &[f64], b: &[f64]) -> f64
{
    a.iter().zip(b).map(|(x, y)| (x - y).abs()).sum()
}

fn euclidean(a: &[f64], b: &[f64]) -> f64
{
    a.iter().zip(b).map(|(x, y)| (x - y).powi(2)).sum::<f64>().sqrt()
}

fn cosine(a: &[f64], b: &[f64]) -> f64
{
    let dot = a.iter().zip(b).map(|(x, y)| x * y).sum::<f64>();
    let norm_a = a.iter().map(|x| x * x).sum::<f64>().sqrt();
    let norm_b = b.iter().map(|x| x * x).sum::<f64>().sqrt();

    if norm_a == 0.0 || norm_b == 0.0
    {
        0.0
    }
    else
    {
        dot / (norm_a * norm_b)
    }
}

fn pearson(a: &[f64], b: &[f64]) -> f64
{
    assert_eq!(a.len(), b.len());
    if a.is_empty()
    {
        return 0.0;
    }

    let mean_a = a.iter().sum::<f64>() / a.len() as f64;
    let mean_b = b.iter().sum::<f64>() / b.len() as f64;
    let centered_a = a.iter().map(|value| value - mean_a).collect::<Vec<_>>();
    let centered_b = b.iter().map(|value| value - mean_b).collect::<Vec<_>>();
    cosine(&centered_a, &centered_b)
}
```

## Related algorithms

- [[K-means Clustering]]
- [[Neighborhood Collaborative Filtering]]
- [[Content-based Filtering]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 7.
