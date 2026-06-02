A **multimap** associates one key with zero or more values. It is commonly implemented as a dictionary from key to list, set, or bag.

## Key Points

- Use a list when duplicate values or insertion order matter.
- Use a set when each key should map to distinct values.

## C\# Example

```csharp
var index = new Dictionary<string, List<int>>();

if (!index.TryGetValue("error", out var lines))
{
    lines = new List<int>();
    index["error"] = lines;
}

lines.Add(12);
lines.Add(48);
```

## Rust Example

```rust
use std::collections::HashMap;

let mut index: HashMap<&str, Vec<i32>> = HashMap::new();
index.entry("error").or_default().push(12);
index.entry("error").or_default().push(48);

println!("{:?}", index.get("error"));
```

## Further Reading

- <https://en.wikipedia.org/wiki/Multimap>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2>
- <https://doc.rust-lang.org/std/collections/struct.HashMap.html>
