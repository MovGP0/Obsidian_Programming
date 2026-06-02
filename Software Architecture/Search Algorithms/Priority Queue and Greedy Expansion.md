A **priority queue** is the data structure that makes practical Dijkstra and A-star implementations efficient. It always returns the frontier item with the smallest priority.

In shortest-path search, the priority is usually:

- Dijkstra: `distance_from_source`
- A-star: `distance_from_source + estimated_distance_to_target`

This is greedy expansion: always explore the currently most promising frontier node.

## C# example

```csharp
var queue = new PriorityQueue<string, int>();

queue.Enqueue("A", 0);
queue.Enqueue("B", 10);
queue.Enqueue("C", 3);

while (queue.Count > 0)
{
    var node = queue.Dequeue();
    Console.WriteLine(node);
}
```

Output order:

```text
A
C
B
```

## Stale entries

.NET's `PriorityQueue<TElement, TPriority>` does not support decrease-key. The common workaround is to enqueue the same node again with its better priority. When an old entry is later popped, ignore it if it no longer matches the current best distance.

```csharp
if (queuedDistance != distances[node])
{
    continue;
}
```

One way to keep the queued distance is to store it in the element:

```csharp
public readonly record struct QueueEntry(string Node, int Distance);

var queue = new PriorityQueue<QueueEntry, int>();
queue.Enqueue(new QueueEntry("A", 0), 0);
```

## Rust example

Rust's `BinaryHeap` is a max-heap, so reverse the ordering for shortest-path work.

```rust
use std::cmp::Ordering;
use std::collections::BinaryHeap;

#[derive(Copy, Clone, Eq, PartialEq)]
struct State {
    cost: u32,
    node: usize,
}

impl Ord for State {
    fn cmp(&self, other: &Self) -> Ordering {
        other.cost
            .cmp(&self.cost)
            .then_with(|| self.node.cmp(&other.node))
    }
}

impl PartialOrd for State {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

let mut heap = BinaryHeap::new();
heap.push(State { cost: 0, node: 1 });
heap.push(State { cost: 5, node: 2 });
```

## Why it matters

Without a priority queue, selecting the next cheapest node can cost `O(V)` per expansion. With a binary heap, selection and insertion are `O(log V)`.

