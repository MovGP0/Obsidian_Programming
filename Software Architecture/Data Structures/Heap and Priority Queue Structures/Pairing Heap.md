A **pairing heap** is a simple meldable heap represented as heap-ordered multiway trees. To remove the minimum, it pairs adjacent subtrees, melds each pair, and then combines the results.

It is popular because it is much simpler than a Fibonacci heap while performing well in practice, especially for meld-heavy workloads.

## C\# Example

```csharp
public sealed record PairingNode<T>(T Value, List<PairingNode<T>> Children);

static PairingNode<T> Meld<T>(
    PairingNode<T> a,
    PairingNode<T> b,
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

fn is_empty<T>(root: &Option<Node<T>>) -> bool {
    root.is_none()
}
```

## Further Reading

- [Wikipedia: Pairing heap](https://en.wikipedia.org/wiki/Pairing_heap)
- [NIST DADS: Pairing heap](https://xlinux.nist.gov/dads/HTML/pairingheap.html)
- [Original pairing heap paper](https://doi.org/10.1007/BF01840439)
