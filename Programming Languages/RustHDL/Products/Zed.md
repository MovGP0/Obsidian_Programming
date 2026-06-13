# Zed

Zed can be used as the editor for the Rust side of the project. The FPGA flow remains command-line based.

## Setup Notes

- Use Rust language support for RustHDL/RHDL source.
- Use an external terminal for OSS CAD Suite commands.
- Keep build commands in scripts such as `build.ps1`, `program.ps1`, and `sim.ps1`.
- Treat generated Verilog and `.cst` files as project artifacts.

## Limitations

- FPGA-specific extension support is usually stronger in VS Code.
- Zed is still usable if the project build is script-driven.
