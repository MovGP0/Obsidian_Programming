```mermaid
classDiagram
    DataTypes
    DataTypes <|-- Scalar
    DataTypes <|-- Compound 
    Scalar <|-- Integer
    Scalar <|-- FloatingPoint
    Scalar <|-- Boolean
    Scalar <|-- Character
    Compound <|-- Tuples
    Compound <|-- Arrays
```

## Scalar Types

### Integer

| Bytes    | Signed  | Unsigned |
| -------- | ------- | -------- |
| 8        | `i8`    | `u8`     |
| 16       | `i16`   | `u16`    |
| 32       | `i32`   | `u32`    |
| 64       | `i64`   | `u64`    |
| 128      | `i128`  | `u128`   |
| 32 or 64 | `isize` | `usize`  |

```rust
let x = 5; # i32
let x:u32 = 5;
```

### Floating point

| Bytes | Type  |
| ----- | ----- |
| 32    | `f32` |
| 64    | `f64` |

```rust
let x = 5.0; # f64
let x:f32 = 5.0;
```

### Boolean
```rust
let x = true;
let x:bool = false;
```

### Character

4-byte Unicode character
```rust
let x = 'x';
let x = '\u{263A}'; # escape sequence
```

## Type alias

```rust
type Nanosecond = u64;
```

## Compound Types

- [[Rust Strings]]
- [[Rust Slices]]
- [[Rust Structs]]
- [[Rust Hash Map (Dictionary)]]
- [[Rust Vector]]
- [[Rust Array]]
- [[Rust Tuples]]
- [[Rust Enums]]
- [[Rust Compile-Time Constants]]