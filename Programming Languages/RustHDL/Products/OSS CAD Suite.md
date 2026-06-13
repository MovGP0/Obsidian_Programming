# OSS CAD Suite

OSS CAD Suite is the recommended native toolchain package for this setup. It bundles synthesis, place-and-route, bitstream, programming, simulation, and formal verification tools.

## Provides

- `yosys`
- `nextpnr-himbaechel`
- `gowin_pack` / `gowin_unpack`
- `openFPGALoader`
- `sby`
- `yosys-smtbmc`
- SMT solvers such as `z3`, `boolector`, `bitwuzla`
- `iverilog`
- `verilator`
- `gtkwave`

## Install

Download:

- https://github.com/YosysHQ/oss-cad-suite-build/releases

Windows steps:

1. Download the latest `windows-x64` release archive or self-extracting package.
2. Extract it to a stable programs/tools directory without spaces:

```powershell
$Programs = $env:ProgramFiles
$OssCadSuite = Join-Path $Programs "oss-cad-suite"
```

3. Activate it in a PowerShell session:

```powershell
& "$OssCadSuite\environment.ps1"
```

4. Verify:

```powershell
yosys -V
nextpnr-himbaechel --version
gowin_pack --help
openFPGALoader --version
sby --version
iverilog -V
verilator --version
gtkwave --version
```

## Notes

- Keep the toolchain folder out of paths containing spaces.
- On Windows, prefer `$env:ProgramFiles\oss-cad-suite` over extracting directly into the root of `C:\`.
- Pin a known-good dated release per project once the flow works.
- Nightly builds can regress. If Gowin packing or place-and-route breaks, try another dated OSS CAD Suite release.
