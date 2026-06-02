A **hash table** stores key-value pairs in buckets chosen by a hash function. Good hashing gives expected O(1) lookup, insert, and delete.

## Key Points

- Collisions are handled with chaining, open addressing, or related schemes.
- Load factor control and resizing are central to stable performance.

## C\# Example

```csharp
var scores = new Dictionary<string, int>
{
    ["Ada"] = 10,
    ["Grace"] = 12
};

scores["Ada"] += 1;
Console.WriteLine(scores["Ada"]);
```

## Rust Example

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert("Ada", 10);
scores.insert("Grace", 12);

*scores.entry("Ada").or_insert(0) += 1;
println!("{}", scores["Ada"]);
```

## Further Reading

- <https://en.wikipedia.org/wiki/Hash_table>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2>
- <https://doc.rust-lang.org/std/collections/struct.HashMap.html>
