A **bit array** is a compact array of Boolean values packed so each logical value usually consumes one bit instead of a byte or word. It supports dense flags, set operations, masks, and compact membership markers.

Use bit arrays when memory locality and compact Boolean storage matter, especially for large flag sets.

## C\# Example

```csharp
var bits = new BitArray(8);

bits[1] = true;
bits[4] = true;

Console.WriteLine(bits[1]);
```

## Rust Example

```rust
let mut bits: u8 = 0;

bits |= 1 << 1;
bits |= 1 << 4;

println!("{}", (bits & (1 << 1)) != 0);
```

## Further Reading

- [Bit array - Wikipedia](https://en.wikipedia.org/wiki/Bit_array)
- [BitArray class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.bitarray)
- [Rust integer primitives](https://doc.rust-lang.org/std/primitive.u64.html)
