---
title: Enhanced Read-Only File System (EROFS)
---
**Enhanced Read-Only File System** (**EROFS**) is a high-performance, block-based, immutable Linux file system for compressed system, container, application, and dataset images.

## Best suited for

- Immutable Linux system images
- Android and embedded devices
- Container and sandbox images
- Live and installation media
- Read-only dataset distribution

## Design

EROFS is read-only by design and arranges file-system data in block-aligned structures. This makes it possible to combine compression with efficient random access and direct-I/O-oriented behavior. Images can also reference external data blobs and participate in layered distribution designs.

Writable behavior is normally supplied by a different file system or by [[OverlayFS]], not by modifying the EROFS image.

## Advantages

- Optimized read performance for immutable images
- Compression and compact metadata layouts
- Block-aligned on-disk data
- Suitable for reproducible, auditable images
- Can support file-backed mounting and image layering

## Limitations

- Read-only by design
- Updating content requires producing or switching to a new image
- Smaller deployment ecosystem than [[SquashFS]]
- Compression settings trade image size, build time, and read performance
- Immutability does not itself detect every corruption or replace backups

## Choose EROFS when

Choose EROFS for a performance-sensitive immutable Linux image. Choose SquashFS when maximum compression density or its longer-established tooling and compatibility are more important.

## Official sources

- [Linux kernel documentation: EROFS](https://docs.kernel.org/filesystems/erofs.html)
- [EROFS project documentation](https://erofs.docs.kernel.org/en/latest/)
