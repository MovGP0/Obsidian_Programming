---
title: .NET performance
---
- **Monitoring**: identify slow user scenarios
- **Profiling**: identify hot methods
- **Benchmark**: help to find the best implementation

## Monitoring Options

- [[StopWatch]]
- *OLD* Performance Counters (`System.Diagnostics.PerformanceCounter`)
- *OLD* Event Counters (`System.Diagnostics.Tracing`)
- *NEW* Metrics API (`System.Diagnostics.Metrics`)
- YARP (`Yarp.Telemetry.Consumption`)
- OpenTelemetry (`OpenTelemetry.Metrics`)
- 3rd Party 
  - AppDynamics
  - Application Insights
  - DynaTrace
  - DataDog
  - NewRelic

## What to measure

- Wall-Clock time
  - measure execution time using `Stopwatch`
- Throughput
- Asymptotic Complexity
  - How much increases the execution time with more data?
- Hardware Counters
- I/O Metrics
- GC.CollectionCount

## Profiling Options

- dotnet CLI
- Visual Studio
- JetBrains Tools

## Benchmark Options

- [BenchmarkDotNet](https://benchmarkdotnet.org/)

## Diagnostic Tools

- Benchmark Harness
  - Unit Tests
  - [[BenchmarkDotNet]]
- Performance Profiler
- Memory Profiler
- C#/F# Decompiler
- IL Decompiler
- ASM Decompiler
- Debugger
- System monitoring tool
  - Sysinternals Suite (RAMMap, VMMap, Process Monitor)

## References

- [Networking Telemetry in .NET](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/networking-telemetry)
- [Collect metrics](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/metrics-collection)

## See also

- [[CPU Benchmarks]]
- [[SIMD|Single instruction, multiple data in .NET (SIMD)]]
- [[Performance Testing Pitfalls]]
- [[Performance Statistics]]
