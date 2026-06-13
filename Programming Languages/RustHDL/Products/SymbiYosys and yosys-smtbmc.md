# SymbiYosys and yosys-smtbmc

SymbiYosys (`sby`) and `yosys-smtbmc` are formal verification tools built around Yosys.

## Role In The Flow

Use formal checks for:

- Reset behavior.
- FIFO correctness.
- Bus handshakes.
- State-machine invariants.
- Counter bounds and liveness checks.

## Install

Recommended:

- Install through [[OSS CAD Suite]].

YoWASP alternative:

- Install [[YoWASP]] packages that provide `yowasp-sby` and `yowasp-yosys-smtbmc`.

## Verify

```powershell
sby --version
yosys-smtbmc --help
```

## Run

```powershell
sby -f proof.sby
```

## Notes

- Start with small modules and simple invariants.
- Formal checks are most valuable once the design has state, FIFOs, bus protocols, or reset sequencing.
