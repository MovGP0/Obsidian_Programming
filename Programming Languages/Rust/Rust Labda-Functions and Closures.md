
Declare lambda function
```rust
let lambda_function = |param1, param2| -> returntype { 
    // ...
};

lambda_function(foo, bar);
```

Lambda function example
```rust
#[test]
fn should_add_nums()
{
	let add_nums = |a, b| { a + b };
	let sum = add_nums(5, 10);
	assert_eq!(sam, 15);
}
```

Declare closure
```rust
struct Circle<T> where T: Fn(f32) -> f32 {
	radius: f32,
	area: T
}
```

```rust
#[test]
fn should_take_area_function() {
    let pi = 3.141596;
    let area_of_circle = |r:f32| -> f64 { pi * r * r };
    let c = Circle {
        area: area_of_circle,
        radius = 6.0
    };

    let result = (c.area)(c.radius);
    let expected = area_of_circle(c.radius);
    assert_eq!(result, expected);
}
```
