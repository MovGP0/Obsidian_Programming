---
title: B*Tree
---
A **B\*Tree** is a B-Tree variant that keeps nodes at least two-thirds full by redistributing keys between sibling nodes before splitting. This higher occupancy improves storage utilization and can reduce tree height in file systems and database indexes.

Like a B-Tree, each node stores sorted keys and child pointers. Insertions first try to borrow space from a sibling; only when neighboring nodes are full does the structure split two nodes into three. Deletions use redistribution or merging to preserve the occupancy rule.

Typical search, insertion, and deletion costs remain $O(\log n)$, but the denser nodes can make disk-backed indexes more space efficient.

## C\# Example

```csharp
var indexPage = new SortedDictionary<int, string>
{
    [10] = "left page",
    [20] = "middle page",
    [30] = "right page"
};

if (indexPage.TryGetValue(20, out var page))
{
    Console.WriteLine(page);
}
```

`SortedDictionary<TKey,TValue>` is not a B\*Tree implementation, but it shows the ordered lookup behavior exposed by tree indexes. Production B\*Trees are usually implemented inside storage engines.

## Rust Example

```rust
use std::collections::BTreeMap;

let mut index_page = BTreeMap::new();
index_page.insert(10, "left page");
index_page.insert(20, "middle page");
index_page.insert(30, "right page");

if let Some(page) = index_page.get(&20) {
    println!("{page}");
}
```

Rust's `BTreeMap` is not a B\*Tree implementation, but it is a practical ordered map with similar lookup semantics.

## Further Reading

- [B* tree - Wikipedia](https://en.wikipedia.org/wiki/B*_tree)
- [B-tree - Wikipedia](https://en.wikipedia.org/wiki/B-tree)
- [Rust `BTreeMap`](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html)
