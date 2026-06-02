A **binary search tree** stores ordered keys so that every left subtree contains smaller keys and every right subtree contains larger keys. This makes search, insert, and delete proportional to tree height.

A plain BST can degrade to `O(n)` height if keys arrive in sorted order. Balanced variants such as AVL and red-black trees keep operations logarithmic.

## C\# Example

```csharp
var set = new SortedSet<int>();
set.Add(5);
set.Add(2);
set.Add(9);

var contains = set.Contains(2);
```

## Rust Example

```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::new();
set.insert(5);
set.insert(2);
set.insert(9);

assert!(set.contains(&2));
```

## Further Reading

- [Wikipedia: Binary search tree](https://en.wikipedia.org/wiki/Binary_search_tree)
- [NIST DADS: Binary search tree](https://xlinux.nist.gov/dads/HTML/binarySearchTree.html)
- [Open Data Structures: Binary Search Trees](https://opendatastructures.org/)
