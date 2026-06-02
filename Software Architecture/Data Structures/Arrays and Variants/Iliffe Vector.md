An **Iliffe vector** represents a multidimensional array as an array of pointers or references to lower-dimensional arrays. Rows can be separately allocated and even have different lengths, at the cost of extra indirection and less contiguous storage.

Use Iliffe-vector-style layouts for jagged arrays or when rows must be allocated independently.

## C\# Example

```csharp
int[][] rows =
{
    new[] { 1, 2, 3 },
    new[] { 4, 5 },
    new[] { 6 }
};

Console.WriteLine(rows[1][0]);
```

## Rust Example

```rust
let rows = vec![
    vec![1, 2, 3],
    vec![4, 5],
    vec![6],
];

println!("{}", rows[1][0]);
```

## Further Reading

- [Iliffe vector - Wikipedia](https://en.wikipedia.org/wiki/Iliffe_vector)
- [Jagged arrays in C#](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays#jagged-arrays)
- [Rust Vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
