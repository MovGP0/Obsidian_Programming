```rust
fn main() {
    let arr = [10, 20, 30, 40];
    for item in arr.iter() {
        println!("item = {}", item);
    }
}
```

```rust
for n in 0..10 {
    println!("{}", n); // executes 10 times
}
```

```rust
for n in 0..=10 {
    println!("{}", n); // executes 11 times
}
```

```rust
for n in &[0, 1, 2, 3, 4, 5, 6, 7, 8, 9] {
    println!("{}", n);
}
```

## Examples

### Bubblesort

```rust
let mut haystack = [4, 3, 5, 7];

for _ in 0..haystack.len() {
    for i in 1..haystack.len() {
        if haystack[i-1] > haystack[i] {
            haystack.swap(i, i-1);
        }
    }
}

// print the sorted array
println!("{:?}", haystack);
```