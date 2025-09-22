Slice of collection, like [#String], [#Array] or [#Vector]. Does not have ownership of data.

Slice of string is of type `&str`.

Internally implemented as pointer-address, data-type and length.

```rust
fn main() {
    let foobar = String.from("foobar");
    let foo = &foobar[0..2];
    let bar = &foobar[3..foobar.len())];
    println!("{} {}", foo, bar);
}
```

```rust
fn main() {
    let foobar = String.from("foobar");
    let foo = &foobar[..2];
    let bar = &foobar[3..)];
    println!("{} {}", foo, bar);
}
```

**Warning** Since strings are UTF-8 encoded, a single character can span between 1 and 4 bytes.
