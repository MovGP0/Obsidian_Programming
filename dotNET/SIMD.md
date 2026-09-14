---
title: Single instruction, multiple data in .NET (SIMD)
---
**Single instruction, multiple data** (**SIMD**) lets one CPU instruction operate on several values. It is useful for repeated, independent work on arrays and spans. Typical uses include image processing, signal processing, physics, geometry, parsing, and machine learning.

SIMD uses data parallelism on one CPU core. It does not start more threads. A program can use SIMD and multithreading together when the workload is large enough.

## When SIMD helps

SIMD works best when:

- The same operation applies to many values.
- Iterations do not depend on earlier iterations.
- Data is contiguous in memory.
- The loop does little branching.
- The input is large enough to pay for setup and remainder handling.

SIMD can give little or no benefit when a loop is limited by memory bandwidth, uses unpredictable branches, or processes only a few values. Measure the complete operation before and after a change.

## Select an API

Use the highest-level API that provides the required operation:

| API | Use |
| --- | --- |
| Existing .NET APIs and `TensorPrimitives` | Use for common span, tensor, text, and numeric operations. The implementation can already contain optimized SIMD paths. |
| `Vector128<T>`, `Vector256<T>`, `Vector512<T>` | Use for new manual SIMD algorithms that must remain cross-platform. Start with `Vector128<T>`, then add wider paths when measurements show a benefit. |
| `Vector<T>` | Use for simple, portable algorithms when a JIT-selected width is suitable. |
| `System.Runtime.Intrinsics.X86`, `.Arm`, or `.Wasm` | Use when a fixed-width vector API does not expose a required instruction, or a benchmark proves that a platform-specific path is better. |

The fixed-width vector APIs express the operation without selecting an instruction set in the source code. The JIT can map the operation to x86, Arm, or WebAssembly instructions.

## Vector width and element count

A vector holds fewer large values than small values. A `double` is 64 bits and a `float` is 32 bits.

| SIMD type | Width | `float` values | `double` values |
| --- | ---: | ---: | ---: |
| `Vector128<T>` | 128 bits | 4 | 2 |
| `Vector256<T>` | 256 bits | 8 | 4 |
| `Vector512<T>` | 512 bits | 16 | 8 |

`Vector<T>` and the fixed-width vectors support `double`. Therefore, SIMD is not limited to single-precision data.

Wider vectors do not always give better results. Some processors execute a wide operation as smaller lanes. Reductions and shuffles can need more instructions because data must cross these lanes. A wider vector can also increase register pressure or change the processor frequency. Always use a benchmark for the target hardware.

## Use `TensorPrimitives` first

The `System.Numerics.Tensors` package provides operations on spans. These operations include internal vectorized implementations. For example, use `SumOfSquares` instead of a manual loop when its behavior meets the requirement:

```csharp
using System.Numerics.Tensors;

static double SumSquares(ReadOnlySpan<double> values)
{
    return TensorPrimitives.SumOfSquares(values);
}
```

`TensorPrimitives` also provides element-wise operations and reductions such as dot product and cosine similarity. It reduces the amount of code that must handle vector widths, small inputs, and remaining elements.

## Use `Vector<T>` for a JIT-selected width

`System.Numerics.Vector<T>` has a width that the JIT selects. `Vector<double>.Count` is the number of `double` values in one vector.

```csharp
using System.Numerics;

static void Add(
    ReadOnlySpan<double> left,
    ReadOnlySpan<double> right,
    Span<double> destination)
{
    if (left.Length != right.Length || left.Length != destination.Length)
    {
        throw new ArgumentException("The spans must have the same length.");
    }

    var count = Vector<double>.Count;
    var index = 0;

    for (; index <= left.Length - count; index += count)
    {
        var leftVector = new Vector<double>(left.Slice(index, count));
        var rightVector = new Vector<double>(right.Slice(index, count));
        var resultVector = leftVector + rightVector;

        resultVector.CopyTo(destination.Slice(index, count));
    }

    for (; index < left.Length; index++)
    {
        destination[index] = left[index] + right[index];
    }
}
```

Check acceleration and the selected width when you diagnose performance:

```csharp
Console.WriteLine(Vector.IsHardwareAccelerated);
Console.WriteLine(Vector<double>.Count);
```

Do not require a specific `Vector<T>` width. The selected width can depend on the runtime, CPU, and runtime configuration.

## Use fixed-width vectors for manual SIMD

Fixed-width vectors give explicit control over the width without binding the algorithm to one processor architecture. The following implementation uses four `double` values per iteration when `Vector256<double>` is accelerated. It uses a scalar path for small inputs and unsupported hardware.

```csharp
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;

static double SumSquares(ReadOnlySpan<double> values)
{
    if (!Vector256.IsHardwareAccelerated ||
        values.Length < Vector256<double>.Count)
    {
        return SumSquaresScalar(values);
    }

    ref var source = ref MemoryMarshal.GetReference(values);
    var accumulator = Vector256<double>.Zero;
    var count = Vector256<double>.Count;
    var lastVectorStart = values.Length - count;
    var index = 0;

    for (; index <= lastVectorStart; index += count)
    {
        var value = Vector256.LoadUnsafe(ref source, (nuint)index);
        accumulator += value * value;
    }

    var sum = Vector256.Sum(accumulator);

    for (; index < values.Length; index++)
    {
        sum += values[index] * values[index];
    }

    return sum;
}

static double SumSquaresScalar(ReadOnlySpan<double> values)
{
    var sum = 0.0;

    foreach (var value in values)
    {
        sum += value * value;
    }

    return sum;
}
```

Important details:

- Check the length before subtracting the vector count. This prevents integer underflow in lower-level implementations that use unsigned offsets.
- Use one starting reference and an element offset. This avoids repeated slicing and does not require pinning.
- Process the remaining values with a scalar loop.
- Expect small floating-point differences. A vector reduction can add values in a different order than a scalar loop.

A general implementation can check `Vector512.IsHardwareAccelerated`, then `Vector256.IsHardwareAccelerated`, then `Vector128.IsHardwareAccelerated`, and finally use a scalar path. Add each path only when the measured benefit justifies the maintenance and test cost.

## Use platform-specific intrinsics only when required

The x86 intrinsic APIs provide direct access to CPU instructions:

```csharp
using System.Runtime.Intrinsics;
using System.Runtime.Intrinsics.X86;

static Vector256<double> AddAvx(
    Vector256<double> left,
    Vector256<double> right)
{
    if (!Avx.IsSupported)
    {
        throw new PlatformNotSupportedException();
    }

    return Avx.Add(left, right);
}
```

For `double`, `Avx.Add` maps to `VADDPD`. `PD` means packed double-precision. The `PS` suffix in an x86 instruction name means packed single-precision.

Use `Fma.MultiplyAdd` when a fused multiply-add instruction is required and `Fma.IsSupported` is true. Fused multiply-add performs one rounding instead of rounding the multiplication and addition separately. Therefore, it can produce a different result from `a * b + c`. Treat this as a behavior difference, not only as a performance detail.

Keep a portable or scalar fallback for each platform-specific path. The JIT treats support checks such as `Avx.IsSupported` and `Vector256.IsHardwareAccelerated` as constants and removes branches that cannot run on the current processor.

## Prepare the data for SIMD

Memory layout can be more important than the selected intrinsic. Contiguous values are easy to load into vectors. Scattered fields can require extra loads and shuffles.

The graphics types `Vector2`, `Vector3`, `Vector4`, `Matrix4x4`, and `Quaternion` in `System.Numerics` use `float`. .NET does not provide a generic `Vector3<double>` type.

A custom type is useful for normal domain code:

```csharp
public readonly record struct Vector3d(double X, double Y, double Z);
```

However, an array of 24-byte `Vector3d` values is difficult to process with fixed-width SIMD. For bulk calculations on many points, consider a structure-of-arrays layout:

```csharp
double[] xCoordinates;
double[] yCoordinates;
double[] zCoordinates;
```

This layout lets one `Vector256<double>` load four X values, four Y values, or four Z values. An algorithm can process four 3D points in parallel. Keep an array-of-structures layout when object access and simple code are more important than bulk throughput. Change the layout only after measurement.

## Test each path

Test the following cases:

- An empty input.
- An input shorter than one vector.
- An input with exactly one vector.
- An input with remaining scalar elements.
- Special floating-point values when they are valid inputs: `NaN`, infinity, negative zero, and very small or large values.
- Overlapping source and destination spans when the API permits them.

The `DOTNET_EnableAVX2=0` environment variable can disable the AVX2 group before process start. `DOTNET_EnableHWIntrinsic=0` can disable hardware intrinsics for JIT-compiled application code. These settings help test fallback paths. Runtime configuration switches can differ between .NET versions, so confirm them for the target runtime.

## Benchmark and inspect the result

Use [[BenchmarkDotNet]] with a Release build. Benchmark realistic input sizes and data. Compare the complete scalar and SIMD operations, not only the arithmetic instruction.

Use BenchmarkDotNet's disassembly diagnoser when the result is unexpected. It can show whether the JIT emitted the intended instructions. Also check bounds checks, extra copies, calls that were not inlined, and time spent moving data.

Do not expect the speedup to equal the number of values in a vector. Memory bandwidth, instruction latency, dependencies, branches, and remainder handling limit the result.

## Practical sequence

1. Measure the application and find a hot loop.
2. Check whether an existing .NET API or `TensorPrimitives` implements the operation.
3. Write and test a clear scalar implementation.
4. Start a manual cross-platform implementation with `Vector128<T>`.
5. Add a `Vector256<T>` or `Vector512<T>` path only when a benchmark shows a useful gain.
6. Use processor-specific intrinsics only for a required operation or a measured improvement.
7. Test every vector-width path and the scalar fallback.
8. Inspect the generated assembly and benchmark on each deployment architecture.

## See also

- [[CPU Benchmarks]]
- [[dotNet Performance]]
- [[IlcInstructionSet]]

## References

- [Use SIMD and hardware intrinsics in .NET](https://learn.microsoft.com/en-us/dotnet/standard/simd)
- [System.Numerics.Vector&lt;T&gt;](https://learn.microsoft.com/en-us/dotnet/api/system.numerics.vector-1)
- [System.Runtime.Intrinsics.Vector256&lt;T&gt;](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.intrinsics.vector256-1)
- [System.Numerics.Tensors.TensorPrimitives](https://learn.microsoft.com/en-us/dotnet/api/system.numerics.tensors.tensorprimitives)
- [Avx.Add](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.intrinsics.x86.avx.add)
- [System.Numerics.Vector3](https://learn.microsoft.com/en-us/dotnet/api/system.numerics.vector3)
