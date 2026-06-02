An **ordered hash set** keeps set membership fast while preserving a deterministic iteration order, commonly insertion order. It combines a hash table with an order list or index array.

## Key Points

- Use it when duplicate suppression and stable display order are both required.
- The order bookkeeping costs extra memory compared with a plain hash set.

## C\# Example

```csharp
var ordered = new OrderedDictionary<string, object?>
{
    ["red"] = null,
    ["green"] = null
};

ordered.TryAdd("red", null);

foreach (var key in ordered.Keys)
{
    Console.WriteLine(key);
}
```

## Rust Example

```rust
use indexmap::IndexSet;

let mut ordered = IndexSet::new();
ordered.insert("red");
ordered.insert("green");
ordered.insert("red");

for value in &ordered {
    println!("{value}");
}
```

## Further Reading

- <https://docs.rs/indexmap/latest/indexmap/set/struct.IndexSet.html>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ordereddictionary-2>
- <https://en.wikipedia.org/wiki/Set_(abstract_data_type)>
