A **graph** stores entities as vertices and relationships as edges. Edges may be directed or undirected, weighted or unweighted, and **graph**s may allow cycles, parallel edges, or self-loops depending on the model.

Graphs are used for dependency analysis, routing, social networks, knowledge graphs, state machines, and compiler control flow. The most common in-memory representations are adjacency lists, adjacency matrices, and edge lists.

## Operations

- Add or remove vertices and edges.
- Enumerate neighbors of a vertex.
- Traverse with breadth-first search or depth-first search.
- Run graph algorithms such as shortest paths, topological sorting, connected components, and minimum spanning trees.

## C\# Example

```csharp
using System.Collections.Generic;

var graph = new Dictionary<string, List<string>>
{
    ["Parser"] = ["Lexer", "Ast"],
    ["Ast"] = ["Symbols"],
    ["Symbols"] = []
};

var queue = new Queue<string>();
var seen = new HashSet<string>();

queue.Enqueue("Parser");
seen.Add("Parser");

while (queue.Count > 0)
{
    var node = queue.Dequeue();

    foreach (var neighbor in graph[node])
    {
        if (seen.Add(neighbor))
        {
            queue.Enqueue(neighbor);
        }
    }
}
```

## Rust Example

```rust
use std::collections::{HashMap, HashSet, VecDeque};

let graph = HashMap::from([
    ("Parser", vec!["Lexer", "Ast"]),
    ("Ast", vec!["Symbols"]),
    ("Symbols", vec![]),
]);

let mut queue = VecDeque::from(["Parser"]);
let mut seen = HashSet::from(["Parser"]);

while let Some(node) = queue.pop_front() {
    for neighbor in &graph[node] {
        if seen.insert(*neighbor) {
            queue.push_back(neighbor);
        }
    }
}
```

## Further Reading

- [Graph - Wikipedia](https://en.wikipedia.org/wiki/Graph_(abstract_data_type))
- [Graph theory - Wikipedia](https://en.wikipedia.org/wiki/Graph_theory)
- [Boost Graph Library overview](https://www.boost.org/doc/libs/release/libs/graph/doc/)

