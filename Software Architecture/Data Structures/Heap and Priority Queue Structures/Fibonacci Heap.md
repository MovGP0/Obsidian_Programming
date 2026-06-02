A **Fibonacci heap** is a meldable heap optimized for algorithms with many priority decreases. It delays structural cleanup until delete-min, using lazy consolidation and marked nodes.

Its amortized costs are `O(1)` insert, meld, and decrease-key, and `O(log n)` delete-min. The constant factors are high, so simpler heaps often win in everyday code.

## C\# Example

```csharp
public sealed class FibNode<T>
{
    public required T Value { get; init; }
    public double Priority { get; set; }
    public bool Marked { get; set; }
}

// DecreaseKey updates Priority and cuts the node if heap order is violated.
```

## Rust Example

```rust
struct FibNode<T> {
    value: T,
    priority: f64,
    marked: bool,
}

// A production heap stores sibling links and a handle for decrease_key.
```

## Further Reading

- [Wikipedia: Fibonacci heap](https://en.wikipedia.org/wiki/Fibonacci_heap)
- [NIST DADS: Fibonacci heap](https://xlinux.nist.gov/dads/HTML/fibonacciheap.html)
- [Fredman and Tarjan paper](https://doi.org/10.1145/28869.28874)
