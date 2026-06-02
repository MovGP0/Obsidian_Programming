---
title: B-Tree
---
A **B-Tree** is a balanced multi-way search tree that stores many sorted keys per node. High fanout keeps the tree shallow, which makes B-Trees useful for databases, file systems, and other storage systems where reading a page is expensive.

Search chooses the child interval containing the target key. Insertions split full nodes, and deletions borrow or merge keys so nodes remain within their allowed occupancy bounds.

Typical search, insertion, and deletion costs are $O(\log n)$.

## C\# Example

```csharp
var index = new SortedDictionary<int, string>
{
    [10] = "customer-10",
    [20] = "customer-20",
    [30] = "customer-30"
};

foreach (var (key, value) in index)
{
    Console.WriteLine($"{key}: {value}");
}
```

`SortedDictionary<TKey,TValue>` is usually a balanced binary tree rather than a B-Tree, but it shows the ordered-map operations that B-Tree indexes expose.

## Rust Example

```rust
use std::collections::BTreeMap;

let mut index = BTreeMap::new();
index.insert(10, "customer-10");
index.insert(20, "customer-20");
index.insert(30, "customer-30");

for (key, value) in &index {
    println!("{key}: {value}");
}
```

Rust's `BTreeMap` is a practical standard-library ordered map backed by a B-tree-style structure.

## Further Reading

- [B-tree - Wikipedia](https://en.wikipedia.org/wiki/B-tree)
- [Rust `BTreeMap`](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html)
- [Database Internals: B-Trees](https://www.databass.dev/)
