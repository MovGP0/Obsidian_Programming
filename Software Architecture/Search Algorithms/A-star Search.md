# A-star Search

A-star search is Dijkstra's algorithm plus a heuristic estimate from each node to the target.

The priority is:

```text
f(n) = g(n) + h(n)
```

`g(n)` is the known cost from the source to `n`. `h(n)` is the estimated remaining cost from `n` to the target.

If the heuristic is admissible, meaning it never overestimates the true remaining cost, A-star still returns an optimal path.

## Common heuristics

- Grid pathfinding: Manhattan distance or Euclidean distance.
- Road distance: straight-line distance.
- Travel time: straight-line distance divided by maximum possible speed.

The travel-time heuristic can be weak because it often underestimates heavily. That can make A-star behave closer to Dijkstra while still paying the cost of heuristic evaluation.

## C# example

```csharp
public readonly record struct Edge(string To, int Cost);
public readonly record struct Point(double X, double Y);

static (int Cost, List<string> Path)? AStar(
    IReadOnlyDictionary<string, List<Edge>> graph,
    IReadOnlyDictionary<string, Point> points,
    string source,
    string target)
{
    var distances = new Dictionary<string, int>();
    var previous = new Dictionary<string, string?>();
    var queue = new PriorityQueue<string, double>();

    foreach (var node in graph.Keys)
    {
        distances[node] = int.MaxValue;
        previous[node] = null;
    }

    distances[source] = 0;
    queue.Enqueue(source, Heuristic(points[source], points[target]));

    while (queue.Count > 0)
    {
        var node = queue.Dequeue();
        if (node == target)
        {
            return (distances[node], ReconstructPath(previous, target));
        }

        foreach (var edge in graph[node])
        {
            var candidate = distances[node] + edge.Cost;
            if (candidate >= distances[edge.To])
            {
                continue;
            }

            distances[edge.To] = candidate;
            previous[edge.To] = node;

            var priority = candidate + Heuristic(points[edge.To], points[target]);
            queue.Enqueue(edge.To, priority);
        }
    }

    return null;
}

static double Heuristic(Point a, Point b)
{
    var dx = a.X - b.X;
    var dy = a.Y - b.Y;
    return Math.Sqrt((dx * dx) + (dy * dy));
}

static List<string> ReconstructPath(
    IReadOnlyDictionary<string, string?> previous,
    string target)
{
    var path = new List<string>();
    string? current = target;

    while (current is not null)
    {
        path.Add(current);
        current = previous[current];
    }

    path.Reverse();
    return path;
}
```

## Complexity

Worst-case behavior can match Dijkstra. With a good heuristic, A-star explores far fewer nodes in practice.

## Use when

- The query is point-to-point.
- A cheap, admissible heuristic exists.
- The graph has spatial meaning, such as grids, navigation meshes, or maps.

