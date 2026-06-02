A **treap** combines a binary search tree over keys with a heap over randomly assigned priorities. The random priorities make the expected tree height logarithmic.

Treaps are compact, easy to split and merge, and useful for ordered sets, sequence data structures, and randomized balanced maps.

## C\# Example

```csharp
public sealed record TreapNode<TKey>(
    TKey Key,
    int Priority,
    TreapNode<TKey>? Left = null,
    TreapNode<TKey>? Right = null);

var node = new TreapNode<int>(42, Random.Shared.Next());
```

## Rust Example

```rust
struct TreapNode<K> {
    key: K,
    priority: u32,
    left: Option<Box<TreapNode<K>>>,
    right: Option<Box<TreapNode<K>>>,
}
```

## Further Reading

- [Wikipedia: Treap](https://en.wikipedia.org/wiki/Treap)
- [CP-Algorithms: Treap](https://cp-algorithms.com/data_structures/treap.html)
- [NIST DADS: Treap](https://xlinux.nist.gov/dads/HTML/treap.html)
