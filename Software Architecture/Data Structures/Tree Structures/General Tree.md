A **general tree** is a hierarchical structure where each node can have any number of children. It models file systems, document outlines, syntax trees, organization charts, and nested categories.

Traversal is commonly depth-first or breadth-first. Unlike binary trees, there is no fixed left/right child relationship.

## C\# Example

```csharp
public sealed record TreeNode<T>(T Value, List<TreeNode<T>> Children);

var root = new TreeNode<string>(
    "root",
    [new TreeNode<string>("child", [])]);
```

## Rust Example

```rust
struct TreeNode<T> {
    value: T,
    children: Vec<TreeNode<T>>,
}

let root = TreeNode {
    value: "root",
    children: vec![],
};
```

## Further Reading

- [Wikipedia: Tree data structure](https://en.wikipedia.org/wiki/Tree_(data_structure))
- [NIST DADS: Tree](https://xlinux.nist.gov/dads/HTML/tree.html)
- [Open Data Structures](https://opendatastructures.org/)
