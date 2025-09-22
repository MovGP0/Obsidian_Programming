```rust
fn add(x: i32, y: u8) -> i32
{
    let iy:i32 = <i32>::from(y);
    return x + iy;
}

fn div(divisor: f32, dividend: f32) -> (f32, f32)
{
    // ...
    return (result, rest);
}
```

## Borrowing

Use `&` for borrowing the reference to an object:
```rust
fn main() {
    let foobar = String::from("foobar");
    print(&foobar); // reference is borrowed
    println!("{}", foobar);
}

fn print(value: &String) {
    println!("{}", value);
}
```

Use `&mut` for mutable borrowing:
```rust
fn main() {
    let mut foobar = String::from("foo");
    add_bar(&mut foobar);
    println!("{}", foobar);
}

fn add_bar(value: &mut String) {
    value.push_str("bar");
}
```
