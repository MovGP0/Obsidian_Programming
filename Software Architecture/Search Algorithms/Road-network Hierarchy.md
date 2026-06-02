# Road-network Hierarchy

Road-network hierarchy uses the structure of real roads to guide routing. Long routes usually have this shape:

```text
local road -> arterial road or highway -> local road
```

Plain Dijkstra and A-star see a road network as a weighted graph. They do not inherently know that a highway interchange is more important than a driveway, except through edge weights. Hierarchical routing adds that missing domain structure.

## Manual hierarchy

Older GPS systems used manually classified road levels:

- narrow or local road
- major local road
- arterial road
- expressway or highway

The search first looks near the source and target on low-level roads, then moves to higher-level roads for longer-distance travel.

## C# representation

```csharp
public enum RoadLevel
{
    Local = 0,
    MajorLocal = 1,
    Arterial = 2,
    Highway = 3
}

public readonly record struct RoadEdge(
    string To,
    int TravelTimeSeconds,
    RoadLevel Level);

static IEnumerable<RoadEdge> HigherOrEqualLevelEdges(
    IReadOnlyDictionary<string, List<RoadEdge>> graph,
    string node,
    RoadLevel minimumLevel)
{
    return graph[node].Where(edge => edge.Level >= minimumLevel);
}
```

## Risk

Manual hierarchy is fast but difficult to make exact. If the search area around the source or target is too small, the algorithm can miss a better route using local roads. If the area is too large, the search becomes closer to plain Dijkstra.

Modern methods such as [[Contraction Hierarchies]] build hierarchy automatically and add shortcuts to preserve shortest-path correctness.

