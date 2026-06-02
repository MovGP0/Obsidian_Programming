A **binary tree** is a tree where each node has at most two children, usually called left and right. It is the base shape for expression trees, binary search trees, heaps, and many compression or parsing structures.

Traversal orders include preorder, inorder, postorder, and level order.

## C\# Example

```csharp
public sealed record BinaryNode<T>(
    T Value,
    BinaryNode<T>? Left = null,
    BinaryNode<T>? Right = null);

var tree = new BinaryNode<int>(2, new BinaryNode<int>(1), new BinaryNode<int>(3));
```

## Rust Example

```rust
struct Node<T> {
    value: T,
    left: Option<Box<Node<T>>>,
    right: Option<Box<Node<T>>>,
}
```

## Further Reading

- [Wikipedia: Binary tree](https://en.wikipedia.org/wiki/Binary_tree)
- [NIST DADS: Binary tree](https://xlinux.nist.gov/dads/HTML/binarytree.html)
- [GeeksforGeeks: Tree traversals](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/)
