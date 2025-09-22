Treat individual objects and groups of objects uniformly. It involves creating a hierarchy of objects where each object in the hierarchy can be treated as either an individual object or a group of objects. 

This allows you to perform operations on groups of objects in the same way as you would perform them on individual objects.

```rust
enum Shape {
    Circle { x: f64, y: f64, radius: f64 },
    Rectangle { x: f64, y: f64, width: f64, height: f64 },
    Group(Vec<Shape>),
}

impl Shape {
    fn draw(&self) {
        match self {
            Shape::Circle { x, y, radius } 
                => println!("Drawing a circle with center ({}, {}) and radius {}.", x, y, radius),
            Shape::Rectangle { x, y, width, height } 
                => println!("Drawing a rectangle at pos. ({}, {}) width {} height {}.", x, y, width, height),
            Shape::Group(shapes) => {
                println!("Drawing a group of shapes:");
                for shape in shapes {
                    shape.draw();
                }
            }
        }
    }
}
```