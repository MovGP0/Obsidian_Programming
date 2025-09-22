- Use `Result<T, E>` enum for recoverable error
- Use `panic!` macro to throw exception on unrecoverable error (see: [[Rust Common Macros]])

## Result enum
```rust
enum Result<T, E>{
    Ok(T),
    Err(E)
}
```

## Examples

Throw exception (throw only unrecoverable errors!)
```rust
panic!("some message");
```

```rust
fn area_square(side: &str) -> i32 {
    let s:Result<i32, ParseIntError> = side.parse();
    let len = match s {
        Ok(val) => val,
        Err(msg) => 0
    };

    len*len
}
```

```rust
fn area_square(side: &str) -> i32 {
    let result:Result<i32, ParseIntError> = side.parse();
    if result.is_ok() {
        let len = result.unwrap();
        return len*len
    }
    // s.is_err() == true
    return 0;
}
```

If `.unwrap()` is called when the result `is_err() == true`, then `panic!` is called.

Use `.expect("message")` to add additional information to an exception.

## Control exception behavior

To get a stacktrace set the envionment variable `RUST_BACKTRACE=1`:
```powershell
$env:RUST_BACKTRACE = 1
cargo run
```

Set the `panic` variable in [[Cargo.toml]] file to override default behaviour:
```toml
[profile.release]
panic = 'abort'
```

## See also
- [Result enum](https://doc.rust-lang.org/std/result/enum.Result.html)