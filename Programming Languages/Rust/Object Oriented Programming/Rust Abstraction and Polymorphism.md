Implemented using [[Rust Generics and Traits]].

```rust
using std::f64::consts::{ PI };

trait Shape {
    fn area(&self) -> f64;
}

struct Rectangle {
    heigth: f64,
    width: f64
}

impl Shape for Rectangle {
    fn area(&self) -> f64 {
        self.heigth * self.width
    }
}

struct Triangle {
    a: f64,
    b: f64,
    c: f64
}

impl Shape for Triangle {
    fn area(&self) -> f64 {
        let (a, b, c) = (self.a, self.b, self.c);
        let s = (a + b + c) / 2.0;
        (s*(s-a)*(s-b)*(s-c)).sqrt()
    }
}

struct Circle {
    radius: f64
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        PI * self.r * self.r
    }
}
```
