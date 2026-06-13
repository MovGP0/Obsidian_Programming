# GTKWave

GTKWave is a waveform viewer for VCD and related trace files.

## Role In The Flow

Use it to inspect simulation traces from RustHDL, Icarus Verilog, Verilator, or other simulators.

## Install

Recommended:

- Install through [[OSS CAD Suite]].

## Verify

```powershell
gtkwave --version
```

## Open A Trace

```powershell
gtkwave dump.vcd
```

## Notes

- Avoid committing large `.vcd` files unless they are intentionally small examples.
- Save useful GTKWave layouts as `.gtkw` files when debugging recurring signals.
