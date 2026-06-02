A **binary heap** is a complete binary tree stored in an array. In a min-heap, every parent is less than or equal to its children; in a max-heap, every parent is greater than or equal to its children.

The array layout keeps the structure compact: for index `i`, children are at `2i + 1` and `2i + 2`. Insertions bubble upward, and removals move the last element to the root and bubble downward.

## C\# Example

```csharp
var heap = new PriorityQueue<string, int>();
heap.Enqueue("compile", 3);
heap.Enqueue("fix production", 1);

Console.WriteLine(heap.Dequeue());
```

## Rust Example

```rust
use std::collections::BinaryHeap;

let mut heap = BinaryHeap::new();
heap.push(3);
heap.push(10);
heap.push(1);

assert_eq!(heap.pop(), Some(10));
```

## Further Reading

- [Wikipedia: Binary heap](https://en.wikipedia.org/wiki/Binary_heap)
- [CP-Algorithms: Heap](https://cp-algorithms.com/data_structures/heap.html)
- [Rust: BinaryHeap](https://doc.rust-lang.org/std/collections/struct.BinaryHeap.html)
