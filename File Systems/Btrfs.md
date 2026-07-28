---
title: Btrfs
---
**Btrfs** is a Linux copy-on-write file system that combines file storage with snapshot, subvolume, checksum, compression, and multi-device management features.

## Best suited for

- Linux desktops with snapshot-based rollback
- Systems managed with Snapper or similar tools
- Compressed general-purpose storage
- Development machines and container hosts
- Small and medium multi-disk systems using well-understood profiles

## Integrity and snapshots

Btrfs checksums file data and metadata. A scrub verifies stored blocks and can repair damage when another valid copy exists in a redundant profile. Subvolumes provide separately managed directory trees, while snapshots share unchanged extents and are therefore fast and space-efficient.

Snapshots are not independent backups because they normally remain in the same file-system failure domain. Btrfs send and receive can replicate snapshots elsewhere.

## Advantages

- Fast read-only or writable snapshots
- Transparent compression
- Data and metadata checksums
- Online scrub
- Subvolumes and reflink copies
- Integrated multi-device profiles
- Online growth and shrinking
- Incremental snapshot replication

## Limitations

- More operational complexity than [[Fourth Extended File System|ext4]]
- Copy-on-write can fragment databases, virtual-machine images, and other rewrite-heavy files
- Snapshot retention and free-space exhaustion require active management
- Quota groups can add overhead and administrative complexity
- Parity RAID profiles require more caution than mirrored profiles
- Recovery procedures are less intuitive than conventional ext4 recovery

## Choose Btrfs when

Use Btrfs when Linux snapshots, rollback, compression, and checksumming justify active storage management. Use ext4 when simplicity is the primary goal, or [[ZFS]] for an integrity-focused storage pool with a mature dataset and replication model.

## Official sources

- [Btrfs documentation: introduction](https://btrfs.readthedocs.io/en/latest/Introduction.html)
- [Btrfs documentation: status](https://btrfs.readthedocs.io/en/latest/Status.html)
