String uses UTF-8 encoding and is created from String Literal.

String literal
```rust
let x = "some string"; // create string literal
```

Construct string type
```rust
let s = String::new();
let s = String::from("foobar");
let s = "foobar".to_string();
```

Use string type
```rust
let mut x = String:from("some string"); // convert immutable string literal to mutable string type
x.push_str(" foo"); // append to string

x.as_ptr(); // get pointer to memory location
x.len(); // legth of string
x.capacity(); // size of memory in bytes
let s = x.clone(); // copy string and create a new string on the heap
let a = x; // transfer ownership to a new variable/pointer
```

String concatenation
```rust 
let foo = String::from("foo");
let bar = String::from("bar");

let foobar = foo.add(&bar);
let foobar = foo + &bar; // uses add extension method
let foobar = foo + "bar"; // overload for string-literal
let foobar = format!("{}{}", foo, bar);
```

Get byte representation / char array
```rust
let foo = String::from("foo");
let bytes = foo.bytes(); // [102, 111, 111]
let chars = foo.chars(); // ['f', 'o', 'o']
```

## See also

- [[Rust Slices]]