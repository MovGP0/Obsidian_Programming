An **AA tree** is a balanced binary search tree related to red-black trees. It stores a level per node and restricts where horizontal links may appear, which simplifies rebalancing.

Its main operations are `skew`, which removes left horizontal links, and `split`, which removes consecutive right horizontal links.

## C\# Example

```csharp
static Node Skew(Node node)
{
    if (node.Left?.Level == node.Level)
    {
        return RotateRight(node);
    }

    return node;
}
```

## Rust Example

```rust
struct Node<K> {
    key: K,
    level: u32,
    left: Option<Box<Node<K>>>,
    right: Option<Box<Node<K>>>,
}
```

## Further Reading

- [Wikipedia: AA tree](https://en.wikipedia.org/wiki/AA_tree)
- [NIST DADS: AA tree](https://xlinux.nist.gov/dads/HTML/aatree.html)
- [Arne Andersson paper](https://doi.org/10.1007/BF00289520)
