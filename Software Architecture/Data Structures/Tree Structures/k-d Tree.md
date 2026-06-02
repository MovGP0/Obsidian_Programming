A **k-d tree** partitions points in k-dimensional space by alternating split axes at each depth. It supports spatial queries such as nearest neighbor search and range search.

The tree works best for low-dimensional data. As dimensions grow, pruning becomes less effective.

## C\# Example

```csharp
public sealed record Point2(double X, double Y);

static double Coordinate(Point2 point, int axis)
{
    return axis == 0 ? point.X : point.Y;
}
```

## Rust Example

```rust
#[derive(Clone, Copy)]
struct Point2 {
    x: f64,
    y: f64,
}

fn coordinate(point: Point2, axis: usize) -> f64 {
    if axis == 0 { point.x } else { point.y }
}
```

## Further Reading

- [Wikipedia: k-d tree](https://en.wikipedia.org/wiki/K-d_tree)
- [NIST DADS: k-d tree](https://xlinux.nist.gov/dads/HTML/kdtree.html)
- [SciPy: KDTree](https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.KDTree.html)
