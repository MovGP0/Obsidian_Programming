A **range tree** indexes points for orthogonal range queries such as "find all points with `x` between `a` and `b` and `y` between `c` and `d`." It is a balanced search tree by one coordinate, often with associated secondary trees for other coordinates.

In two dimensions, range trees can answer queries in $O(\log^2 n + k)$ time, where `k` is the number of reported points. Fractional cascading can reduce one logarithmic factor.

## C\# Example

```csharp
public sealed record Point2D(int X, int Y);

static IEnumerable<Point2D> Query(IEnumerable<Point2D> points, int minX, int maxX, int minY, int maxY)
{
    return points.Where(point =>
        minX <= point.X && point.X <= maxX &&
        minY <= point.Y && point.Y <= maxY);
}

var points = new[] { new Point2D(1, 3), new Point2D(4, 8), new Point2D(6, 2) };
var result = Query(points, 0, 5, 0, 5);
```

## Rust Example

```rust
#[derive(Clone, Copy)]
struct Point2D {
    x: i32,
    y: i32,
}

fn query(points: &[Point2D], min_x: i32, max_x: i32, min_y: i32, max_y: i32) -> Vec<Point2D> {
    points
        .iter()
        .copied()
        .filter(|p| min_x <= p.x && p.x <= max_x && min_y <= p.y && p.y <= max_y)
        .collect()
}
```

These snippets show the query shape; a range tree avoids scanning every point.

## Further Reading

- [Range tree - Wikipedia](https://en.wikipedia.org/wiki/Range_tree)
- [Orthogonal range searching - Wikipedia](https://en.wikipedia.org/wiki/Orthogonal_range_searching)
- [Fractional cascading - Wikipedia](https://en.wikipedia.org/wiki/Fractional_cascading)
