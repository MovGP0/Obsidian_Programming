A **rope** is a tree-based string representation optimized for editing very large text. Leaves store string chunks, and internal nodes store aggregate lengths so indexing and concatenation can navigate the tree efficiently.

Ropes avoid repeatedly copying entire strings during insertions, deletions, and concatenations. They are useful in text editors, document engines, and workloads where large strings are modified in the middle.

## Operations

- Concatenate two ropes by creating a new parent node.
- Split a rope at a character offset.
- Insert or delete text by combining split and concatenate.
- Rebalance the tree to keep operations near logarithmic time.

## C\# Example

```csharp
public sealed record Rope(string? Text, Rope? Left = null, Rope? Right = null)
{
    public int Length { get; } = Text?.Length ?? (Left?.Length ?? 0) + (Right?.Length ?? 0);

    public override string ToString()
    {
        return Text ?? $"{Left}{Right}";
    }
}

var hello = new Rope("Hello, ");
var world = new Rope("world");
var rope = new Rope(null, hello, world);

Console.WriteLine(rope.Length);
Console.WriteLine(rope.ToString());
```

## Rust Example

```rust
enum Rope {
    Leaf(String),
    Node {
        left: Box<Rope>,
        right: Box<Rope>,
        len: usize,
    },
}

impl Rope {
    fn concat(left: Rope, right: Rope) -> Rope {
        let len = left.len() + right.len();
        Rope::Node {
            left: Box::new(left),
            right: Box::new(right),
            len,
        }
    }

    fn len(&self) -> usize {
        match self {
            Rope::Leaf(text) => text.len(),
            Rope::Node { len, .. } => *len,
        }
    }
}
```

## Further Reading

- [Rope - Wikipedia](https://en.wikipedia.org/wiki/Rope_(data_structure))
- [Ropes: an Alternative to Strings](https://www.cs.rit.edu/~ark/462/module05/rope.pdf)
- [ropey crate documentation](https://docs.rs/ropey/latest/ropey/)

