### Implement `Send` / `Sync`

- `Send`/`Sync` traits are implemented automatically
- Does not work when there is a reference to a type that does not implement send/sync
	- ie. `Rc<T>` (reference counter) instead of `Arc<T>`

Test if Send/Sync is implemented
```rust
fn is_normal<T: Sized + Send + Sync + Unpin>(){};

#[test]
fn_normal_types() {
    is_normal::<MyType>(); // compiler ensures that traits are implemented
}
```

### Implement `serde::Serialize` / `serde::Deserialize`

Cargo.toml
```toml
[package]
name = "some-crate-name"
version = "0.1.0"
authors = ["Firstname Lastname <firstname.lastname@domain.com>"]

[dependencies]
serde = { version = "1.0", features = ["derive"], optional = true }
serde_json = "1.0" # for JSON serialization; use proper package for the required serialization format

[features]
serde = ["dep:serde"]
```

Implement traits using `#[derive()]`.
- Use `#[serde(skip)]` for attributes that can't be serialized.
- Use `cfg` and `cfg_attr` macros to make code lines and attributes conditional on compiler variable.
```rust
#[cfg(feature="serde")]
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Default, PartialEq)]
#[cfg_attr(feture="serde", derive(Serialize, Deserialize))]
struct Point {
    x: i32,
    y: i32,

    #[cfg_attr(feture="serde", serde(skip)]
    nextPoint: Option<Arc<Point>>
}
```

Usage
```rust
let point = Point { x: 1, y: 2 };

#[cfg(feature="serde")]
let serialized = serde_json::to_string(&point).unwrap();
#[cfg(feature="serde")]
println!("serialized = {}", serialized);

#[cfg(feature="serde")]
let deserialized: Point = serde_json::from_str(&serialized).unwrap();
#[cfg(feature="serde")]
println!("deserialized = {:?}", deserialized);
```

See also: [Using derive](https://serde.rs/derive.html)

