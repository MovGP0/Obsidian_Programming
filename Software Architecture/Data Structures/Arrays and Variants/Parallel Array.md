A **parallel array** representation stores different fields of a logical record in separate arrays, with the same index identifying one logical item across all arrays. It can improve column-wise scans but makes row operations and consistency harder.

Use parallel arrays when algorithms frequently process one field for many records, or when a structure-of-arrays layout is important for cache or vectorization behavior.

## C\# Example

```csharp
string[] names = { "Ada", "Grace", "Linus" };
int[] years = { 1815, 1906, 1969 };

for (var i = 0; i < names.Length; i++)
{
    Console.WriteLine($"{names[i]}: {years[i]}");
}
```

## Rust Example

```rust
let names = ["Ada", "Grace", "Linus"];
let years = [1815, 1906, 1969];

for index in 0..names.len()
{
    println!("{}: {}", names[index], years[index]);
}
```

## Further Reading

- [Parallel array - Wikipedia](https://en.wikipedia.org/wiki/Parallel_array)
- [Data-oriented design](https://en.wikipedia.org/wiki/Data-oriented_design)
- [Rust arrays](https://doc.rust-lang.org/std/primitive.array.html)
