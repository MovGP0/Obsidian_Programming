- Uses Trait Objects
- Does not work with Generics
- Smaller binary size, but slow

```rust
fn print_area(shape: &dyn Shape) {
    let area = shape.area();
    println!("area: {}", area);
}

fn main() {
    let shape = ...;
    print_area(&shape);
}
```
