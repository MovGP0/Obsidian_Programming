```rust
let result = match speed {
    1..=4 => 1.0,
    5..=8 => 0.9,
    9..=10 => 0.77,
    _ => 0.0
    }
```

```rust
let x = 5;

match x {
	1 => println!("one"),
	2 | 3 => println!("two or three"),
	4..=9 => println!("within range"),
	x => println!("{}", x),
	_ => println!("default Case")
}
```

## Match Guards

```rust
let optional = Some(0); 
match optional {
	Some(i) if i < 0 => println!("Number {} was negative", i),
	Some(i) => println!("Number {} was positive", i),
	None => println!("No value.")
};
```

## Deconstruct Object

### Using Struct
```rust
struct Point {
    x: i32,
    y: i32
}

fn main() {
	let p = Point { x: 0, y: 7 };
	
	match p {
	    Point { x, y: 0 } => {
		    println!("{}" , x);
		},
	    Point { x, y } => { 
		    println!("{} {}" , x, y);
		}
	}
}
```

### Using Enum
```rust
enum Shape { 
    Rectangle { width: i32, height: i32 },
    Circle(i32)
} 

fn main() {
    let shape = Shape::Circle(10);

    match shape { 
        Shape::Rectangle { x, y } => //... 
        Shape::Circle(radius) => //...
    }
}
```

### Discard values

```rust
struct SemVer(i32, i32, i32); 

let version = SemVer(1, 32, 2);

match version {
    SemVer(major, _, _) => {
        println!("Major Version: {}", major);
    }
}
```

```rust
let numbers = (2, 4, 8, 16, 32);
match numbers {
    (head, .., tail) => {
        println!("Head: {}, Tail: {}", head, tail);
    }
}
```

### `@`-bindings

```rust
struct User { id: i32 } 

let user = User { id: 5 }; 

match user { 
    User { id: id_variable @ 3..=7 } => { 
        println!("id: {}", id_variable);
    },
    User { id: 10..=12 } => {
        println!("within range");
    },
    User { id } => {
        println!("id: {}", id);
    }
}
```

## See also
- [Rust By Example: match](https://doc.rust-lang.org/rust-by-example/flow_control/match.html)