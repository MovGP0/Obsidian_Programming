---
title: CPU benchmarks
---
Consider these CPU performance factors:

- Registers and the stack
- JIT inlining
- Instruction-level parallelism
- Branch prediction
- Arithmetic operations, such as `float` compared to `double`
- Intrinsics that let the JIT create CPU-specific code

## JIT Inlining

Advantages:

- Eliminates call overhead
- Enables further optimization techniques
- Sometimes makes register allocation better

Disadvantages:

- Increased file size
- Might inline the wrong method 
  - For example, the JIT can inline `A(B(C()))` as `A(BC())` when `AB(C())` would be more efficient.
- Sometimes makes register allocation worse

## SIMD and hardware intrinsics

The JIT uses some processor intrinsics without explicit source code. For manual vectorization, start with the cross-platform fixed-width APIs. Use processor-specific intrinsics only when an operation is not available or a benchmark shows a benefit.

See [[SIMD|Single instruction, multiple data in .NET (SIMD)]] for API selection, `double` support, data layout, fallbacks, tests, and examples.
