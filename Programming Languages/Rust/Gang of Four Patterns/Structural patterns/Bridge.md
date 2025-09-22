decouples an abstraction from its implementation so that the two can vary independently

```rust
trait Renderer {
    fn render_circle(&self, x: f64, y: f64, radius: f64);
}

struct VectorRenderer;
impl Renderer for VectorRenderer {
    fn render_circle(&self, x: f64, y: f64, radius: f64) {
        println!("Drawing a circle with center ({}, {}) and radius {} using vector graphics.", x, y, radius);
    }
}

struct RasterRenderer;
impl Renderer for RasterRenderer {
    fn render_circle(&self, x: f64, y: f64, radius: f64) {
        println!("Drawing a circle with center ({}, {}) and radius {} using raster graphics.", x, y, radius);
    }
}

struct Circle<'a> {
    x: f64,
    y: f64,
    radius: f64,
    renderer: &'a dyn Renderer,
}

impl<'a> Circle<'a> {
    fn new(x: f64, y: f64, radius: f64, renderer: &'a dyn Renderer) -> Circle<'a> {
        Circle { x, y, radius, renderer }
    }

    fn draw(&self) {
        self.renderer.render_circle(self.x, self.y, self.radius);
    }
}
```