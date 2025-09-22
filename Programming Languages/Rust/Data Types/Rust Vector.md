`Vector` or `Vec<T>`.

```rust
let mut v: Vec<u8> = Vec::new();
let v = vec![1.5, 2.4, 3.3]; // Vec<f64>
```

Use `.push()` and `.pop()` to add/remove values to a mutable vector.

Use `{:?}` when formating a vector
```rust
let v = vec![1.5, 2.4, 3.3];
let str = format!("{:?}", v);
```

Get element
```rust
let v = vec![1.5, 2.4, 3.3];
let firstElement = v[0];
let firstElement = v.get(0);
```

Set element
```rust
let mut v = vec![1.5, 2.4, 3.3];
v[0] = 45.5;
v.set(0, 45.5);
```
