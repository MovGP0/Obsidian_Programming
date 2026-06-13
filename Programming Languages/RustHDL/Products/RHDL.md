# RHDL

RHDL is the successor project from the RustHDL author. It is worth evaluating for new projects before committing to RustHDL.

## Role In The Flow

```text
RHDL -> generated HDL/Verilog artifacts -> Yosys
```

## Install

Check the current repository instructions before installing:

- https://github.com/samitbasu/rhdl

Typical Rust crate workflow:

```powershell
cargo add rhdl
cargo check
```

## Notes

- Prefer RHDL for experimentation and future-facing Rust-based HDL work.
- Prefer RustHDL if you specifically need existing RustHDL examples or widgets.
- The rest of the Gowin build flow is unchanged once Verilog exists.
