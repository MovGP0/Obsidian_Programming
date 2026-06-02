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

## Practical notes

- Choose `k` carefully; too few clusters blur taste, too many clusters become sparse.
- Normalize features before clustering.
- Run multiple initializations because k-means can converge to a poor local optimum.
- Empty clusters need handling.

K-means is useful for segmentation and candidate generation, but final recommendations usually still need scoring and ranking.

