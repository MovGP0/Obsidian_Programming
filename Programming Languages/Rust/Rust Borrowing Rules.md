## Ownership rules 
1. Each value in Rust has a variable that’s called its owner. 
2. There can only be one owner at a time. 
3. When the owner goes out of scope, the value will be dropped. 

## Borrowing rules 
1. At any given time, you can have either one mutable reference or any number of immutable references. 
2. References must always be valid.

## Create Reference

Immutable reference
```rust
let s1 = String::from("hello world!"); 
let s1_ref = &s1;
```

Mutable reference
```rust
let mut s2 = String::from("hello");
let s2_ref = &mut s2;
s2_ref.push_str(" world!");
```

## Copy

Values which implement the `Copy` trait are copied by value
```rust 
let x = 5;
let y = x;
println!("{}", x);
```

*See also:* [[Rust Generics and Traits]]

## Move

Variable is invalid after ownership is transfered
```rust
let s1 = String::from("Let's Get Rusty!"); 
let s2 = s1; // Shallow copy (reference only)
println!("{}", s1); // panic!
```

## Clone

Variable is valid after deep copy
```rust
let s1 = String::from("Hello World!");
let s2 = s1.clone(); // Deep copy 
println!("{}", s1); // works!
```

## Ownership with Functions

```rust
fn takes_copy(some_integer: i32) { 
    println!("{}", some_integer);
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}

fn gives_ownership() -> String {
    let some_string = String::from("LGR");
    some_string
}

fn takes_and_gives_back(some_string: String) -> String { 
     some_string
}

fn main() {
    let x = 5;

    // x is copied by value
    takes_copy(x); 
    
    let s = String::from("Hello World!"); 
    
    // s is moved into the function 
    takes_ownership(s);
    
    // return value is moved into s1 
    let s1 = gives_ownership();
    
    let s2 = String::from("Hello World!");
    let s3 = takes_and_gives_back(s2);
}
```




