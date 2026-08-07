---
title: K-means Clustering
source: Practical Recommender Systems
source_chapter: 7
---
**K-means clusters** users or items into `k` groups based on feature vectors. It is not a recommender by itself, but it can support recommendation by finding coarse segments.

Examples:

- cluster users by genre preferences
- cluster items by metadata or latent factors
- build segment-level popularity lists
- reduce candidate search space before scoring

## Algorithm

1. Choose `k` initial centroids.
2. Assign each point to the nearest centroid.
3. Recalculate each centroid as the mean of assigned points.
4. Repeat until assignments stop changing or a maximum iteration count is reached.

## C# sketch

```csharp
static int[] KMeans(
    IReadOnlyList<double[]> points,
    int clusterCount,
    int iterations)
{
    var centroids = points.Take(clusterCount).Select(p => p.ToArray()).ToArray();
    var assignments = new int[points.Count];

    for (var iteration = 0; iteration < iterations; iteration++)
    {
        for (var i = 0; i < points.Count; i++)
        {
            assignments[i] = FindNearestCentroid(points[i], centroids);
        }

        for (var cluster = 0; cluster < clusterCount; cluster++)
        {
            var members = points
                .Where((_, index) => assignments[index] == cluster)
                .ToList();

            if (members.Count == 0)
            {
                continue;
            }

            for (var dimension = 0; dimension < centroids[cluster].Length; dimension++)
            {
                centroids[cluster][dimension] = members.Average(p => p[dimension]);
            }
        }
    }

    return assignments;
}

static int FindNearestCentroid(double[] point, double[][] centroids)
{
    var bestCluster = 0;
    var bestDistance = double.MaxValue;

    for (var cluster = 0; cluster < centroids.Length; cluster++)
    {
        var distance = SquaredDistance(point, centroids[cluster]);
        if (distance < bestDistance)
        {
            bestDistance = distance;
            bestCluster = cluster;
        }
    }

    return bestCluster;
}

static double SquaredDistance(double[] a, double[] b)
{
    var sum = 0.0;
    for (var i = 0; i < a.Length; i++)
    {
        var difference = a[i] - b[i];
        sum += difference * difference;
    }

    return sum;
}
```

## Rust example

```rust
fn squared_distance(a: &[f64], b: &[f64]) -> f64
{
    a.iter().zip(b).map(|(x, y)| (x - y).powi(2)).sum()
}

fn k_means(points: &[Vec<f64>], cluster_count: usize, iterations: usize)
    -> (Vec<usize>, Vec<Vec<f64>>)
{
    assert!(!points.is_empty());
    assert!((1..=points.len()).contains(&cluster_count));
    let dimensions = points[0].len();
    let mut centroids = points[..cluster_count].to_vec();
    let mut assignments = vec![0; points.len()];

    for _ in 0..iterations
    {
        for (index, point) in points.iter().enumerate()
        {
            assignments[index] = centroids.iter()
                .enumerate()
                .min_by(|(_, a), (_, b)|
                    squared_distance(point, a).total_cmp(&squared_distance(point, b)))
                .map(|(cluster, _)| cluster)
                .unwrap();
        }

        let mut sums = vec![vec![0.0; dimensions]; cluster_count];
        let mut counts = vec![0_usize; cluster_count];

        for (point, cluster) in points.iter().zip(&assignments)
        {
            counts[*cluster] += 1;
            for (sum, value) in sums[*cluster].iter_mut().zip(point)
            {
                *sum += value;
            }
        }

        for cluster in 0..cluster_count
        {
            if counts[cluster] > 0
            {
                for value in &mut sums[cluster]
                {
                    *value /= counts[cluster] as f64;
                }
                centroids[cluster] = sums[cluster].clone();
            }
        }
    }

    (assignments, centroids)
}
```

## Practical notes

- Choose `k` carefully; too few clusters blur taste, too many clusters become sparse.
- Normalize features before clustering.
- Run multiple initializations because k-means can converge to a poor local optimum.
- Empty clusters need handling.

K-means is useful for segmentation and candidate generation, but final recommendations usually still need scoring and ranking.

## Related algorithms

- [[Similarity Measures]]
- [[Neighborhood Collaborative Filtering]]
- [[Cold Start Strategies]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 7.
