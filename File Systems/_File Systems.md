---
title: File Systems
---
**File systems** define how files, directories, metadata, permissions, free space, and recovery information are represented on storage. The best choice depends on the operating system, workload, integrity requirements, and need for portability.

## Architectural families

- **Journaled file systems** record pending operations so metadata consistency can be restored quickly after a crash. Examples include [[New Technology File System|NTFS]], [[Fourth Extended File System|ext4]], [[XFS]], and the [[Unix File System|UFS/FFS family]].
- **Copy-on-write file systems** write changed blocks to new locations rather than overwriting the current blocks. [[Btrfs]] and [[ZFS]] use this design to provide efficient snapshots, checksums, and cloning.
- **Portable file systems** prioritize broad implementation support over permissions, journaling, and self-healing. [[Extensible File Allocation Table|exFAT]] and [[File Allocation Table 32|FAT32]] are the main examples.
- **Read-only image file systems** package immutable, often compressed content. [[SquashFS]] and [[Enhanced Read-Only File System|EROFS]] are common Linux choices, while [[ISO 9660]] is associated with optical media.
- **Layered and network file systems** expose data stored elsewhere. [[OverlayFS]] combines directory layers, while [[Network File System|NFS]] and [[Server Message Block|SMB]] expose remote shares.

## At a glance

| Requirement | Usually the best choice |
| --- | --- |
| Windows system or general internal drive | [[New Technology File System\|NTFS]] |
| Windows Server, Hyper-V, or Storage Spaces data volume | [[Resilient File System\|ReFS]] |
| Linux general-purpose installation | [[Fourth Extended File System\|ext4]] |
| Linux high-throughput server or large-file workload | [[XFS]] |
| Linux snapshots, rollback, and transparent compression | [[Btrfs]] |
| Integrity-focused NAS or storage server | [[ZFS]] |
| FreeBSD installation with low administrative complexity | [[Unix File System\|UFS2]] |
| Removable drive shared by Windows, Linux, and macOS | [[Extensible File Allocation Table\|exFAT]] |
| Firmware and legacy-device compatibility | [[File Allocation Table 32\|FAT32]] |
| Flash-oriented Linux or Android storage | [[Flash-Friendly File System\|F2FS]] |
| Compressed read-only Linux system image | [[SquashFS]] or [[Enhanced Read-Only File System\|EROFS]] |

## Windows file systems

| File system | Best fit | Main tradeoff |
| --- | --- | --- |
| [[New Technology File System\|NTFS]] | Windows boot, application, user-data, and file-server volumes | No general end-to-end user-data checksumming |
| [[Resilient File System\|ReFS]] | Windows Server storage, Hyper-V, and Storage Spaces | Narrower application and deployment compatibility than NTFS |
| [[Extensible File Allocation Table\|exFAT]] | Large removable media shared across operating systems | No journal, ACLs, snapshots, or self-healing |
| [[File Allocation Table 32\|FAT32]] | Firmware, UEFI, and legacy equipment | Approximately 4 GiB maximum individual file size |
| [[Universal Disk Format\|UDF]] | Optical and packet-written media | Not a normal system or application-data file system |
| [[ISO 9660]] | Highly compatible read-only optical images | Limited writable and modern metadata semantics |

## Linux file systems

| File system | Best fit | Main tradeoff |
| --- | --- | --- |
| [[Fourth Extended File System\|ext4]] | Predictable general-purpose desktop and server storage | No native snapshots, compression, or user-data checksums |
| [[XFS]] | Large, busy, parallel data volumes | Online growth but no established normal shrink operation |
| [[Btrfs]] | Snapshot-oriented desktops and compressed storage | Requires active snapshot and free-space management |
| [[ZFS]] | Integrity-focused pools, NAS systems, and replication | More planning and administration than a conventional file system |
| [[Flash-Friendly File System\|F2FS]] | NAND-flash and embedded systems | Smaller tooling and deployment ecosystem than ext4 |
| [[Temporary File System\|tmpfs]] | Volatile temporary data held in virtual memory | Contents disappear when unmounted or rebooted |
| [[SquashFS]] | Dense read-only firmware and live-system images | Image contents cannot be modified in place |
| [[Enhanced Read-Only File System\|EROFS]] | High-performance immutable images | Read-only by design and less universally deployed than SquashFS |
| [[OverlayFS]] | Container and immutable-system writable layers | Correctness depends on compatible lower and upper file systems |

## BSD file systems

- [[Unix File System|UFS2 and FFS2]] are mature conventional choices for small or straightforward BSD installations.
- [[ZFS]] is deeply integrated with FreeBSD and is a strong choice for pooled storage, boot environments, snapshots, and integrity.
- [[HAMMER2]] is DragonFly BSD's characteristic copy-on-write file system.

## Network-mounted storage

- [[Network File System|NFS]] is the conventional Unix and Linux network file system.
- [[Server Message Block|SMB]] is the standard Windows-compatible file-sharing protocol; CIFS is an older SMB dialect and name.

These systems expose remote storage through a file-system interface. Their durability, checksumming, and snapshot behavior are ultimately determined by both the protocol implementation and the server-side storage.

## Practical recommendations

### Desktop computers

- **Windows:** [[New Technology File System|NTFS]]
- **Linux without special requirements:** [[Fourth Extended File System|ext4]]
- **Linux with snapshot-based rollback:** [[Btrfs]]
- **FreeBSD with sufficient resources:** [[ZFS]]
- **Small FreeBSD installation:** [[Unix File System|UFS2]]

### Servers

- **General Linux application server:** [[Fourth Extended File System|ext4]]
- **Large high-throughput Linux data server:** [[XFS]]
- **Snapshot-heavy Linux server:** [[Btrfs]]
- **Integrity-focused NAS:** [[ZFS]]
- **Windows application or file server:** [[New Technology File System|NTFS]]
- **Windows Hyper-V or Storage Spaces server:** [[Resilient File System|ReFS]]

### External drives

- **Windows only:** [[New Technology File System|NTFS]]
- **Windows, Linux, and macOS:** [[Extensible File Allocation Table|exFAT]]
- **Firmware or old-device compatibility:** [[File Allocation Table 32|FAT32]]
- **Linux backup drive with snapshots:** [[Btrfs]]
- **ZFS replication destination:** [[ZFS]]

## Integrity is not backup

These mechanisms address different failure modes:

- **Snapshots** mainly protect against accidental modification and deletion.
- **Mirrors and RAID** mainly protect against device failure.
- **Checksums** detect corruption and may enable repair when another valid copy exists.
- **Backups** protect against loss of the machine, malware, administrator error, theft, and catastrophic pool damage.

A checksum-capable file system is therefore not a backup. Valuable data normally needs a combination of integrity checking, redundancy, snapshots, and independent backups.

## Official sources

- [Microsoft Windows Server storage documentation](https://learn.microsoft.com/en-us/windows-server/storage/)
- [Linux kernel file-system documentation](https://docs.kernel.org/filesystems/index.html)
- [OpenZFS documentation](https://openzfs.github.io/openzfs-docs/)
- [FreeBSD Handbook](https://docs.freebsd.org/en/books/handbook/)
