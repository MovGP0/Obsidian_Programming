## Unneccesary indirection with pointers

**Wrong: use string pointer**
```rust
fn main() {
   let s = "foobar".to_owned();
   my_print(&s);
}

fn my_print(s: &String) {
    println!("{}", s);
}
```

**Correct:** Use string slice
```rust
fn main() {
   let s = "foobar".to_owned();
   my_print(&s);
}

fn my_print(s: &str) {
    println!("{}", s);
}
```

## Overusing Rc/RefCell

*See also:* [[Rust Smart Pointers]]

## Overusing slice indexing

**Wrong:** for loop with 1-off error: 
```rust
let points: Vec<Coordinate> = ...;
let differences = Vec::new();

for i in 0..points.len() {
    let current = points[i];
    let previous = points[i-1]; // index is -1 on first run
    differences.push(current - previous);
}
```

**Correct:** use array window to access adjacent elements
```rust
let points: Vec<Coordinate> = ...;
let differences = Vec::new();

for [previous, current] in points.array_windows().copied() {
    differences.push(current - previous);
}
```

**Correct:** functional version
```rust
let points: Vec<Coordinate> = ...;
let differences: Vec<_> = points
    .array_windows()
    .copied()
    .map(|previous, current| current - previous)
    .collect();
```

## Using the wrong (integer) datatype

*See also:* [[Rust Data Types]]

## Using sentinal values 

Sential values include `-1`, `""`, `null`. Use `Option<T>` type instead.

*Wrong:* use default value to indicate element missing
```rust
fn get_username(id: i32) -> String {
    if id == 1 {
        return "username".to_owned();
    }
    return "".to_owned()
}
```

*Correct:* use option type
```rust
fn get_username(id: i32) -> Option<String> {
    if id == 1 {
        return Some("username".to_owned());
    }
    return None;
}
```

## Not using enum

*Wrong:* using string
```rust
fn can_publish_blog(role: String) -> bool {
    if role == "Admin" || role == "Writer" {
        return true;
    }
    return false;
}
```

*Correct:* using enum
```rust
enum Role {
    Admin,
    Reader,
    Writer
}

fn can_publish_blog(role: Role) -> bool {
    return match role {
        Role::Admin | Role::Writer => true,
        _ => false
    };
}
```
s
*See also:* [[Rust Enums]]

## Improper Error Handling

- Not using `?` operator for error propagation.
- Not Implementing custom Error types without implementing the error trait.

*See also:* [[Rust error handling]]

## Not implementing Traits of Standard Library

*See also:* [[Rust Generics and Traits]]

## Not using Macros of Standard Library

*See also:* [[Rust Common Macros]]

## Not using Rust Tooling

Use `cargo fmt` and `cargo clippy`.

*See also:* [[cargo]]

## Source

- [8 deadly mistakes beginner Rust developers make](https://www.youtube.com/watch?v=PbR4ECFIckg)
- [Common Newbie Mistakes and Bad Practices in Rust: Bad Habits](https://adventures.michaelfbryan.com/posts/rust-best-practices/bad-habits/)