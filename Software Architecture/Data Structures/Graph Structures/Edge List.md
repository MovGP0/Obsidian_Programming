An **edge list** stores a graph as a collection of edges, usually triples such as `(source, destination, weight)`. It is simple, compact, and convenient for algorithms that process all edges in sequence.

Edge lists are common in input formats and algorithms such as Kruskal's minimum spanning tree and Bellman-Ford shortest paths. They are less efficient for repeatedly asking for the neighbors of one vertex unless an index is built.

## Operations

- Add an edge by appending one record.
- Sort edges by weight for greedy algorithms.
- Scan all edges in `O(E)`.
- Convert to an adjacency list when neighbor queries become frequent.

## C\# Example

```csharp
public readonly record struct Edge(int From, int To, int Weight);

var edges = new List<Edge>
{
    new(0, 1, 10),
    new(1, 2, 5),
    new(0, 2, 20)
};

edges.Sort((left, right) => left.Weight.CompareTo(right.Weight));

foreach (var edge in edges)
{
    Console.WriteLine($"{edge.From} -> {edge.To}: {edge.Weight}");
}
```

## Rust Example

```rust
#[derive(Debug)]
struct Edge {
    from: usize,
    to: usize,
    weight: u32,
}

let mut edges = vec![
    Edge { from: 0, to: 1, weight: 10 },
    Edge { from: 1, to: 2, weight: 5 },
    Edge { from: 0, to: 2, weight: 20 },
];

edges.sort_by_key(|edge| edge.weight);

for edge in edges {
    println!("{} -> {}: {}", edge.from, edge.to, edge.weight);
}
```

## Further Reading

- [Edge list - Wikipedia](https://en.wikipedia.org/wiki/Edge_list)
- [Kruskal's algorithm - CP-Algorithms](https://cp-algorithms.com/graph/mst_kruskal.html)
- [Bellman-Ford algorithm - CP-Algorithms](https://cp-algorithms.com/graph/bellman_ford.html)

