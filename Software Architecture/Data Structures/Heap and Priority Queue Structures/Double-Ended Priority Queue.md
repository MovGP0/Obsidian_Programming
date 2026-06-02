A **double-ended priority queue** supports access to both the minimum and maximum elements. It is useful when a system repeatedly needs the best and worst item, such as interval scheduling, bidirectional branch-and-bound, or sliding-window summaries.

Implementations include min-max heaps, interval heaps, and paired heaps with cross-links.

## C\# Example

```csharp
var values = new SortedSet<int> { 4, 9, 1 };

var min = values.Min;
var max = values.Max;
values.Remove(min);
```

## Rust Example

```rust
use std::collections::BTreeSet;

let mut values = BTreeSet::from([4, 9, 1]);
let min = *values.first().unwrap();
let max = *values.last().unwrap();
values.remove(&min);
```

## Further Reading

- [Wikipedia: Double-ended priority queue](https://en.wikipedia.org/wiki/Double-ended_priority_queue)
- [Wikipedia: Min-max heap](https://en.wikipedia.org/wiki/Min-max_heap)
- [NIST DADS: Double-ended priority queue](https://xlinux.nist.gov/dads/HTML/doubleEndPrioQ.html)
