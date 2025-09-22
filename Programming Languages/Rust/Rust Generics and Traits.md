
## Generic struct
```rust
#[derive(Debug)]
struct Circle<T> {
    cx: T,
    cy: T,
    r: T
}
```

```rust
impl<T> Circle<T> {
    fn get_radius(&self) -> &T {
        &self.r
    }
}
```

Declare trait with default implementation
```rust
trait ShapeUtils {
    fn print_shape(&self) {
        println!("A shape");
    }
    fn area(&self) -> f64;
    fn perimeter(&self) -> f64;
}
```

Implement trait
```rust
impl ShapeUtils for Circle {
    fn print_shape(&self) {
        println!("Circle: center = ({}, {}), radius = {}", self.cx, self.cy, self.r);
    }

    fn area(&self) -> f64 {
        let pi = std::f64::consts::PI;
        return self.r * self.r * pi;
    }

    fn perimeter(&self) -> f64 {
        let pi = std::f64::consts::PI;
        return 2.0 * pi * self.r;
    }
}
```

*see also:* [[Rust Structs]]

## Generic function
```rust
fn foo<T>(arg: T) -> T {
    return arg;
}
```

Type with trait (type constraint)
```rust
use std::ops::Mul;
fn area_of_rect<T:Mul<Output=T>>(width: T, height: T) -> T {
    return width * height; // T must implement the Mul trait
}
```

Function that requires trait
```rust
fn foobar(value: &impl TraitName) {
    // ...
}

fn foobar(value: &(impl Trait1 + Trait2)) {
    // ...
}

fn foobar<T:TraitName>(value: &T) {
    // ...
}

fn foobar<T: Trait1 + Trait2>(value: &T) {
    // ...
}
```

*see also:* [[Rust Function]]

## Generic enum
```rust
enum Result<T, E> {
    Ok(T),
    Err(E)
}
```

*see also:* [[Rust Enums]]

## Common Traits

Implement on all (public) types:
- `Debug`
- `Clone`
- `Default`
- `PartialEq`
- Dependent on Use-case
	- `PartialOrd`
	- `Hash`
	- `Eq`
	- `Ord`
- For multithreading: 
	- `Send` / `Sync`
- For serialization over network:
	- `serde::Serialize` / `serde::Deserialize`

| Trait                | Description                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| `Clone`              | deep copy of object                                                             |
| `Copy`               | shallow copy of object                                                          |
| `Debug`              | implement `{:?}` and `{:#?}` format specifiers in `format!` and `print!` macros |
| `Eq`, `PartialEq`    | equality comparison                                                             |
| `Hash`               | calculate hash                                                                  |
| `Ord`, `PartialOrd`  | enable ordering comparisons                                                     |
| `ToString`           | enable conversion to string                                                     |
| `From`, `Into`       | Convert between types                                                           |
| `TryFrom`, `TryInto` | Save type conversion                                                            |
| `Iterator`           | Enables `for` loops                                                             |
| `Display`            | implement `{}` format specifier in `format!` and `print!` macros                |
| `AsRef`, `AsMut`     | type conversion with shared reference                                           |
| `Index`, `IndexMut`  | Indexing and mutable indexing of object                                         |
| `Deref`, `DerefMut`  | Enable `*` operator for smart pointer                                           |
| `Read`, `Write`      | Read/write operations on streams                                                |
| `Send`, `Sync`       | Send and share data between threads savely                                      |
| `Default`            | Default values on object                                                        |
| `Drop`               | Implement destructor                                                            |
| `FromStr`            | Deserialize object from string                                                  |
| `serde::Serialize`   | serialize using serde library                                                   |
| `serde::Deserialize` | deserialize using serde library                                                 |

## See also

- [[Rust Implement Common Traits]]