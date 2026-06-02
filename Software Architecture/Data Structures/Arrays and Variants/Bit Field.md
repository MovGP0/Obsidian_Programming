A **bit field** stores multiple small integer or Boolean fields inside selected bit ranges of a machine word. It is useful for compact records, protocol headers, hardware registers, and packed status values.

Use bit fields when the exact bit layout is part of the data contract or when many small fields must be packed tightly.

## C\# Example

```csharp
const int ModeMask = 0b0000_0111;
const int ReadyMask = 0b0000_1000;

var packed = 0;
packed |= 5;
packed |= ReadyMask;

var mode = packed & ModeMask;
var isReady = (packed & ReadyMask) != 0;
```

## Rust Example

```rust
const MODE_MASK: u8 = 0b0000_0111;
const READY_MASK: u8 = 0b0000_1000;

let mut packed = 0u8;
packed |= 5;
packed |= READY_MASK;

let mode = packed & MODE_MASK;
let is_ready = (packed & READY_MASK) != 0;
```

## Further Reading

- [Bit field - Wikipedia](https://en.wikipedia.org/wiki/Bit_field)
- [C# bitwise operators](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators)
- [Rust bitwise operators](https://doc.rust-lang.org/reference/expressions/operator-expr.html#arithmetic-and-logical-binary-operators)
