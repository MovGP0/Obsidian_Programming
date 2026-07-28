---
title: File Allocation Table 32 (FAT32)
---
**File Allocation Table 32** (**FAT32**) is a simple, widely implemented member of the FAT file-system family. It remains relevant because firmware, embedded systems, and older consumer devices can often read it.

## Best suited for

- UEFI system partitions
- Firmware-update media
- Small USB drives
- Legacy cameras, game consoles, and embedded devices

## Design

FAT32 uses 32-bit cluster indices, of which 28 bits are available for identifying data clusters. Files and directories refer to chains of clusters through a central allocation table. The format is straightforward to implement, which explains its unusually broad compatibility.

Its most visible restriction is the maximum individual file size of one byte less than 4 GiB. FAT32 also lacks the journal, ownership, access-control, integrity, and snapshot facilities expected from a modern system file system.

## Advantages

- Exceptional compatibility across operating systems, firmware, and devices
- Simple on-disk structures
- Easy to implement in constrained firmware
- Low overhead on small media

## Limitations

- Approximately 4 GiB maximum individual file size
- No journal
- No file ownership or access-control lists
- Vulnerable to corruption after unsafe removal or power loss
- Poor scalability and inefficient allocation on large volumes

## Choose FAT32 when

Use FAT32 only when a boot environment, firmware updater, or legacy device requires it. Prefer [[Extensible File Allocation Table|exFAT]] for portable media that must hold large files and [[New Technology File System|NTFS]] for Windows internal storage.

## Official sources

- [Microsoft Learn: exFAT specification and FAT-family terminology](https://learn.microsoft.com/en-us/windows/win32/fileio/exfat-specification)
- [UEFI Forum specifications](https://uefi.org/specifications)
