---
title: Fourth Extended File System (ext4)
---
**Fourth Extended File System** (**ext4**) is a mature, extent-based, journaled Linux file system and a conservative general-purpose choice for desktops, servers, and virtual machines.

## Best suited for

- Linux desktop and server root volumes
- Virtual machines
- General application storage
- Systems where operational simplicity and broad recovery support matter

## Design

ext4 uses extents to represent contiguous ranges of blocks efficiently. Its journal records metadata updates and can use different data journaling modes to balance consistency and performance. Delayed allocation and multiblock allocation help create larger contiguous extents.

Unlike [[Btrfs]] and [[ZFS]], ext4 is a conventional file system rather than an integrated snapshot and volume-management platform.

## Advantages

- Mature and extensively tested
- Excellent bootloader, installer, and recovery-tool support
- Predictable performance across varied workloads
- Straightforward administration and repair
- Online growth and offline shrinking
- Lower operational complexity than feature-rich copy-on-write systems

## Limitations

- No native general-purpose snapshots
- No transparent compression
- No ordinary user-data checksumming
- No integrated multi-device storage management
- Fewer storage-management features than Btrfs or ZFS

## Choose ext4 when

Use ext4 as the default Linux choice when snapshots, transparent compression, pooled storage, or end-to-end checksumming are not requirements. Choose [[XFS]] for a large, highly parallel data volume and Btrfs when snapshot-based rollback is central to the design.

## Official sources

- [Linux kernel documentation: ext4 data structures and algorithms](https://docs.kernel.org/filesystems/ext4/index.html)
