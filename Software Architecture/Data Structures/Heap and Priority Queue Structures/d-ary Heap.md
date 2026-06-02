A **d-ary heap** generalizes a binary heap by giving each node up to `d` children. Larger `d` reduces tree height and can make insertions and decrease-key operations shallower, but each sift-down step compares more children.

This tradeoff is useful in graph algorithms such as Dijkstra's algorithm, where the balance between updates and removals matters.

## C\# Example

```csharp
var d = 4;
var parent = (index - 1) / d;
var firstChild = index * d + 1;
var lastChild = Math.Min(firstChild + d, count);
```

## Rust Example

```rust
let d = 4usize;
let parent = (index - 1) / d;
let first_child = index * d + 1;
let last_child = (first_child + d).min(count);
```

## Further Reading

- [Wikipedia: d-ary heap](https://en.wikipedia.org/wiki/D-ary_heap)
- [Brilliant: Heaps](https://brilliant.org/wiki/heaps/)
- [CP-Algorithms: Dijkstra with sparse graphs](https://cp-algorithms.com/graph/dijkstra_sparse.html)
