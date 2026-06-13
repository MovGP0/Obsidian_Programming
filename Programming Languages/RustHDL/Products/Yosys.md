# Yosys

Yosys performs RTL synthesis. For Gowin targets, use `synth_gowin`.

## Role In The Flow

```text
Verilog -> Yosys synth_gowin -> JSON netlist
```

## Install

Recommended:

- Install through [[OSS CAD Suite]].

Alternative:

- Use [[YoWASP]] with `yowasp-yosys`.

## Verify

```powershell
yosys -V
```

## GW2A Command

```powershell
yosys -p "read_verilog top.v; synth_gowin -json top.json -family gw2a"
```

## Notes

- Use generated Verilog from RustHDL/RHDL as input.
- If the generated Verilog uses unsupported SystemVerilog features, simplify generation or add preprocessing.
- The `top.json` output is consumed by [[nextpnr-himbaechel]].
