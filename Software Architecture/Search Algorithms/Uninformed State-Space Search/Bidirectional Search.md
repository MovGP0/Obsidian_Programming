**Bidirectional search** runs two searches at the same time:

- forward from the source
- backward from the target

The searches stop when their explored regions meet. For point-to-point routing, this can reduce the explored area substantially.

For weighted graphs, use bidirectional Dijkstra. The graph must support reverse edges, or a separate reverse adjacency list must be built.

## C# sketch

```csharp
public readonly record struct Edge(string To, int Cost);

static int? BidirectionalDijkstra(
    IReadOnlyDictionary<string, List<Edge>> forward,
    IReadOnlyDictionary<string, List<Edge>> reverse,
    string source,
    string target)
{
    var forwardDistances = InitializeDistances(forward.Keys, source);
    var reverseDistances = InitializeDistances(reverse.Keys, target);
    var forwardQueue = new PriorityQueue<string, int>();
    var reverseQueue = new PriorityQueue<string, int>();
    var best = int.MaxValue;

    forwardQueue.Enqueue(source, 0);
    reverseQueue.Enqueue(target, 0);

    while (forwardQueue.Count > 0 && reverseQueue.Count > 0)
    {
        Step(forward, forwardDistances, reverseDistances, forwardQueue, ref best);
        Step(reverse, reverseDistances, forwardDistances, reverseQueue, ref best);

        if (forwardQueue.Count == 0 || reverseQueue.Count == 0)
        {
            break;
        }

        if (best < int.MaxValue)
        {
            var lowerBound = GetPriority(forwardQueue) + GetPriority(reverseQueue);
            if (lowerBound >= best)
            {
                return best;
            }
        }
    }

    return best == int.MaxValue ? null : best;
}

static void Step(
    IReadOnlyDictionary<string, List<Edge>> graph,
    Dictionary<string, int> ownDistances,
    Dictionary<string, int> otherDistances,
    PriorityQueue<string, int> queue,
    ref int best)
{
    var node = queue.Dequeue();
    var distance = ownDistances[node];

    if (otherDistances[node] != int.MaxValue)
    {
        best = Math.Min(best, distance + otherDistances[node]);
    }

    foreach (var edge in graph[node])
    {
        var candidate = distance + edge.Cost;
        if (candidate >= ownDistances[edge.To])
        {
            continue;
        }

        ownDistances[edge.To] = candidate;
        queue.Enqueue(edge.To, candidate);
    }
}

static Dictionary<string, int> InitializeDistances(
    IEnumerable<string> nodes,
    string source)
{
    var distances = nodes.ToDictionary(node => node, _ => int.MaxValue);
    distances[source] = 0;
    return distances;
}

static int GetPriority(PriorityQueue<string, int> queue)
{
    queue.TryPeek(out _, out var priority);
    return priority;
}
```

This sketch returns only the cost. Production code also tracks predecessors on both sides to reconstruct the path.

## Why it helps

If a one-sided search expands roughly a circle with radius `R`, two searches can each expand closer to `R / 2`. In geometric road networks, that can reduce the explored region significantly.

## Limits

Bidirectional search still does not understand road hierarchy. It can waste work on local roads that no plausible long-distance route would use.
