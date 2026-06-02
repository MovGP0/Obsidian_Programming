A **quad tree** recursively divides a two-dimensional region into four quadrants. It indexes spatial data such as map tiles, collision regions, images, and point clouds.

Quad trees are effective when data is clustered because sparse regions remain shallow while dense regions subdivide.

## C\# Example

```csharp
public sealed record Bounds(double X, double Y, double Width, double Height);

static Bounds NorthWest(Bounds b)
{
    return new Bounds(b.X, b.Y, b.Width / 2, b.Height / 2);
}
```

## Rust Example

```rust
struct Bounds {
    x: f64,
    y: f64,
    width: f64,
    height: f64,
}

fn north_west(b: &Bounds) -> Bounds {
    Bounds { x: b.x, y: b.y, width: b.width / 2.0, height: b.height / 2.0 }
}
```

## Further Reading

- [Wikipedia: Quadtree](https://en.wikipedia.org/wiki/Quadtree)
- [NIST DADS: Quadtree](https://xlinux.nist.gov/dads/HTML/quadtree.html)
- [Game Programming Patterns: Spatial Partition](https://gameprogrammingpatterns.com/spatial-partition.html)
