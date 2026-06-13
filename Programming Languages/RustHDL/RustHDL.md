# RustHDL / RHDL Gowin GW2A-18C Toolchain Overview

This overview describes an open-source development environment for a Gowin `GW2A-18C` FPGA without using the Gowin IDE. The goal is to write hardware in Rust, generate Verilog, build a Gowin bitstream with open tools, and program the FPGA.

## Target Flow

```text
RustHDL or RHDL
  -> generated Verilog
  -> Yosys synth_gowin
  -> nextpnr-himbaechel Gowin
  -> gowin_pack from Apicula/Apycula
  -> openFPGALoader
  -> FPGA SRAM or external flash
```

## Recommended Baseline

Use **OSS CAD Suite** as the default native toolchain package on Windows. It bundles most of the needed FPGA tools and avoids building Yosys, nextpnr, Apicula, simulators, and formal tools from source.

Install Rust separately with `rustup`. VS Code and Zed can both be used as editors; neither replaces the FPGA command-line flow.

## Articles

- [[Products/OSS CAD Suite|OSS CAD Suite]]
- [[Products/Rust Toolchain|Rust Toolchain]]
- [[Products/RustHDL|RustHDL]]
- [[Products/RHDL|RHDL]]
- [[Products/Yosys|Yosys]]
- [[Products/nextpnr-himbaechel|nextpnr-himbaechel]]
- [[Products/Apicula and Apycula|Apicula and Apycula]]
- [[Products/openFPGALoader|openFPGALoader]]
- [[Products/Zadig|Zadig]]
- [[Products/YoWASP|YoWASP]]
- [[Products/Icarus Verilog|Icarus Verilog]]
- [[Products/Verilator|Verilator]]
- [[Products/GTKWave|GTKWave]]
- [[Products/SymbiYosys and yosys-smtbmc|SymbiYosys and yosys-smtbmc]]
- [[Products/VS Code|VS Code]]
- [[Products/Zed|Zed]]

## GW2A-18C Device Notes

The exact device and family depend on the board and chip marking.

| Board | Device | Family |
| --- | --- | --- |
| Tang Nano 20K | `GW2AR-LV18QN88C8/I7` | `GW2A-18C` |
| Tang Primer 20K | `GW2A-LV18PG256C8/I7` | `GW2A-18` |

For a `GW2A-18C` target, the command flow is:

```powershell
yosys -p "read_verilog top.v; synth_gowin -json top.json -family gw2a"

nextpnr-himbaechel `
  --json top.json `
  --write top_pnr.json `
  --device GW2AR-LV18QN88C8/I7 `
  --vopt family=GW2A-18C `
  --vopt cst=board.cst

gowin_pack -d GW2A-18C -o top.fs top_pnr.json

openFPGALoader -b tangnano20k top.fs
```

Program external flash instead of SRAM:

```powershell
openFPGALoader -b tangnano20k -f top.fs
```

Always verify the exact board name and JTAG visibility:

```powershell
openFPGALoader --list-boards
openFPGALoader --detect
openFPGALoader -b tangprimer20k --detect
```

On Windows, the Tang Primer 20K USB-JTAG connector appears as an FTDI FT2232 device:

```text
VID:PID = 0403:6010
Interface A / MI_00 = JTAG
Interface B / MI_01 = usually UART / COM port
```

Use [[Products/Zadig|Zadig]] to replace only Interface A / `MI_00` with WinUSB. Leave Interface B / `MI_01` on the FTDI driver.

## Constraints File

The `.cst` file is mandatory. Every top-level hardware port that reaches an FPGA pin must be assigned.

Minimal shape:

```text
IO_LOC "clk" 4;
IO_PORT "clk" IO_TYPE=LVCMOS33;

IO_LOC "led[0]" 10;
IO_PORT "led[0]" IO_TYPE=LVCMOS33;
```

Use the board schematic, vendor examples, or Sipeed examples as the source of truth for pin numbers and voltage banks.

Common failure modes:

- Port exists in Verilog but not in `.cst`.
- Wrong package/device selected.
- `GW2A-18` vs `GW2A-18C` family mismatch.
- IO voltage in `.cst` conflicts with board wiring.

## Suggested Project Layout

```text
gw2a-rusthdl-project/
  Cargo.toml
  src/
    main.rs
  rtl/
    generated/
      top.v
  constraints/
    board.cst
  build/
    top.json
    top_pnr.json
    top.fs
  scripts/
    build.ps1
    program.ps1
    sim.ps1
```

Commit Rust source, constraints, build scripts, and documentation. Do not commit toolchain folders, generated bitstreams, or large waveform dumps unless there is a specific reason.

## Bring-Up Order

1. Install OSS CAD Suite.
2. Install Rust with `rustup`.
3. Confirm `yosys`, `nextpnr-himbaechel`, `gowin_pack`, and `openFPGALoader` are available.
4. Build and program a plain Verilog blinky first.
5. Confirm the `.cst`, board name, USB driver, and device family are correct.
6. Generate Verilog from RustHDL or RHDL.
7. Run Verilog lint and simulation.
8. Build the generated Verilog through the Gowin open-source flow.
9. Add formal checks once the design has state machines, FIFOs, or bus interfaces.

## References

- Project Apicula: https://github.com/YosysHQ/apicula
- Apicula Gowin nextpnr-himbaechel guide: https://github.com/YosysHQ/apicula/wiki/Nextpnr%E2%80%90Himbaechel-Gowin
- OSS CAD Suite: https://github.com/YosysHQ/oss-cad-suite-build
- YoWASP: https://yowasp.org/
- openFPGALoader: https://github.com/trabucayre/openFPGALoader
- RustHDL docs: https://docs.rs/rust-hdl/latest/rust_hdl/
- RustHDL repository: https://github.com/samitbasu/rust-hdl
- RHDL repository: https://github.com/samitbasu/rhdl
- Gowin GW2A datasheet: https://cdn.gowinsemi.com.cn/DS102E.pdf
