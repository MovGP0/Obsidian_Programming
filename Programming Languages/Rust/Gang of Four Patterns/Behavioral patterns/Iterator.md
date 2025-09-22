traverse a collection of items one at a time. Rust provides an `Iterator` trait as part of its standard library.

```rust
// Define a struct that holds a vector of integers
struct MyCollection {
    data: Vec<i32>,
}

// Implement the Iterator trait for MyCollection
impl Iterator for MyCollection {
    type Item = i32;

    // Implement the next method to return the next item in the collection
    fn next(&mut self) -> Option<Self::Item> {
        if self.data.is_empty() {
            None
        } else {
            Some(self.data.remove(0))
        }
    }
}

fn main() {
    // Create a new MyCollection with some data
    let mut my_collection = MyCollection {
        data: vec![1, 2, 3, 4, 5],
    };

    // Iterate over the collection using a for loop
    for item in my_collection {
        println!("{}", item);
    }
}

```