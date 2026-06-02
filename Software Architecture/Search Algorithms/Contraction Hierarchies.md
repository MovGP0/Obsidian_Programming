# Contraction Hierarchies

Contraction hierarchies are a shortest-path acceleration technique for large road networks.

The method preprocesses the graph by ranking nodes. Low-ranked nodes are less important, such as local cul-de-sac intersections. High-ranked nodes are more important, such as highway interchanges or separator nodes.

During contraction, the algorithm removes low-ranked nodes from consideration and adds shortcut edges between their higher-ranked neighbors when needed. A shortcut does not represent a physical road. It preserves the cost of a shortest path through contracted lower-ranked nodes.

## Preprocessing

For each node from lowest rank to highest:

1. Look at paths that enter and leave the node through higher-ranked neighbors.
2. Check whether the path through the node is needed for a shortest path.
3. If it is needed, add a shortcut between the higher-ranked neighbors.
4. Continue until all low-level detail is represented by shortcuts.

## Query

Run bidirectional Dijkstra, but only follow edges that go upward in rank. The forward and backward searches meet near the top of the hierarchy.

## C# sketch

```csharp
public readonly record struct RankedEdge(
    string To,
    int Cost,
    bool IsShortcut);

static bool CanSearchUpward(
    IReadOnlyDictionary<string, int> rank,
    string from,
    string to)
{
    return rank[to] > rank[from];
}

static IEnumerable<RankedEdge> UpwardEdges(
    IReadOnlyDictionary<string, List<RankedEdge>> graph,
    IReadOnlyDictionary<string, int> rank,
    string node)
{
    foreach (var edge in graph[node])
    {
        if (CanSearchUpward(rank, node, edge.To))
        {
            yield return edge;
        }
    }
}

static void AddShortcutIfNeeded(
    Dictionary<string, List<RankedEdge>> graph,
    string from,
    string to,
    int shortcutCost)
{
    var existing = graph[from].FirstOrDefault(edge => edge.To == to);
    if (existing.To is not null && existing.Cost <= shortcutCost)
    {
        return;
    }

    graph[from].Add(new RankedEdge(to, shortcutCost, IsShortcut: true));
}
```

This is not a full contraction hierarchy implementation. It shows the two core mechanics: upward-only query edges and artificial shortcuts.

## Why it is fast

For long-distance routing, the query only explores local detail near the source and target. The middle of the route moves through high-ranked separator nodes and shortcuts.

## Correctness

Correctness comes from adding enough shortcuts during preprocessing. If an upward-only query would miss a lower-ranked shortest subpath, a shortcut must represent that subpath.

