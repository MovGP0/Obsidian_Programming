A **sparse matrix** stores only non-default entries from a mostly empty two-dimensional matrix. Typical representations include coordinate lists, compressed sparse row, compressed sparse column, and dictionaries keyed by row and column.

Use sparse matrices for graphs, scientific computing, search indexes, and other data where non-zero values are a small fraction of the full grid.

## C\# Example

```csharp
var matrix = new Dictionary<(int Row, int Column), double>();

matrix[(0, 2)] = 4.5;
matrix[(3, 1)] = -2.0;

var value = matrix.TryGetValue((0, 2), out var stored) ? stored : 0.0;
```

## Rust Example

```rust
use std::collections::HashMap;

let mut matrix: HashMap<(usize, usize), f64> = HashMap::new();
matrix.insert((0, 2), 4.5);
matrix.insert((3, 1), -2.0);

let value = matrix.get(&(0, 2)).copied().unwrap_or(0.0);
```

## Further Reading

- [Sparse matrix - Wikipedia](https://en.wikipedia.org/wiki/Sparse_matrix)
- [Dictionary<TKey,TValue>](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2)
- [Rust HashMap](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
