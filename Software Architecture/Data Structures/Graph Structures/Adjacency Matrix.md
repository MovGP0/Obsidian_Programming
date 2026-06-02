An **adjacency matrix** represents a graph with a two-dimensional table where cell `(i, j)` records whether an edge from vertex `i` to vertex `j` exists. The cell may be a boolean, a weight, or a sentinel value such as infinity.

Adjacency matrices are useful for dense graphs and algorithms that need constant-time edge lookups. They use `O(V^2)` memory, which is wasteful for sparse graphs.

## Operations

- Test edge existence in `O(1)`.
- Add or remove an edge by updating one cell.
- Iterate neighbors by scanning one row.
- Represent undirected graphs by keeping the matrix symmetric.

## C\# Example

```csharp
const int Infinity = int.MaxValue;

var weights = new[,]
{
    { 0, 4, Infinity },
    { Infinity, 0, 6 },
    { 2, Infinity, 0 }
};

bool HasEdge(int from, int to)
{
    return from != to && weights[from, to] != Infinity;
}

Console.WriteLine(HasEdge(0, 1));
```

## Rust Example

```rust
const INF: u32 = u32::MAX;

let weights = [
    [0, 4, INF],
    [INF, 0, 6],
    [2, INF, 0],
];

fn has_edge(weights: &[[u32; 3]; 3], from: usize, to: usize) -> bool {
    from != to && weights[from][to] != INF
}

println!("{}", has_edge(&weights, 0, 1));
```

## Further Reading

- [Adjacency matrix - Wikipedia](https://en.wikipedia.org/wiki/Adjacency_matrix)
- [Graph representations - Programiz](https://www.programiz.com/dsa/graph-adjacency-matrix)
- [Floyd-Warshall algorithm - CP-Algorithms](https://cp-algorithms.com/graph/all-pair-shortest-path-floyd-warshall.html)

