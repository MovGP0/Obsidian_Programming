---
title: Universal Disk Format (UDF)
---
**Universal Disk Format** (**UDF**) is an optical-media and storage-image file system standardized by the Optical Storage Technology Association. It was designed to improve on the limitations of [[ISO 9660]] and support writable optical media.

## Best suited for

- DVDs, Blu-ray discs, and optical-media images
- Packet-written and rewritable optical media
- Media that needs files larger than classic ISO 9660 variants allow
- Cross-platform optical interchange

## Design

UDF supports larger files, richer metadata, long names, and writable-media workflows. Different UDF revisions add features and target different media generations, so compatibility depends on both the revision used to master the volume and the readers that must consume it.

## Advantages

- Better support for large files and modern metadata than basic ISO 9660
- Designed for both read-only and writable optical media
- Used across multiple operating systems and optical-media formats
- Can represent a more conventional directory tree than legacy optical formats

## Limitations

- Device compatibility varies by UDF revision
- Optical-media behavior and reliability still depend on the physical medium and writing mode
- Less appropriate than a native operating-system file system for normal internal storage
- Does not provide the security, pooling, snapshots, or integrity facilities of modern server file systems

## Choose UDF when

Use UDF when producing or reading modern optical media, especially when large files or writable media matter. Use ISO 9660 when maximum compatibility with old CD-ROM readers is more important than richer semantics.

## Official sources

- [Optical Storage Technology Association: UDF specifications](https://osta.org/specs/)
