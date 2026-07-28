---
title: HAMMER2
---
**HAMMER2** is DragonFly BSD's characteristic modern copy-on-write file system. It provides checksummed structures, snapshots, and multiple independently managed pseudo-file systems within a volume.

## Best suited for

- DragonFly BSD root and data volumes
- Snapshot-oriented DragonFly installations
- Specialized development and research environments
- Systems administered with DragonFly-specific storage tooling

## Design

HAMMER2 uses copy-on-write updates and a tree-based on-disk structure. A mounted volume can expose multiple pseudo-file systems, allowing independently managed roots within the same storage. Snapshot and synchronization concepts are integrated into its administration model.

DragonFly installations may use a small UFS boot partition alongside a HAMMER2 root file system, depending on the installation and boot design.

## Advantages

- Copy-on-write-oriented architecture
- Checksummed on-disk structures
- Snapshot support
- Multiple independently managed pseudo-file systems
- Strong integration with DragonFly BSD

## Limitations

- Very small ecosystem compared with [[ZFS]], [[Fourth Extended File System|ext4]], or [[XFS]]
- Minimal cross-platform support
- Fewer recovery specialists and third-party tools
- Not a practical interchange format
- Some distributed-storage ambitions are more specialized than mainstream clustered file systems

## Choose HAMMER2 when

Use HAMMER2 inside a DragonFly BSD system when its native administration and snapshot model fit the deployment. It is rarely a reason by itself to choose DragonFly when broad ecosystem support is the main requirement.

## Official sources

- [DragonFly BSD manual: hammer2](https://man.dragonflybsd.org/?command=hammer2&section=8)
