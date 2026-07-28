---
title: New Technology File System (NTFS)
---
**New Technology File System** (**NTFS**) is the default general-purpose file system for modern Windows. It combines metadata journaling with Windows security, storage, and application compatibility.

## Best suited for

- Windows boot and system volumes
- Application and user-data volumes
- Windows file servers
- Drives that require Windows access-control lists, quotas, encryption, or compression
- General internal hard-disk and solid-state storage

## How it works

NTFS stores file records and metadata in the Master File Table. Its transaction log records metadata operations so the file system can replay or roll back incomplete work after a crash. Journaling greatly shortens consistency recovery, but it is not equivalent to a backup and does not provide general end-to-end checksums for every user-data block.

Windows services add capabilities around NTFS. BitLocker can encrypt the volume, the Encrypting File System can encrypt selected files, and Volume Shadow Copy Service can create point-in-time copies. These are integrations rather than native copy-on-write snapshots inside NTFS.

## Advantages

- Best compatibility with Windows applications and administration tools
- Fine-grained access-control lists and security descriptors
- Mature repair, backup, antivirus, and disk-management support
- Metadata journaling and background self-healing for some corruption
- Compression, sparse files, quotas, hard links, symbolic links, and alternate data streams
- Support for large files and volumes

## Limitations

- Does not normally checksum every user-data block end to end
- Cannot automatically reconstruct silent file-data corruption merely because a lower storage layer is redundant
- NTFS-specific metadata may not be preserved perfectly by non-Windows implementations
- Native snapshots and integrated storage pooling are outside the file system
- May be less suitable than [[XFS]] or [[ZFS]] for some highly parallel, very large storage workloads

## Choose NTFS when

Use NTFS unless a Windows workload has a specific reason to use [[Resilient File System|ReFS]] or removable-media compatibility requires [[Extensible File Allocation Table|exFAT]] or [[File Allocation Table 32|FAT32]].

## Official sources

- [Microsoft Learn: NTFS overview](https://learn.microsoft.com/en-us/windows-server/storage/file-server/ntfs-overview)
