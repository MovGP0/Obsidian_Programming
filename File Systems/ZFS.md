---
title: ZFS
---
**ZFS** is a copy-on-write file system and storage-volume manager that organizes physical devices into storage pools and exposes configurable datasets and block volumes.

## Best suited for

- Network-attached storage systems
- Backup servers
- Long-term important storage
- Large multi-disk arrays
- Snapshot replication
- Storage requiring strong corruption detection
- FreeBSD root installations and boot environments

## Integrity model

ZFS checksums data and metadata and verifies blocks as they are read. A mirror or RAID-Z vdev can provide another valid copy from which damaged data can be repaired. Scrubs proactively read the pool to find latent errors.

Copy-on-write updates preserve the previous committed tree until a new transaction group is safely written. Snapshots and clones share existing blocks, and `zfs send` with `zfs receive` can replicate dataset snapshots.

## Advantages

- End-to-end checksumming
- Self-healing with suitable redundancy
- Efficient snapshots and clones
- Transparent compression
- Integrated pooling, mirrors, and RAID-Z
- Mature replication, administration, and observability
- Per-dataset properties for compression, quotas, record size, and other behavior

## Limitations

- More complex than a conventional file system
- Uses available memory aggressively for caching, although there is no fixed RAM-per-terabyte requirement
- Pool topology, failure domains, and expansion need planning
- Restructuring RAID-Z vdevs is more constrained than ordinary volume management
- Databases and virtual machines may need record-size, sync, and caching configuration
- On Linux, OpenZFS is distributed outside the mainline kernel tree

## Linux and FreeBSD

On Linux, ZFS is supplied through OpenZFS packages and is commonly used for data pools and NAS appliances rather than as the simplest root file system. FreeBSD integrates ZFS into its installer and base-system workflows, including root-on-ZFS and boot environments.

## Choose ZFS when

Choose ZFS for integrity-focused pooled storage when the team can plan topology, monitor pool health, and maintain independent backups. Consider [[Btrfs]] for Linux desktop rollback and [[Unix File System|UFS2]] for a smaller conventional FreeBSD installation.

## Official sources

- [OpenZFS documentation: basic concepts](https://openzfs.github.io/openzfs-docs/Basic%20Concepts/index.html)
- [FreeBSD Handbook: ZFS](https://docs.freebsd.org/en/books/handbook/zfs/)
