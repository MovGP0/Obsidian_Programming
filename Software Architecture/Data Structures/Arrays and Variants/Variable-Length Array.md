A **variable-length array** is an automatic array whose length is chosen at runtime rather than compile time. C supports VLAs in some standards and compiler modes; C# and Rust usually model runtime-sized sequences with heap-backed dynamic arrays, slices, or stack allocation helpers.

Use runtime-sized arrays carefully when stack usage is bounded; otherwise prefer heap-backed vectors or lists.

## C\# Example

```csharp
var length = 5;
Span<int> buffer = stackalloc int[length];

for (var i = 0; i < buffer.Length; i++)
{
    buffer[i] = i * i;
}
```

## Rust Example

```rust
let length = 5;
let mut buffer = vec![0; length];

for index in 0..buffer.len()
{
    buffer[index] = index * index;
}
```

## Further Reading

- [Variable-length array - Wikipedia](https://en.wikipedia.org/wiki/Variable-length_array)
- [C# stackalloc](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/stackalloc)
- [Rust Vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
