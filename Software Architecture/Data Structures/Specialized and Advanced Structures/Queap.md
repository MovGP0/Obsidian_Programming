A **queap** is a priority-queue structure that combines queue-like insertion order with heap-like minimum access. It supports constant-time insertion and minimum lookup, with logarithmic deletion of the minimum.

Conceptually, a queap keeps recent items in a queue-like buffer and older summarized items in heap-ordered structure. It is mainly of theoretical interest, showing how priority-queue operations can be balanced differently than a binary heap.

## Operations

- Insert in `O(1)` amortized time.
- Find the minimum in `O(1)` time.
- Delete the minimum in `O(log k)` time, where `k` relates to the number of items after the deleted item.
- Preserve enough ordering information to rebuild heap summaries lazily.

## C\# Example

```csharp
public sealed class Queap<T>
{
    private readonly PriorityQueue<T, T> _items = new();

    public void Enqueue(T value)
    {
        _items.Enqueue(value, value);
    }

    public T PeekMin()
    {
        return _items.Peek();
    }

    public T DequeueMin()
    {
        return _items.Dequeue();
    }
}
```

## Rust Example

```rust
use std::cmp::Reverse;
use std::collections::BinaryHeap;

struct Queap<T: Ord> {
    items: BinaryHeap<Reverse<T>>,
}

impl<T: Ord> Queap<T> {
    fn enqueue(&mut self, value: T) {
        self.items.push(Reverse(value));
    }

    fn dequeue_min(&mut self) -> Option<T> {
        self.items.pop().map(|Reverse(value)| value)
    }
}
```

## Further Reading

- [Queap - Wikipedia](https://en.wikipedia.org/wiki/Queap)
- [Priority queue - Wikipedia](https://en.wikipedia.org/wiki/Priority_queue)
- [BinaryHeap in Rust](https://doc.rust-lang.org/std/collections/struct.BinaryHeap.html)

