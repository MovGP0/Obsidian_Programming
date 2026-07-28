---
title: XFS
---
**XFS** is a high-performance, extent-based, journaled file system designed for scalability, parallel access, and large files and volumes.

## Best suited for

- Large Linux servers
- Media, scientific, and analytics data
- Large files and sequential workloads
- Highly concurrent file access
- Enterprise data volumes
- Container or virtual-machine image storage when configured for the workload

## Design

XFS divides a volume into allocation groups that can allocate space and update metadata in parallel. It journals metadata and uses extents for efficient large-file allocation. Modern XFS also supports reflinks, allowing files to share blocks until one copy changes.

## Advantages

- Excellent parallel and large-file performance
- Scales to large volumes and high directory counts
- Online growth
- Strong user, group, and project quotas
- Reflink and copy-on-write file-copy support
- Mature enterprise administration and repair tools

## Limitations

- Shrinking is not an established normal administrative operation
- Small volumes or small-file workloads may not benefit from its architecture
- Does not normally checksum user-file contents
- No native subvolume snapshot system comparable to [[Btrfs]] or [[ZFS]]
- Severe corruption repair can require substantial memory and downtime

## Choose XFS when

Choose XFS for large, busy Linux data volumes with substantial parallelism or large-file throughput. Prefer [[Fourth Extended File System|ext4]] for simpler installations and Btrfs or ZFS when native snapshots and data checksums are primary requirements.

## Official sources

- [Linux kernel documentation: XFS](https://docs.kernel.org/admin-guide/xfs.html)
- [Linux kernel documentation: XFS online file-system repair design](https://docs.kernel.org/filesystems/xfs/xfs-online-fsck-design.html)
