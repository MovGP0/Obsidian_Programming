A **deque**, or double-ended queue, supports insertion and removal at both the front and the back. It generalizes both stacks and queues.

## Key Points

- Deque implementations often use a growable ring buffer or a block map.
- They are useful for sliding windows, schedulers, and algorithms that need both-end access.

## C\# Example

```csharp
var deque = new LinkedList<int>();
deque.AddFirst(2);
deque.AddFirst(1);
deque.AddLast(3);

var front = deque.First!.Value;
deque.RemoveFirst();
Console.WriteLine(front);
```

## Rust Example

```rust
use std::collections::VecDeque;

let mut deque = VecDeque::new();
deque.push_front(2);
deque.push_front(1);
deque.push_back(3);

if let Some(front) = deque.pop_front() {
    println!("{front}");
}
```

## Further Reading

- <https://en.wikipedia.org/wiki/Double-ended_queue>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.linkedlist-1>
- <https://doc.rust-lang.org/std/collections/struct.VecDeque.html>
