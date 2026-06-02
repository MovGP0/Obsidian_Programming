An **AVL tree** is a self-balancing binary search tree. For every node, the heights of the left and right subtrees differ by at most one.

AVL trees use rotations after insertions and deletions to maintain strict balance. They offer very fast lookups but can perform more rotations than red-black trees during updates.

## C\# Example

```csharp
static int BalanceFactor(Node? node)
{
    return Height(node?.Left) - Height(node?.Right);
}

// If the factor is outside -1..1, rotate the subtree.
```

## Rust Example

```rust
fn balance_factor(node: &Node) -> i32 {
    height(node.left.as_deref()) - height(node.right.as_deref())
}

// Rebalance with left and right rotations after updates.
```

## Further Reading

- [Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)
- [NIST DADS: AVL tree](https://xlinux.nist.gov/dads/HTML/avltree.html)
- [CP-Algorithms: AVL trees](https://cp-algorithms.com/data_structures/avl.html)
