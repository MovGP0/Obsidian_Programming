Type conversion is always explicit.

```rust
let speedAsFloat = <f64>::from(speed);
let speedAsFload = speed as f64;
let x:u32 = "10".parse().unwrap();
```