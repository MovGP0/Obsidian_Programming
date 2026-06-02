An **octree** recursively divides a three-dimensional region into eight octants. It is used for 3D collision detection, voxel storage, visibility culling, point clouds, and sparse volumetric data.

Like quad trees, octrees adapt to uneven spatial density by subdividing only where more detail is needed.

## C\# Example

```csharp
public sealed record Box3(double X, double Y, double Z, double Size);

static Box3 Child(Box3 box, int x, int y, int z)
{
    var half = box.Size / 2;
    return new Box3(box.X + x * half, box.Y + y * half, box.Z + z * half, half);
}
```

## Rust Example

```rust
struct Box3 {
    x: f64,
    y: f64,
    z: f64,
    size: f64,
}

fn child(b: &Box3, x: f64, y: f64, z: f64) -> Box3 {
    let half = b.size / 2.0;
    Box3 { x: b.x + x * half, y: b.y + y * half, z: b.z + z * half, size: half }
}
```

## Further Reading

- [Wikipedia: Octree](https://en.wikipedia.org/wiki/Octree)
- [NIST DADS: Octree](https://xlinux.nist.gov/dads/HTML/octree.html)
- [OpenVDB: sparse volumetric data](https://www.openvdb.org/)
