# YoWASP

YoWASP provides WebAssembly-packaged FPGA tools. It is useful for reproducible Python-based tool environments.

## Provides

- `yowasp-yosys`
- `yowasp-sby`
- `yowasp-yosys-smtbmc`
- `yowasp-nextpnr-himbaechel-gowin`
- Compatible Apicula tools through package dependencies.

## Install

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install yowasp-yosys yowasp-nextpnr-himbaechel-gowin yowasp-boolector
```

## Verify

```powershell
yowasp-yosys --version
yowasp-nextpnr-himbaechel-gowin --version
yowasp-yosys-smtbmc --version
```

## Notes

- YoWASP does not replace native USB/JTAG programming.
- Use [[openFPGALoader]] from [[OSS CAD Suite]] or another native install to program the FPGA.
- Native OSS CAD Suite is usually simpler for local Windows hardware bring-up.

## References

- https://yowasp.org/
