**Brute-force** route enumeration tries every possible route from a source to a target, computes each route cost, and returns the cheapest one.

It is useful as a thought experiment, but it is not a practical routing algorithm for large graphs. The number of simple paths can grow exponentially with the number of vertices. In road networks, even a modest graph can have more candidate routes than can be checked directly.

## Algorithm

1. Start at the source.
2. Recursively visit every unvisited neighbor.
3. Stop a branch when it reaches the target.
4. Track the best complete route seen so far.
5. Backtrack and continue until all simple routes are checked.

This only enumerates simple paths. If cycles are allowed, the number of routes can be infinite.

## C# example

```csharp
public readonly record struct Edge(string To, int Cost);

static (int Cost, List<string> Path)? FindBestRoute(
    IReadOnlyDictionary<string, List<Edge>> graph,
    string source,
    string target)
{
    var visited = new HashSet<string>();
    var path = new List<string>();
    (int Cost, List<string> Path)? best = null;

    void Search(string node, int cost)
    {
        if (best is not null && cost >= best.Value.Cost)
        {
            return;
        }

        visited.Add(node);
        path.Add(node);

        if (node == target)
        {
            best = (cost, [.. path]);
        }
        else
        {
            foreach (var edge in graph[node])
            {
                if (!visited.Contains(edge.To))
                {
                    Search(edge.To, cost + edge.Cost);
                }
            }
        }

        path.RemoveAt(path.Count - 1);
        visited.Remove(node);
    }

    Search(source, 0);
    return best;
}
```

The `cost >= best` guard is branch-and-bound pruning, not a full solution. It helps only after a good complete route has already been found.

## Complexity

Worst-case time is exponential. Memory is `O(V)` for recursion state and visited tracking, excluding the graph.

## Use when

- The graph is tiny.
- You need a correctness oracle for tests.
- You want to demonstrate why shortest-path algorithms matter.

Do not use it for production routing.

