---
title: Rust Error Handling
tags:
  - rust
  - error-handling
---
**Rust error handling** separates expected failures from unrecoverable program states. Rust has no exceptions. Use `Result<T, E>` for a recoverable failure, `Option<T>` for a value that can be absent, and [[Rust Panics|a panic]] for an unrecoverable bug or violated invariant.

## Result

`Result<T, E>` contains either a success value or an error:

```rust
enum Result<T, E>
{
    Ok(T),
    Err(E),
}
```

Handle both variants when the current function owns the recovery policy:

```rust
fn square(text: &str) -> i32
{
    match text.parse::<i32>()
    {
        Ok(value) => value * value,
        Err(_) => 0,
    }
}
```

Propagate the error with `?` when the caller must select the policy:

```rust
fn square(text: &str) -> Result<i32, std::num::ParseIntError>
{
    let value = text.parse::<i32>()?;
    Ok(value * value)
}
```

Do not test `is_ok()` and then call `unwrap()`. This splits one decision across two operations and introduces a panic path. See [[Rust Panics]] for combinators, checked access, valid uses of `expect`, and Clippy enforcement.

## Backtraces

Set `RUST_BACKTRACE` to show a backtrace after a panic:

```powershell
$env:RUST_BACKTRACE = 1
cargo run
```

## Sources

- [`Result`](https://doc.rust-lang.org/std/result/enum.Result.html) — Rust standard library
- [Recoverable Errors with `Result`](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html) — The Rust Programming Language

