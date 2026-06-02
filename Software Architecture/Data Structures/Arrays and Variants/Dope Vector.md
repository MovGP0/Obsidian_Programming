A **dope vector** is a descriptor for an array, usually carrying metadata such as base address, element type or size, bounds, rank, and strides. Compilers and runtimes use this metadata to implement slices, multidimensional arrays, and bounds-aware indexing.

Use the concept when reasoning about array descriptors, slices, multidimensional views, and foreign-function interfaces.

## C\# Example

```csharp
var values = new[] { 10, 20, 30, 40, 50 };
var view = new ArraySegment<int>(values, 1, 3);

Console.WriteLine($"offset={view.Offset}, count={view.Count}");
Console.WriteLine(view.Array![view.Offset]);
```

## Rust Example

```rust
let values = [10, 20, 30, 40, 50];
let view = &values[1..4];

println!("length={}", view.len());
println!("first={}", view[0]);
```

## Further Reading

- [Dope vector - Wikipedia](https://en.wikipedia.org/wiki/Dope_vector)
- [ArraySegment<T>](https://learn.microsoft.com/en-us/dotnet/api/system.arraysegment-1)
- [Rust slices](https://doc.rust-lang.org/std/primitive.slice.html)
