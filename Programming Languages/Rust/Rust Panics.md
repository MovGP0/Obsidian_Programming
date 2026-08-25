---
title: Rust Panics
aliases:
  - Panic-resistant Rust
tags:
  - rust
  - error-handling
---
**Rust panics** stop normal execution when a program reaches a state that it cannot handle. A panic is memory-safe, but it can still make a service unavailable or make an application lose work. Use [[Rust error handling|recoverable error handling]] for expected failures. Reserve panics for bugs, violated invariants, tests, and states in which continued execution could be harmful.

By default, Rust unwinds the panicking thread. A panic on the main thread usually ends the process. A panic in another thread does not have to end the process. Set `panic = "abort"` in a Cargo profile when the complete process must stop without unwinding:

```toml
[profile.release]
panic = "abort"
```

## Common panic paths

Rust code can panic through several paths:

- An explicit macro such as `panic!`, `assert!`, `todo!`, `unimplemented!`, or `unreachable!`.
- `unwrap` or `expect` on an `Err` or `None` value.
- An operation with a hidden precondition, such as out-of-range indexing, an invalid string slice, or some arithmetic operations.

Memory safety does not mean that an application cannot fail. Rust keeps its panic mechanism memory-safe, but the application must still control availability and data loss.

## Prefer explicit error paths

Return `Result<T, E>` when the caller can recover or add useful context. Return `Option<T>` when absence is valid and needs no error value.

Use the `?` operator to propagate an error:

```rust
fn read_port(text: &str) -> Result<u16, std::num::ParseIntError>
{
    let port = text.parse::<u16>()?;
    Ok(port)
}
```

Use combinators when they state the policy clearly:

| Method | Use |
| --- | --- |
| `unwrap_or(value)` | Use a known fallback value. |
| `unwrap_or_else(f)` | Calculate a fallback from the error. |
| `unwrap_or_default()` | Use the type's default value. |
| `map(f)` | Transform only an `Ok` value. |
| `map_err(f)` | Transform only an `Err` value. |
| `and_then(f)` | Chain another fallible operation. |
| `or_else(f)` | Recover with another fallible operation. |

Do not first call `is_ok()` and then call `unwrap()`. Match the value, use `if let`, or use a combinator. These forms keep the success value and the error path together.

Use checked APIs for operations that can panic:

```rust
fn tenth(values: &[i32]) -> Option<i32>
{
    values.get(9).copied()
}
```

For arithmetic, use methods such as `checked_add`, `checked_sub`, or `checked_mul` when overflow is a possible input condition.

## When `expect` is valid

Examples and prototypes can use `unwrap` or `expect` as a short marker for error handling that is not yet implemented. Tests can also use them because a panic reports a test failure. A strict project can permit them only in test modules with a scoped `#[allow(clippy::unwrap_used, clippy::expect_used)]` attribute.

Production code can use `expect` when the program has already proved an invariant that the compiler cannot prove. The message must document the invariant:

```rust
use std::net::IpAddr;

let home = "127.0.0.1"
    .parse::<IpAddr>()
    .expect("the hard-coded loopback address must be valid");
```

Do not copy `unwrap` from a library example without review. Examples often omit the error policy to keep their main concept clear.

## Enforce the policy with Clippy

Clippy permits many restriction lints by default. A project can deny selected panic paths in `Cargo.toml`:

```toml
[lints.clippy]
unwrap_used = "deny"
expect_used = "deny"
indexing_slicing = "deny"
string_slice = "deny"
panic = "deny"
panic_in_result_fn = "deny"
todo = "deny"
unimplemented = "deny"
unreachable = "deny"
```

Run the policy locally and in continuous integration:

```powershell
cargo clippy --all-targets --all-features -- -D warnings
```

The source article also recommends the `pedantic` and `nursery` groups and stricter lints such as `arithmetic_side_effects`, `unchecked_time_subtraction`, `exit`, and `as_conversions`. Add these after review. They cover a wider failure policy, can produce many findings, and do not all identify a direct panic path. Use a narrow `#[allow(...)]` with a reason when a reviewed invariant makes an operation safe.

Clippy reduces common panic paths, but it does not prove that a complete application cannot panic. Dependencies, allocation failure, stack overflow, foreign code, and platform behavior remain relevant.

For selected functions, the [`no-panic`](https://docs.rs/no-panic/latest/no_panic/) crate can detect a link to the panic handler. It checks at link time and can require optimization or link-time optimization. It can also report a failure when the compiler cannot prove that a function is panic-free. It is not useful with `panic = "abort"`.

## Sources

- [Rust Don't Panic](https://www.namtao.com/rust-dont-panic/) — source article and practical no-panic policy
- [Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html) — The Rust Programming Language
- [To `panic!` or Not to `panic!`](https://doc.rust-lang.org/book/ch09-03-to-panic-or-not-to-panic.html) — guidance for recoverable errors, invariants, examples, and tests
- [Clippy lints](https://rust-lang.github.io/rust-clippy/stable/index.html) — current lint definitions and limitations
- [The Cargo `[lints]` section](https://doc.rust-lang.org/cargo/reference/manifest.html#the-lints-section) — manifest configuration
