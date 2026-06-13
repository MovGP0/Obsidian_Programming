# Icarus Verilog

Icarus Verilog is a lightweight Verilog simulator.

## Role In The Flow

Use it to simulate generated Verilog before synthesis or hardware programming.

## Install

Recommended:

- Install through [[OSS CAD Suite]].

## Verify

```powershell
iverilog -V
vvp -V
```

## Example

```powershell
iverilog -o sim.vvp testbench.v top.v
vvp sim.vvp
```

Open generated waveforms with [[GTKWave]].
