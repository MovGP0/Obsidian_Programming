An **adjacency list** represents a graph by storing, for each vertex, the vertices reachable by outgoing edges. It is usually the best default representation for sparse graphs because it stores only existing edges.

The representation supports efficient neighbor iteration and compact storage. Edge existence checks are fast if each neighbor list is a hash set, and slower if each list is an array or linked list.

## Operations

- Add a vertex by inserting an empty neighbor collection.
- Add an edge by appending the destination to the source vertex's neighbors.
- Enumerate outgoing edges in time proportional to the vertex degree.
- Store weights by using pairs such as `(destination, weight)`.

## C\# Example

```csharp
using System.Collections.Generic;

var graph = new Dictionary<int, List<(int To, int Weight)>>
{
    [0] = [(1, 7), (2, 9)],
    [1] = [(2, 3)],
    [2] = []
};

graph[1].Add((0, 7));

foreach (var (to, weight) in graph[0])
{
    Console.WriteLine($"0 -> {to} costs {weight}");
}
```

## Rust Example

```rust
let mut graph: Vec<Vec<(usize, u32)>> = vec![
    vec![(1, 7), (2, 9)],
    vec![(2, 3)],
    vec![],
];

graph[1].push((0, 7));

for (to, weight) in &graph[0] {
    println!("0 -> {to} costs {weight}");
}
```

## Further Reading

- [Adjacency list - Wikipedia](https://en.wikipedia.org/wiki/Adjacency_list)
- [Representing graphs - Khan Academy](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs)
- [CP-Algorithms: Graph algorithms](https://cp-algorithms.com/graph/)

