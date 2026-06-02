A **splay tree** is a self-adjusting binary search tree. Every access rotates the accessed node to the root using zig, zig-zig, or zig-zag steps.

It has amortized `O(log n)` operations and adapts well when recently accessed keys are likely to be accessed again. Individual operations can still be linear.

## C\# Example

```csharp
static Node RotateRight(Node root)
{
    var left = root.Left!;
    root.Left = left.Right;
    left.Right = root;
    return left;
}
```

## Rust Example

```rust
fn rotate_right(mut root: Box<Node>) -> Box<Node> {
    let mut left = root.left.take().unwrap();
    root.left = left.right.take();
    left.right = Some(root);
    left
}
```

## Further Reading

- [Wikipedia: Splay tree](https://en.wikipedia.org/wiki/Splay_tree)
- [NIST DADS: Splay tree](https://xlinux.nist.gov/dads/HTML/splaytree.html)
- [Sleator and Tarjan paper](https://doi.org/10.1145/3828.3835)
