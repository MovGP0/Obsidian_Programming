A **radix tree**, also called a compressed trie or Patricia trie, merges trie nodes that have only one child. Edges store strings or bit ranges instead of single characters.

Compression reduces memory use and shortens paths while preserving prefix-search behavior. Radix trees are useful for IP routing, string dictionaries, and sparse key spaces.

Search, insert, and delete depend on key length, commonly $O(m)$, but with fewer node visits than an uncompressed trie.

## C\# Example

```csharp
public sealed class RadixNode
{
    public Dictionary<string, RadixNode> Edges { get; } = [];
    public bool IsWord { get; set; }
}

var root = new RadixNode();
root.Edges["inter"] = new RadixNode
{
    IsWord = true
};
root.Edges["inter"].Edges["net"] = new RadixNode
{
    IsWord = true
};
```

In a full implementation, insertion splits an edge when the new key and existing edge share only part of a label.

## Rust Example

```rust
use std::collections::BTreeMap;

#[derive(Default)]
struct RadixNode {
    edges: BTreeMap<String, RadixNode>,
    is_word: bool,
}

let mut root = RadixNode::default();
root.edges.insert("inter".to_string(), RadixNode {
    is_word: true,
    ..RadixNode::default()
});
```

## Further Reading

- [Radix tree - Wikipedia](https://en.wikipedia.org/wiki/Radix_tree)
- [Patricia trie - Wikipedia](https://en.wikipedia.org/wiki/Radix_tree#PATRICIA_trees)
- [Linux radix tree notes](https://www.kernel.org/doc/html/latest/core-api/xarray.html)
