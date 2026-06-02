A **lookup table** stores precomputed answers indexed by key, trading memory for faster queries. It is commonly used for decoding, classification, math approximations, finite-state transitions, and replacing repeated computation.

Use lookup tables when inputs are bounded and repeated queries justify precomputing values.

## C\# Example

```csharp
var squares = Enumerable.Range(0, 10)
    .Select(x => x * x)
    .ToArray();

Console.WriteLine(squares[7]);
```

## Rust Example

```rust
let squares: Vec<i32> = (0..10).map(|x| x * x).collect();

println!("{}", squares[7]);
```

## Further Reading

- [Lookup table - Wikipedia](https://en.wikipedia.org/wiki/Lookup_table)
- [Array class](https://learn.microsoft.com/en-us/dotnet/api/system.array)
- [Rust slices](https://doc.rust-lang.org/std/primitive.slice.html)
