# Dijkstra's Algorithm

Dijkstra's algorithm finds shortest paths from one source to every reachable node in a graph with non-negative edge weights.

The algorithm maintains the best known distance to each node. It repeatedly expands the unvisited node with the smallest known distance. Once a node is removed from the priority queue with its final distance, no cheaper path to that node can still exist.

## Algorithm

1. Set the source distance to `0`.
2. Set all other distances to infinity.
3. Push the source into a priority queue ordered by distance.
4. Repeatedly pop the cheapest queued node.
5. Ignore stale queue entries whose cost no longer matches the best known distance.
6. Relax every outgoing edge.
7. Stop when the target is finalized, or continue for all shortest paths from the source.

## C# example

```csharp
public readonly record struct Edge(string To, int Cost);
public readonly record struct QueueEntry(string Node, int Distance);

static (int Cost, List<string> Path)? Dijkstra(
    IReadOnlyDictionary<string, List<Edge>> graph,
    string source,
    string target)
{
    var distances = new Dictionary<string, int>();
    var previous = new Dictionary<string, string?>();
    var queue = new PriorityQueue<QueueEntry, int>();

    foreach (var node in graph.Keys)
    {
        distances[node] = int.MaxValue;
        previous[node] = null;
    }

    distances[source] = 0;
    queue.Enqueue(new QueueEntry(source, 0), 0);

    while (queue.Count > 0)
    {
        var entry = queue.Dequeue();
        if (entry.Distance != distances[entry.Node])
        {
            continue;
        }

        if (entry.Node == target)
        {
            return (entry.Distance, ReconstructPath(previous, target));
        }

        foreach (var edge in graph[entry.Node])
        {
            var candidate = entry.Distance + edge.Cost;
            if (candidate >= distances[edge.To])
            {
                continue;
            }

            distances[edge.To] = candidate;
            previous[edge.To] = entry.Node;
            queue.Enqueue(new QueueEntry(edge.To, candidate), candidate);
        }
    }

    return null;
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

With a binary heap priority queue, time is `O((V + E) log V)`. Memory is `O(V)`.

## Constraints

Dijkstra's algorithm requires non-negative edge weights. Negative weights can invalidate the greedy finalization step. Use Bellman-Ford or Johnson's algorithm if negative edges are required.
