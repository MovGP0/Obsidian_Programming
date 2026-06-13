# Apicula and Apycula

Apicula documents and implements open-source tooling for Gowin bitstreams.
Apycula is the Python package that provides command-line tools such as `gowin_pack`.

## Role In The Flow

```text
nextpnr routed JSON -> gowin_pack -> .fs bitstream
```

## Install

Recommended:

- Install through [[OSS CAD Suite]].

Python package alternative:

```powershell
python -m pip install apycula
```

## Verify

```powershell
gowin_pack --help
gowin_unpack --help
```

## GW2A-18C Command

```powershell
gowin_pack -d GW2A-18C -o top.fs top_pnr.json
```

## Notes

- Use `GW2A-18C` for Tang Nano 20K-class C-variant devices.
- Use `GW2A-18` for non-C Tang Primer 20K-class devices.
- The generated `.fs` file is consumed by [[openFPGALoader]].

## References

- https://github.com/YosysHQ/apicula
