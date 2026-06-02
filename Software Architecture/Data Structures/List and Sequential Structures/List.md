A **list** is an ordered, finite collection where each item has a position. Implementations may use contiguous arrays for fast indexing or linked nodes for cheaper local insertion.

## Key Points

- Typical operations are append, insert, remove, index lookup, iteration, map, filter, and slice.
- Array-backed lists give O(1) indexing and amortized O(1) append; middle insertion is O(n).

## C\# Example

```csharp
var items = new List<string> { "parse", "validate" };
items.Insert(1, "tokenize");
items.Remove("parse");

foreach (var item in items)
{
    Console.WriteLine(item);
}
```

## Rust Example

```rust
let mut items = vec!["parse", "validate"];
items.insert(1, "tokenize");
items.retain(|item| *item != "parse");

for item in &items {
    println!("{item}");
}
```

## Further Reading

- <https://en.wikipedia.org/wiki/List_(abstract_data_type)>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1>
- <https://doc.rust-lang.org/std/vec/struct.Vec.html>
