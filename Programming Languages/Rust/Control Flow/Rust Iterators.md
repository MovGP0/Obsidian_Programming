```rust
let arr = [1, 2, 3, 4, 5, 6];
let items = arr.iter();

for val in items {
    println!("{}", val);
}
```

Iterable classes need to implement the [Iterator trait](https://doc.rust-lang.org/std/iter/trait.Iterator.html)
```rust
trait Iterator {
    type Item;
    fn next(&mut self) => Option<Self::Item>;
    // ...
}
```
Iteration is finished when `.next()` function returns `Option.None`.

## Iteration methods

| Method                   | Description                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- |
| `.iter()`                | Creates iteration object. Collection can be used after iteration.             |
| `.into_iter()`           | Creates iteration object and transfers ownership. Collection can't be reused. |
| `.iter_mut()`            | Crates iteration object. Items in the collection can be modified.             |
| `.iter().sum()`          | Sums numbers                                                                  |
| `.iter().map(|x| x + 1)` | Maps iterator                                                                 |
| `.iter().collect()`      | Creates a new collection of type `Vec<_>`                                     |

## Implement Iterator Trait

Example 1
```rust
struct Counter {
    current_count: u32,
    max_count: u32
}

impl Default for Counter {
    fn default() -> Counter {
        return Counter {
            current_count = 0
        }
    }
}

impl Interator for Counter {
    type Item = u32;
    
    fn next(&mut self) -> Option<Self::Item> {
        if self.current_count < self.max_count {
            self.current_count += 1;
            return Some(self.current_count);
        }
        return None;
    }
}
```

Example 2
```rust
struct Counter { count: u32, } 

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}
        
impl Iterator for Counter {
    type Item = u32;
    fn next(&mut self) -> Option {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        }
        else {
	        None
	    }
	}
}
```

## See also

- [[Rust Generics and Traits]]
