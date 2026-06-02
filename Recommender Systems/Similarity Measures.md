# Similarity Measures

Similarity functions compare users, items, or profiles. They are used in neighborhood collaborative filtering, content-based filtering, clustering, and deduplication.

## Jaccard similarity

Jaccard compares sets:

```text
J(A, B) = |A ∩ B| / |A ∪ B|
```

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

```text
d(x, y) = sum(|x_i - y_i|)
```

It is useful when dimensions are independent and linear.

## Euclidean distance

Euclidean distance is straight-line distance:

```text
d(x, y) = sqrt(sum((x_i - y_i)^2))
```

It penalizes large differences more strongly than Manhattan distance.

## Cosine similarity

Cosine similarity compares vector direction rather than magnitude:

```text
cos(x, y) = dot(x, y) / (||x|| ||y||)
```

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

