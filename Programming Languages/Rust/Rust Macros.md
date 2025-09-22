## Designators

- `block`
- `expr` is used for expressions
- `ident` is used for variable/function names
- `item`
- `lifetime`
- `literal` is used for literal constants
- `meta`
- `pat` (_pattern_)
- `pat_param`
- `path`
- `stmt` (_statement_)
- `tt` (_token tree_)
- `ty` (_type_)
- `vis` (_visibility qualifier_)

## Declarative Macros

```rust
let v:Vec<u32> = vec![1, 2, 3];
```

## Dervive Macros

```rust
#[derive(MyMacro)]
pub struct MyStruct {
    // ...
}
```

## Attribute-Like Macro

```rust
#[get("/")]
fn get() {
    // ...
}
```

## Function-Like Macro

```rust
command!(foobar);
```

## See also
- [macro_rules! - Rust By Example](https://doc.rust-lang.org/rust-by-example/macros.html)
- [Macros - The Rust Reference](https://doc.rust-lang.org/reference/macros.html)