A **singly linked list** stores each value in a node that points to the next node. It is simple and supports cheap front insertion, but it cannot traverse backward and has O(n) search.

## Key Points

- Use it when stable node links and prepend-heavy workloads matter more than cache locality.
- Appending efficiently requires keeping a tail pointer.

## C\# Example

```csharp
var list = new LinkedList<int>();
list.AddFirst(3);
list.AddFirst(2);
list.AddFirst(1);

for (var node = list.First; node is not null; node = node.Next)
{
    Console.WriteLine(node.Value);
}
```

## Rust Example

```rust
use std::collections::LinkedList;

let mut list = LinkedList::new();
list.push_front(3);
list.push_front(2);
list.push_front(1);

for value in &list {
    println!("{value}");
}
```

## Further Reading

- <https://en.wikipedia.org/wiki/Linked_list>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.linkedlist-1>
- <https://doc.rust-lang.org/std/collections/struct.LinkedList.html>
