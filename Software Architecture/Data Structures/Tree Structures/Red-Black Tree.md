A **red-black tree** is a self-balancing binary search tree that stores one color bit per node. Its rules keep every root-to-leaf path within a constant factor of every other path, giving `O(log n)` search, insert, and delete.

It is widely used in standard libraries because its balance is good enough and updates require relatively few rotations.

## C\# Example

```csharp
var map = new SortedDictionary<string, int>();
map["parser"] = 2;
map["lexer"] = 1;

foreach (var pair in map)
{
    Console.WriteLine(pair.Key);
}
```

## Rust Example

```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert("parser", 2);
map.insert("lexer", 1);

assert_eq!(map.get("lexer"), Some(&1));
```

## Further Reading

- [Wikipedia: Red-black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)
- [NIST DADS: Red-black tree](https://xlinux.nist.gov/dads/HTML/redblack.html)
- [Linux kernel: Red-black Trees](https://docs.kernel.org/core-api/rbtree.html)
