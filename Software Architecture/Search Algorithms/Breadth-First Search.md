---
title: Breadth-first search
aliases:
  - BFS
---

**Breadth-first search** (**BFS**), explores an unweighted graph in layers from a source vertex. It first visits nodes one edge away, then two edges away, and so on.

BFS gives the shortest path by number of edges. It does not handle different road distances or travel times unless all edges have the same cost.

## Algorithm

1. Put the source in a queue.
2. Mark the source as visited.
3. Remove the next node from the queue.
4. Add every unvisited neighbor to the queue.
5. Store each neighbor's predecessor so the path can be reconstructed.
6. Stop when the target is reached or the queue is empty.

## C# example

```csharp
static List<string>? BreadthFirstSearch(
    IReadOnlyDictionary<string, List<string>> graph,
    string source,
    string target)
{
    var queue = new Queue<string>();
    var previous = new Dictionary<string, string?>();

    queue.Enqueue(source);
    previous[source] = null;

    while (queue.Count > 0)
    {
        var node = queue.Dequeue();
        if (node == target)
        {
            return ReconstructPath(previous, target);
        }

        foreach (var neighbor in graph[node])
        {
            if (previous.ContainsKey(neighbor))
            {
                continue;
            }

            previous[neighbor] = node;
            queue.Enqueue(neighbor);
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

Time is `O(V + E)`. Memory is `O(V)`.

## Use when

- Every edge has equal cost.
- You need minimum number of steps, hops, or moves.
- You are solving grid mazes where every move has the same cost.

For weighted routing, use [[Dijkstra's Algorithm]] or [[A-star Search]].

