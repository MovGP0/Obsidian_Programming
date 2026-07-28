---
title: Resilient File System (ReFS)
---
**Resilient File System** (**ReFS**) is Microsoft's integrity- and scalability-oriented data file system for controlled Windows Server and storage workloads.

## Best suited for

- Windows Server storage
- Hyper-V VHDX storage
- Storage Spaces and Storage Spaces Direct
- Large archival or application-data volumes
- Workloads that benefit from block cloning

## Integrity model

ReFS checksums metadata and can optionally checksum file data through integrity streams. With a mirror or parity space that contains another valid copy, ReFS can repair detected corruption online. A scrubber periodically scans for latent corruption.

Checksumming and redundancy are separate requirements: an integrity stream can detect damage, but automatic repair still needs a valid alternate copy.

## Performance features

Block cloning allows multiple files or file ranges to share physical blocks until one copy changes. This can make virtual-machine checkpoint merges, duplicated VHDX operations, and similar large-file workflows much faster. Sparse valid data length also accelerates creation and extension of virtual disks.

## Advantages

- Metadata checksumming and optional user-data checksumming
- Online repair when redundant Storage Spaces copies are available
- Efficient block cloning
- Designed for very large data sets
- Strong integration with Microsoft virtualization and storage-server technologies

## Limitations

- Not a universal replacement for [[New Technology File System|NTFS]]
- Supported scenarios and features depend on the Windows edition and deployment
- Some applications and Windows features still assume NTFS semantics
- Integrity streams can increase fragmentation and I/O latency
- Stable supported ReFS deployments are data-volume scenarios; current Microsoft documentation marks ReFS as non-bootable
- Shrinking is not supported

## Choose ReFS when

Choose ReFS for a validated Windows Server, Hyper-V, or Storage Spaces design that benefits from integrity streams, repair, or block cloning. Use NTFS when maximum Windows compatibility or a normal boot volume is the priority.

## Official sources

- [Microsoft Learn: Resilient File System overview](https://learn.microsoft.com/en-us/windows-server/storage/refs/refs-overview)
- [Microsoft Learn: ReFS integrity streams](https://learn.microsoft.com/en-us/windows-server/storage/refs/integrity-streams)
