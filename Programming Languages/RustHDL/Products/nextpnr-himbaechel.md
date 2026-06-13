# nextpnr-himbaechel

nextpnr-himbaechel performs place-and-route for Gowin targets.

## Role In The Flow

```text
Yosys JSON -> nextpnr-himbaechel -> placed/routed JSON
```

## Install

Recommended:

- Install through [[OSS CAD Suite]].

Alternative:

- Use [[YoWASP]] with `yowasp-nextpnr-himbaechel-gowin`.

## Verify

```powershell
nextpnr-himbaechel --version
```

## GW2A-18C Command

```powershell
nextpnr-himbaechel `
  --json top.json `
  --write top_pnr.json `
  --device GW2AR-LV18QN88C8/I7 `
  --vopt family=GW2A-18C `
  --vopt cst=board.cst
```

## Notes

- `--vopt cst=board.cst` is required for pin constraints.
- `--vopt family=GW2A-18C` is required for C-variant GW2A-18 devices.
- The routed JSON is consumed by [[Apicula and Apycula]] through `gowin_pack`.
