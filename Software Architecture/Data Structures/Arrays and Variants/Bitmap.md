A **bitmap** is an indexed map of bits. In graphics it usually maps pixels to color or palette entries; in systems programming it often tracks allocation, availability, or membership across a fixed universe.

Use bitmaps for compact occupancy maps, pixel grids, allocation maps, and simple set membership over integer positions.

## C\# Example

```csharp
var occupied = new BitArray(16);
occupied[3] = true;
occupied[7] = true;

var firstFree = Enumerable.Range(0, occupied.Length).First(i => !occupied[i]);
```

## Rust Example

```rust
let mut bitmap: u16 = 0;
bitmap |= 1 << 3;
bitmap |= 1 << 7;

let first_free = (0..16).find(|index| bitmap & (1 << index) == 0);
```

## Further Reading

- [Bitmap - Wikipedia](https://en.wikipedia.org/wiki/Bitmap)
- [BitArray class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.bitarray)
- [The Rust Programming Language: integers](https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-types)
