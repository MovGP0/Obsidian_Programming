```rust
fn main() {
  let mut x = 0;
  while x < 3 {
      x += 1;
      println!("x = {}", x);
  }
}
```

```rust
while n < 101 { 
    n += 1;
}
```

```rust
let mut optional = Some(0);
while let Some(i) = optional {
	print!("{}", i);
}
```