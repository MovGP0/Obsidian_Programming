A **scapegoat tree** is a self-balancing binary search tree that does not store balance metadata in each node. When an insertion makes the tree too deep, it finds an unbalanced ancestor and rebuilds that subtree.

Search is `O(log n)` amortized, and rebuilding gives simple code with predictable tree shape at the cost of occasional expensive updates.

## C\# Example

```csharp
static bool IsTooDeep(int depth, int count, double alpha)
{
    return depth > Math.Log(count, 1.0 / alpha);
}
```

## Rust Example

```rust
fn is_too_deep(depth: usize, count: usize, alpha: f64) -> bool {
    (depth as f64) > (count as f64).log(1.0 / alpha)
}
```

## Further Reading

- [Wikipedia: Scapegoat tree](https://en.wikipedia.org/wiki/Scapegoat_tree)
- [Open Data Structures: Scapegoat Trees](https://opendatastructures.org/)
- [NIST DADS: Scapegoat tree](https://xlinux.nist.gov/dads/HTML/scapegoatTree.html)
