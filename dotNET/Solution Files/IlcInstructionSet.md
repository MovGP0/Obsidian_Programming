| Level         | Required features                                                                    | Practical meaning in .NET                                                                                                                                                                                                                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **x86-64-v1** | Baseline x86-64: `CMOV`, `CX8`, `FPU`, `FXSR`, `MMX`, `SSE`, `SSE2`, syscall support | Oldest AMD64/Intel64 baseline. Good compatibility, weakest optimizer assumptions. SSE2 is already mandatory for x64.                                                                                                                                                                                                                                           |
| **x86-64-v2** | v1 + `CMPXCHG16B`, `LAHF/SAHF`, `POPCNT`, `SSE3`, `SSSE3`, `SSE4.1`, `SSE4.2`        | Good modern baseline. Enables better scalar/SIMD codegen, faster popcount, CRC/string/vector helper paths, and 128-bit atomic compare-exchange support. This is the new .NET 11 x86/x64 minimum. ([Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-11/runtime "What's new in .NET 11 runtime \| Microsoft Learn"))             |
| **x86-64-v3** | v2 + `AVX`, `AVX2`, `BMI1`, `BMI2`, `F16C`, `FMA`, `LZCNT`, `MOVBE`                  | Major jump. Enables 256-bit vectorization with AVX2, fused multiply-add, faster bit manipulation, and wider `Vector<T>` in Native AOT when AVX2 is targeted. .NET 11 ReadyToRun targets v3 on Windows/Linux. ([Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-11/runtime "What's new in .NET 11 runtime \| Microsoft Learn")) |
| **x86-64-v4** | v3 + `AVX512F`, `AVX512BW`, `AVX512CD`, `AVX512DQ`, `AVX512VL`                       | AVX-512 baseline. Potentially much faster for dense numeric/vector workloads, but much less portable and may downclock on some CPUs. Use only for tightly controlled deployment targets.                                                                                                                                                                       |

| Feature group                       | Description                                                                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `SSE3`, `SSSE3`, `SSE4.1`, `SSE4.2` | 128-bit SIMD improvements; useful for numeric code, memory/string operations, packed integer operations, comparisons, blends, etc. |
| `POPCNT`                            | Hardware population count. Useful for bitsets, masks, Bloom filters, compression, chess engines, similarity metrics.               |
| `CMPXCHG16B` / `CX16`               | 16-byte atomic compare-exchange. Important for some lock-free algorithms and modern OS expectations.                               |
| `LAHF/SAHF`                         | Load/store flags instructions. Mostly compatibility/runtime-codegen utility.                                                       |
| `AVX` / `AVX2`                      | 256-bit SIMD. Big performance lever for loops over arrays, numerics, image/audio/data processing, ML-ish workloads.                |
| `FMA`                               | Fused multiply-add: `a * b + c` in one rounded operation. Faster and sometimes numerically different.                              |
| `BMI1` / `BMI2`, `LZCNT`            | Bit manipulation instructions. Useful for hashing, parsing, codecs, crypto-adjacent code, data structures.                         |
| `F16C`                              | Half-precision float conversion instructions. Useful when handling `Half`/FP16 data.                                               |
| `AVX-512`                           | 512-bit SIMD plus masks and richer vector operations. Powerful but not universally available.                                      |

### Native AOT

Instruction set requirements can also be set for AOT compilation:
```xml
<PropertyGroup>  
    <PublishAot>true</PublishAot>  
    <RuntimeIdentifier>win-x64</RuntimeIdentifier>  
    <IlcInstructionSet>avx,avx2,bmi,bmi2,f16c,fma,lzcnt,movbe,popcnt,sse3,ssse3,sse41,sse42</IlcInstructionSet>  
</PropertyGroup>
```

The resulting binary will require those CPU features. Microsoft documents that `IlcInstructionSet` lets Native AOT target newer instruction sets, and the binary then requires them at runtime.

### ReadyToRun

```xml
<PropertyGroup>
    <!-- targets x86-64-v3 in .NET 11+ -->
    <PublishReadyToRun>true</PublishReadyToRun>  
    <RuntimeIdentifier>win-x64</RuntimeIdentifier>  
</PropertyGroup>
```

### .NET Framework

The JIT specializes at runtime dependent on the capability of the CPU.
```xml
<PropertyGroup>  
    <TargetFramework>net8.0</TargetFramework>
    <PlatformTarget>x64</PlatformTarget>  
</PropertyGroup>
```

## MacOS

The RID `osx-arm64` is used to target Apple-Silicon.

### .NET Framework

```xml
<PropertyGroup>
  <RuntimeIdentifier>osx-arm64</RuntimeIdentifier>
</PropertyGroup>
```

or

```sh
dotnet publish -c Release -r osx-arm64
```

### Native AOT

```xml
<PropertyGroup>
  <PublishAot>true</PublishAot>
  <RuntimeIdentifier>osx-arm64</RuntimeIdentifier>
  <IlcInstructionSet>base,advsimd,aes,sha1,sha256,crc</IlcInstructionSet>
</PropertyGroup>
```
