A **B+Tree** is a B-Tree variant where internal nodes guide searches and records are stored in leaf nodes. Leaves are commonly linked in key order, which makes range scans efficient.

Databases often prefer B+Trees because internal pages can hold more separator keys when they do not store full records. That increases fanout, lowers height, and keeps sequential scans simple.

Lookup, insertion, and deletion are $O(\log n)$; range scans cost $O(\log n + k)$ for `k` returned records.

## C\# Example

```csharp
public sealed class BPlusLeaf<TKey, TValue>
    where TKey : IComparable<TKey>
{
    public List<TKey> Keys { get; } = [];
    public List<TValue> Values { get; } = [];
    public BPlusLeaf<TKey, TValue>? Next { get; set; }
}

var first = new BPlusLeaf<int, string>();
first.Keys.AddRange([1, 2, 3]);
first.Values.AddRange(["one", "two", "three"]);
```

The linked `Next` leaf pointer is what makes ordered scans cheap after the first search reaches a leaf.

## Rust Example

```rust
use std::collections::BTreeMap;

let mut index = BTreeMap::new();
index.insert(100, "row-100");
index.insert(200, "row-200");
index.insert(300, "row-300");

for (key, row) in index.range(150..=300) {
    println!("{key}: {row}");
}
```

Rust's `BTreeMap` exposes the same ordered range-query behavior, although its exact implementation is not a database B+Tree.

## Further Reading

- [B+ tree - Wikipedia](https://en.wikipedia.org/wiki/B%2B_tree)
- [CMU Database Systems: Indexing](https://15445.courses.cs.cmu.edu/)
- [Rust `BTreeMap::range`](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html#method.range)
