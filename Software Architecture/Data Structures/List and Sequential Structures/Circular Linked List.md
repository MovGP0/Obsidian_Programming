A **circular linked list** connects the last node back to the first node. Traversal can start at any node and continue around the cycle until the start is reached again.

## Key Points

- It is common in round-robin scheduling, buffers, and cyclic playlists.
- A sentinel node can simplify empty-list and boundary cases.

## C\# Example

```csharp
var ring = new Queue<string>(new[] { "A", "B", "C" });

var current = ring.Dequeue();
Console.WriteLine(current);
ring.Enqueue(current);

Console.WriteLine(string.Join(", ", ring));
```

## Rust Example

```rust
use std::collections::VecDeque;

let mut ring = VecDeque::from(["A", "B", "C"]);

if let Some(current) = ring.pop_front() {
    println!("{current}");
    ring.push_back(current);
}
```

## Further Reading

- <https://en.wikipedia.org/wiki/Linked_list#Circular_linked_list>
- <https://en.wikipedia.org/wiki/Circular_buffer>
- <https://doc.rust-lang.org/std/collections/struct.VecDeque.html>
