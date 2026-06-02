A **bitboard** represents a board game position with bits, commonly one bit per square. Chess engines often keep one **bitboard** per piece type or occupancy class so moves and attacks can be computed with fast bitwise operations.

Use bitboards for small fixed grids where bitwise masks can replace loops over cells.

## C\# Example

```csharp
ulong whitePawns = 0x0000_0000_0000_FF00;
ulong oneStepPushes = whitePawns << 8;

var e4Mask = 1UL << 28;
var hasPawnMoveToE4 = (oneStepPushes & e4Mask) != 0;
```

## Rust Example

```rust
let white_pawns: u64 = 0x0000_0000_0000_FF00;
let one_step_pushes = white_pawns << 8;

let e4_mask = 1u64 << 28;
let has_pawn_move_to_e4 = (one_step_pushes & e4_mask) != 0;
```

## Further Reading

- [Bitboard - Wikipedia](https://en.wikipedia.org/wiki/Bitboard)
- [Chess Programming Wiki: Bitboards](https://www.chessprogramming.org/Bitboards)
- [Rust u64](https://doc.rust-lang.org/std/primitive.u64.html)
