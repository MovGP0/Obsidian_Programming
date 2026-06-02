A **skip list** is an ordered linked structure with multiple forward-pointer levels. Randomly promoted nodes let searches skip over ranges, giving expected O(log n) lookup, insert, and delete.

## Key Points

- It is often simpler to implement concurrently than a balanced tree.
- Performance depends on a good promotion probability and random source.

## C\# Example

```csharp
var index = new SortedDictionary<int, string>
{
    [10] = "ten",
    [30] = "thirty"
};

index[20] = "twenty";

foreach (var pair in index)
{
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}
```

## Rust Example

```rust
use std::collections::BTreeMap;

let mut index = BTreeMap::new();
index.insert(10, "ten");
index.insert(30, "thirty");
index.insert(20, "twenty");

for (key, value) in &index {
    println!("{key}: {value}");
}
```

## Further Reading

- <https://en.wikipedia.org/wiki/Skip_list>
- <https://dl.acm.org/doi/10.1145/78973.78977>
- <https://opendatastructures.org/ods-cpp/4_2_SkiplistSSet_Efficient_.html>
