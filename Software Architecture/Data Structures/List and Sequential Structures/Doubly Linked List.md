A **doubly linked list** stores previous and next links in each node. The extra pointer enables bidirectional traversal and O(1) removal when a node handle is already known.

## Key Points

- It costs more memory than a singly linked list and is usually less cache-friendly than an array.
- It is useful for queues, editor buffers, and ordered structures that move known nodes.

## C\# Example

```csharp
var list = new LinkedList<string>();
var middle = list.AddFirst("middle");
list.AddBefore(middle, "first");
list.AddAfter(middle, "last");

for (var node = list.Last; node is not null; node = node.Previous)
{
    Console.WriteLine(node.Value);
}
```

## Rust Example

```rust
use std::collections::LinkedList;

let mut list = LinkedList::from(["first", "middle", "last"]);
list.pop_front();
list.push_back("new last");

for value in list.iter().rev() {
    println!("{value}");
}
```

## Further Reading

- <https://en.wikipedia.org/wiki/Doubly_linked_list>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.linkedlist-1>
- <https://doc.rust-lang.org/std/collections/struct.LinkedList.html>
