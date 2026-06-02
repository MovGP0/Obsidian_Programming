A **dynamic array** stores elements in a contiguous buffer but grows by allocating a larger buffer and copying existing elements when capacity is exhausted. Appending is amortized constant time, indexed access is constant time, and insertion or deletion away from the end is linear.

Use dynamic arrays for general-purpose sequences that grow mostly at the end.

## C\# Example

```csharp
var values = new List<int> { 1, 2, 3 };

values.Add(4);
values.Insert(1, 10);

Console.WriteLine(values[2]);
```

## Rust Example

```rust
let mut values = vec![1, 2, 3];

values.push(4);
values.insert(1, 10);

println!("{}", values[2]);
```

## Further Reading

- [Dynamic array - Wikipedia](https://en.wikipedia.org/wiki/Dynamic_array)
- [List<T> class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1)
- [Rust Vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
