A **priority queue** stores items with priorities and removes the item with the highest or lowest priority first. It is useful for schedulers, simulations, shortest-path algorithms, and any workflow where "next" is determined by priority rather than insertion order.

Common operations are `enqueue`, `peek`, and `dequeue`. A binary heap gives `O(log n)` enqueue/dequeue and `O(1)` peek.

## C\# Example

```csharp
var queue = new PriorityQueue<string, int>();
queue.Enqueue("low", 10);
queue.Enqueue("urgent", 1);

var next = queue.Dequeue(); // urgent
```

## Rust Example

```rust
use std::collections::BinaryHeap;
use std::cmp::Reverse;

let mut queue = BinaryHeap::new();
queue.push(Reverse((10, "low")));
queue.push(Reverse((1, "urgent")));

let Reverse((_, next)) = queue.pop().unwrap();
```

## Further Reading

- [Wikipedia: Priority queue](https://en.wikipedia.org/wiki/Priority_queue)
- [Microsoft: PriorityQueue](https://learn.microsoft.com/dotnet/api/system.collections.generic.priorityqueue-2)
- [Rust: BinaryHeap](https://doc.rust-lang.org/std/collections/struct.BinaryHeap.html)
