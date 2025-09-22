Use `.unwrap_or_else(|x| defaultValue)` for `Result<T, E>` and `Option<T>` types.

## Example

```rust
let parsed_numbers: Vec<_> = ["1", "not a number", "3"]
    .iter()
    .map(|n| n.parse().unwrap_or_else(|_| std::i64::MIN))
    .collect();
```
