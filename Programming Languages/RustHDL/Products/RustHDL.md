# RustHDL

RustHDL is a Rust crate for describing RTL hardware in Rust and generating Verilog for synthesis.

## Role In The Flow

```text
RustHDL -> generated Verilog -> Yosys
```

RustHDL does not directly program the FPGA. Treat its output Verilog as the handoff point to the standard FPGA flow.

## Install

Inside a Cargo project:

```powershell
cargo add rust-hdl
```

Verify dependency resolution:

```powershell
cargo check
```

## Notes

- RustHDL uses a synthesizable subset of Rust.
- RustHDL can simulate designs in Rust and emit VCD traces.
- For new long-lived projects, also evaluate [[RHDL]] because RustHDL upstream has moved active development in that direction.

## References

- Docs: https://docs.rs/rust-hdl/latest/rust_hdl/
- Repository: https://github.com/samitbasu/rust-hdl
