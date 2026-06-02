A **persistent data structure** preserves previous versions when updates are made. Instead of overwriting nodes in place, it shares unchanged structure and allocates only the path or fragments affected by the change.

Persistence is useful for undo systems, speculative computation, functional programming, snapshots, and concurrent readers. Fully persistent structures allow reads and writes from any version; partially persistent structures allow writes only to the latest version.

## Operations

- Create a new version from an update.
- Share unchanged nodes between versions.
- Query any retained version.
- Use path copying, fat nodes, or structural sharing to control memory cost.

## C\# Example

```csharp
public sealed record Node(int Value, Node? Left = null, Node? Right = null);

static Node Insert(Node? node, int value)
{
    if (node is null)
    {
        return new Node(value);
    }

    return value < node.Value
        ? node with { Left = Insert(node.Left, value) }
        : node with { Right = Insert(node.Right, value) };
}

var version1 = Insert(null, 10);
var version2 = Insert(version1, 5);

Console.WriteLine(version1.Left is null);
Console.WriteLine(version2.Left?.Value);
```

## Rust Example

```rust
use std::rc::Rc;

#[derive(Clone)]
struct Node {
    value: i32,
    left: Option<Rc<Node>>,
    right: Option<Rc<Node>>,
}

fn insert(node: Option<Rc<Node>>, value: i32) -> Rc<Node> {
    match node {
        None => Rc::new(Node { value, left: None, right: None }),
        Some(n) if value < n.value => Rc::new(Node {
            value: n.value,
            left: Some(insert(n.left.clone(), value)),
            right: n.right.clone(),
        }),
        Some(n) => Rc::new(Node {
            value: n.value,
            left: n.left.clone(),
            right: Some(insert(n.right.clone(), value)),
        }),
    }
}
```

## Further Reading

- [Persistent data structure - Wikipedia](https://en.wikipedia.org/wiki/Persistent_data_structure)
- [Purely Functional Data Structures](https://www.cambridge.org/core/books/purely-functional-data-structures/0409255DA1B48B7B8A2FE7320D936A7A)
- [Immutable collections in .NET](https://learn.microsoft.com/en-us/dotnet/api/system.collections.immutable)

