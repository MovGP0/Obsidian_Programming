An **array** is a fixed-length, index-addressed sequence of elements of the same type. In most low-level implementations, elements are contiguous in memory, which gives constant-time indexed reads and writes. Insertion or deletion in the middle is linear because later elements must move.

Use arrays when the size is known and compact storage with predictable random access matters.

## C\# Example

```csharp
int[] scores = { 10, 20, 30, 40 };

scores[2] = 35;

for (var i = 0; i < scores.Length; i++)
{
    Console.WriteLine($"{i}: {scores[i]}");
}
```

## Rust Example

```rust
let mut scores = [10, 20, 30, 40];

scores[2] = 35;

for (index, score) in scores.iter().enumerate()
{
    println!("{index}: {score}");
}
```

## Further Reading

- [Array data structure - Wikipedia](https://en.wikipedia.org/wiki/Array_(data_structure))
- [C# arrays](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays)
- [Rust arrays](https://doc.rust-lang.org/std/primitive.array.html)
