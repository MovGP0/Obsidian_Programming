An **R-Tree** indexes spatial objects by bounding rectangles. Internal nodes store minimum bounding rectangles that cover their children, allowing spatial searches to discard regions that cannot intersect a query.

R-Trees are used in GIS, CAD, games, and databases for rectangle intersection, nearest-neighbor, and containment queries. Performance depends on split heuristics because overlapping bounding rectangles can force multiple branches to be searched.

## C\# Example

```csharp
public readonly record struct Rect(double MinX, double MinY, double MaxX, double MaxY)
{
    public bool Intersects(Rect other)
    {
        return MinX <= other.MaxX &&
            MaxX >= other.MinX &&
            MinY <= other.MaxY &&
            MaxY >= other.MinY;
    }
}

var query = new Rect(0, 0, 10, 10);
var item = new Rect(5, 5, 12, 12);
Console.WriteLine(query.Intersects(item));
```

## Rust Example

```rust
#[derive(Clone, Copy)]
struct Rect {
    min_x: f64,
    min_y: f64,
    max_x: f64,
    max_y: f64,
}

impl Rect {
    fn intersects(self, other: Rect) -> bool {
        self.min_x <= other.max_x
            && self.max_x >= other.min_x
            && self.min_y <= other.max_y
            && self.max_y >= other.min_y
    }
}
```

These examples show the bounding-box predicate used during R-Tree traversal.

## Further Reading

- [R-tree - Wikipedia](https://en.wikipedia.org/wiki/R-tree)
- [Guttman paper: R-trees](https://dl.acm.org/doi/10.1145/602259.602266)
- [PostGIS spatial indexes](https://postgis.net/workshops/postgis-intro/indexing.html)
