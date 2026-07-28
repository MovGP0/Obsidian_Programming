---
title: Extensible File Allocation Table (exFAT)
---
**Extensible File Allocation Table** (**exFAT**) is a portable file system designed as the successor to [[File Allocation Table 32|FAT32]] for large removable media.

## Best suited for

- USB flash drives
- SDXC cards
- External solid-state drives shared by Windows, Linux, and macOS
- Cameras, recorders, and consumer devices
- Moving files larger than 4 GiB between systems

## Design

exFAT retains the relative simplicity of the FAT family while using 64-bit file sizes and supporting large allocation units and storage devices. Its intentionally small feature set helps independent operating systems and embedded devices implement it.

That portability comes from omitting many features expected from an internal desktop or server file system. A normal exFAT volume has no metadata journal, ownership model, access-control lists, snapshots, compression, or self-healing.

## Advantages

- Broad operating-system and device compatibility
- Supports files larger than FAT32's approximately 4 GiB limit
- Low implementation complexity and overhead
- Well suited to removable flash media

## Limitations

- Unsafe removal or power loss can leave the file system inconsistent
- No normal per-user permissions or ownership
- No native snapshots, compression, or integrity repair
- Not intended for operating-system or continuously mounted server volumes
- Cross-device compatibility still depends on the receiving device's implementation

## Choose exFAT when

Use exFAT for interchange media that must carry large files across current operating systems. Use [[New Technology File System|NTFS]] for a Windows-only internal drive, or FAT32 only when firmware or older devices do not support exFAT.

## Official sources

- [Microsoft Learn: exFAT file-system specification](https://learn.microsoft.com/en-us/windows/win32/fileio/exfat-specification)
