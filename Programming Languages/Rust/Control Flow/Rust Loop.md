```rust
fn main() {
    let mut x = 0;
    let result = loop {
        x += 1;
        if x==3 break;
    };
    println!("result = {}" x);
}
```

Loop can return result on break
```rust
fn main() {
    let mut x = 0;
    let result = loop {
        x += 1;
        if x==3 {
            break 2*x; // break gives return value
        }
    };
    println!("result = {}" x);
}
```

Loops can be labeled
```rust
'outer: loop { 
	'inner: loop {
	    if condition {
		    break; // break the inner loop
		}
		else {
		    break 'outer; // break the outer loop
		}
	}
}
```
