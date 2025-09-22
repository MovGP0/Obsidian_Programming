involves creating new objects by cloning existing objects. It allows for efficient object creation without the need for complex initialization logic.

```rust
#[derive(Clone)]
struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn new(name: &str, age: u32) -> Self {
        Self {
            name: name.to_string(),
            age,
        }
    }
}

fn main() {
    let john = Person::new("John", 30);
    let jane = john.clone();

    println!("{:?}", john);
    println!("{:?}", jane);
}
```