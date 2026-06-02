A **trie**, or prefix tree, stores strings by sharing common prefixes. Each edge represents a character or token, and a terminal marker records where a stored key ends.

Tries support fast prefix lookup, autocomplete, dictionary membership checks, and routing tables. Search time is $O(m)$ for key length `m`, independent of the number of stored keys, but memory use can be high when branching is sparse.

## C\# Example

```csharp
public sealed class TrieNode
{
    public Dictionary<char, TrieNode> Children { get; } = [];
    public bool IsWord { get; set; }
}

static void Insert(TrieNode root, string word)
{
    var node = root;

    foreach (var c in word)
    {
        if (!node.Children.TryGetValue(c, out var next))
        {
            next = new TrieNode();
            node.Children[c] = next;
        }

        node = next;
    }

    node.IsWord = true;
}
```

## Rust Example

```rust
use std::collections::HashMap;

#[derive(Default)]
struct TrieNode {
    children: HashMap<char, TrieNode>,
    is_word: bool,
}

fn insert(root: &mut TrieNode, word: &str) {
    let mut node = root;

    for c in word.chars() {
        node = node.children.entry(c).or_default();
    }

    node.is_word = true;
}
```

## Further Reading

- [Trie - Wikipedia](https://en.wikipedia.org/wiki/Trie)
- [CP-Algorithms: Aho-Corasick and trie background](https://cp-algorithms.com/string/aho_corasick.html)
- [Rust `HashMap::entry`](https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.entry)
