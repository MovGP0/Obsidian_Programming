A **plain old data structure** is a simple aggregate of fields with predictable memory layout and no hidden behavior such as custom constructors, virtual dispatch, or ownership hooks. In C and C++, the phrase is often shortened to POD.

POD-style values are useful for serialization, interop, memory-mapped data, GPU buffers, and cache-friendly arrays. The exact language rules differ, but the design goal is simple value storage with explicit behavior outside the data record.

## Operations

- Store fields without object identity requirements.
- Copy or move values cheaply when the language permits it.
- Marshal data across process or language boundaries.
- Keep invariants simple because construction hooks may be absent.

## C\# Example

```csharp
using System.Runtime.InteropServices;

[StructLayout(LayoutKind.Sequential)]
public struct Point
{
    public int X;
    public int Y;
}

var point = new Point { X = 4, Y = 9 };
Console.WriteLine($"{point.X}, {point.Y}");
```

## Rust Example

```rust
#[repr(C)]
#[derive(Clone, Copy, Debug)]
struct Point {
    x: i32,
    y: i32,
}

let point = Point { x: 4, y: 9 };
println!("{}, {}", point.x, point.y);
```

## Further Reading

- [POD type - Wikipedia](https://en.wikipedia.org/wiki/Passive_data_structure)
- [C++ named requirement: PODType](https://en.cppreference.com/w/cpp/named_req/PODType)
- [StructLayoutAttribute in .NET](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.structlayoutattribute)

