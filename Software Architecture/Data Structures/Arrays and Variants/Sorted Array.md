A **sorted array** keeps elements in order so search can use binary search. Lookup is logarithmic, iteration is cache-friendly, and insertion or deletion is linear because elements after the changed position must move.

Use sorted arrays for mostly-read collections that are built in batches or updated rarely.

## C\# Example

```csharp
var values = new List<int> { 2, 5, 9, 13 };
var index = values.BinarySearch(9);

var insertAt = ~values.BinarySearch(7);
values.Insert(insertAt, 7);
```

## Rust Example

```rust
let mut values = vec![2, 5, 9, 13];
let index = values.binary_search(&9);

let insert_at = values.binary_search(&7).unwrap_err();
values.insert(insert_at, 7);
```

## Further Reading

- [Binary search algorithm](https://en.wikipedia.org/wiki/Binary_search_algorithm)
- [List<T>.BinarySearch](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.binarysearch)
- [Rust slice::binary_search](https://doc.rust-lang.org/std/primitive.slice.html#method.binary_search)
