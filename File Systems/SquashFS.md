---
title: SquashFS
---
**SquashFS** is a compressed read-only Linux file system for dense distribution images, live systems, firmware, and archival content.

## Best suited for

- Live Linux images
- Firmware and embedded-system images
- Read-only application bundles
- Recovery environments
- Compressed archival file-system images

## Design

SquashFS compresses files, inodes, directories, and fragments into a mountable image. Block compression allows individual regions to be decompressed as needed instead of expanding the entire image first. Duplicate-file detection and tail packing can improve density.

An image is generated from a source directory and then mounted read-only. Updating it normally means rebuilding the image or combining it with a writable layer such as [[OverlayFS]].

## Advantages

- High storage density
- Read-only images cannot be modified accidentally in place
- Mature Linux tooling and broad deployment
- Supports multiple compression algorithms
- Well suited to reproducible distribution and firmware

## Limitations

- Contents cannot be edited in place
- Image creation can be CPU-intensive
- Random reads may require decompression
- Updates generally replace or rebuild the image
- Immutability does not provide corruption repair or an independent backup

## Choose SquashFS when

Use SquashFS when compact image size and mature read-only distribution support are the priorities. Consider [[Enhanced Read-Only File System|EROFS]] when runtime performance and block-aligned immutable images are more important.

## Official sources

- [Linux kernel documentation: SquashFS](https://docs.kernel.org/filesystems/squashfs.html)
