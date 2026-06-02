A **queue** is a first-in, first-out collection. Values are en**queue**d at the back and de**queue**d from the front.

## Key Points

- Queues model worklists, breadth-first search, message passing, and producer-consumer pipelines.
- A circular buffer or linked list avoids O(n) front removal.

## C\# Example

```csharp
var queue = new Queue<string>();
queue.Enqueue("first");
queue.Enqueue("second");

var next = queue.Dequeue();
Console.WriteLine(next);
```

## Rust Example

```rust
use std::collections::VecDeque;

let mut queue = VecDeque::new();
queue.push_back("first");
queue.push_back("second");

if let Some(next) = queue.pop_front() {
    println!("{next}");
}
```

## Further Reading

- <https://en.wikipedia.org/wiki/Queue_(abstract_data_type)>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.queue-1>
- <https://doc.rust-lang.org/std/collections/struct.VecDeque.html>
