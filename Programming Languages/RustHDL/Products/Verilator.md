# Verilator

Verilator is a fast Verilog/SystemVerilog simulator and linting tool.

## Role In The Flow

Use it to lint generated Verilog and run high-performance simulations when a C++ harness is useful.

## Install

Recommended:

- Install through [[OSS CAD Suite]].

## Verify

```powershell
verilator --version
```

## Lint

```powershell
verilator --lint-only top.v
```

## Notes

- Verilator is stricter than many FPGA synthesis flows.
- Some RustHDL-generated constructs may require adjustment before Verilator accepts them.
