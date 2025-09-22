
## format!

Formats a string
```rust
format!("test");
format!("hello {}", "world!");
format!("x = {}, y = {y}", 10, y = 30);
let (x, y) = (1, 2);
format!("{x} + {y} = 3");
format!("{:.2}%", percentage*100.0); // format percentage with two digits after the comma
```

| Format               | Description                                        |
| -------------------- | -------------------------------------------------- |
| `format!("{}", x)`   | use `std::fmt::Display`                            |
| `format!("{:?}", x)` | use `std::fmt::Debug`                              |
| `format!("{x}")`     | use string interpolation using `std::fmt::Display` |

## print! println!

Executes a format on a string an prints to the `stdout`.
```rust
println!("string");
println!("x = {}", x);
```

`println!` prints a line ending, while `print!` does not.

## panic!

throws an exception
```rust
panic!();
panic!("exception has occured");
panic!("exception has occured: {} {message}", "type", message = "message");
```

## assert!

Assert an boolean expression
```rust
assert!(x == 5);
```

## assert_eq! assert_ne!

Assert the equality of two variables
```rust
let vec = Vec::new([0, 1, 2, 3]);
assert_eq!(vec, [0, 1, 2, 3]);
```

Assert the inequality of two variables
```rust
assert_ne!(5, 7);
```

## vec!

Creates a vector
```rust
vet vec = vec!([0, 1, 2, 3]);
```

## try!

Returns an error if the result of an operation is an error variant.

## unreachable!

Marks code segment that should never be reached.

## dbg!

Prints the value of a variable to `stdout` and returns the value.
```rust
let x = 5;
let y = dbg!(x);
```

## min! max!

Get the minimum or maximum value between two expressions.
```rust
let min = min!(3, 5);
let max = max!(3, 5);
```

## concat!

Concatenates two compound data-types:
```rust
let foo = String::from("foo");
let bar = String::from("bar");
let foobar = concat!(foo, bar);
```

## include!

Injects the content of another file as source-code at compile-time:
```rust
let result = include!("code.in");
```

## include_str!

Injects the content of another file as string-literal at compile-time:
```rust
let query = include_str!("query.sql")
```

## env! option_env!

Gets the value of an environment variable. `env!` requires the variable to be present; `option_env!` returns an option type.

## stringify!

Converts a [[Rust Expression]] to a string literal.

## cfg!

Checks if a configuration flag is set at compile time for conditional compilation.

## file! line! function! column!

Gets the file name, line number, fucntion name, and column index of the source file. Useful for logging and debugging.

## any!

Given a list of pattern matchings, checks if any pattern matches on an object.

## select!

## lazy_static!

## once_cell!

## See also

- [Macros in Rust Tutorial](https://blog.logrocket.com/macros-in-rust-a-tutorial-with-examples/)