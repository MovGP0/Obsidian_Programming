A **binomial heap** is a collection of binomial trees, with at most one tree of each degree. It supports efficient melding by linking trees of the same degree, similar to carrying bits in binary addition.

It provides `O(log n)` insertion, delete-min, and merge, with `O(1)` minimum lookup when a pointer to the minimum root is maintained.

## C\# Example

```csharp
public sealed record BinomialNode<T>(T Value, List<BinomialNode<T>> Children);

static BinomialNode<T> Link<T>(
    BinomialNode<T> a,
    BinomialNode<T> b,
    IComparer<T> comparer)
{
    return comparer.Compare(a.Value, b.Value) <= 0
        ? a with { Children = [b, .. a.Children] }
        : b with { Children = [a, .. b.Children] };
}
```

## Rust Example

```rust
struct Node<T> {
    value: T,
    children: Vec<Node<T>>,
}

fn degree<T>(node: &Node<T>) -> usize {
    node.children.len()
}
```

## Further Reading

- [Wikipedia: Binomial heap](https://en.wikipedia.org/wiki/Binomial_heap)
- [Open Data Structures: Meldable Heaps](https://opendatastructures.org/)
- [NIST DADS: Binomial heap](https://xlinux.nist.gov/dads/HTML/binomialheap.html)
