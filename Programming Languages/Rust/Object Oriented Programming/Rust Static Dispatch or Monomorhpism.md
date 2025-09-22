- Uses [[Rust Generics and Traits]]
- Converts generic code to fixed code
- Increases binary size, but very fast

```rust
fn print_area<T: Shape>(shape: T) {
    let area = shape.area();
    println!("area: {}", area);
}

fn main() {
    let shape = ...;
    print_area(shape);
}
```
