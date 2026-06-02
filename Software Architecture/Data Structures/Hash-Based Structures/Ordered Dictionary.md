An **ordered dictionary** maps keys to values while preserving a defined iteration order. Depending on the implementation, the order may be insertion order or sorted key order.

## Key Points

- Insertion-ordered dictionaries are useful for JSON-like data and UI display.
- Sorted dictionaries support range queries but are usually tree-backed rather than hash-backed.

## C\# Example

```csharp
var users = new OrderedDictionary<string, int>
{
    ["Ada"] = 1,
    ["Grace"] = 2
};

users["Ada"] = 3;

foreach (var pair in users)
{
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}
```

## Rust Example

```rust
use indexmap::IndexMap;

let mut users = IndexMap::new();
users.insert("Ada", 1);
users.insert("Grace", 2);
users.insert("Ada", 3);

for (name, id) in &users {
    println!("{name}: {id}");
}
```

## Further Reading

- <https://docs.rs/indexmap/latest/indexmap/map/struct.IndexMap.html>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ordereddictionary-2>
- <https://en.wikipedia.org/wiki/Associative_array>
