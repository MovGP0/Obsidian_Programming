A **hash set** stores distinct values using hashing, usually as a hash table without separate payload values. It optimizes membership checks.

## Key Points

- Insertion of an existing item is a no-op in most APIs.
- Iteration order is commonly unspecified unless the implementation promises otherwise.

## C\# Example

```csharp
var seen = new HashSet<string>();
seen.Add("token");
seen.Add("token");

Console.WriteLine(seen.Contains("token"));
Console.WriteLine(seen.Count);
```

## Rust Example

```rust
use std::collections::HashSet;

let mut seen = HashSet::new();
seen.insert("token");
seen.insert("token");

println!("{}", seen.contains("token"));
println!("{}", seen.len());
```

## Further Reading

- <https://en.wikipedia.org/wiki/Set_(abstract_data_type)>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.hashset-1>
- <https://doc.rust-lang.org/std/collections/struct.HashSet.html>
