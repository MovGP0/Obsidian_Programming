---
title: Temporary File System (tmpfs)
---
**Temporary File System** (**tmpfs**) is a Linux virtual-memory file system for volatile files. Its contents live in the page cache, may be moved to swap, and disappear when the file system is unmounted or the system is restarted.

## Best suited for

- Runtime files
- Temporary build or processing data
- Shared memory
- Short-lived caches
- Writable state layered over immutable systems

## Design

tmpfs grows and shrinks according to the data it contains, subject to configured size and inode limits. Unlike a simple RAM disk, its pages participate in the virtual-memory system and may be swapped when swap is enabled.

Because no persistent on-disk file-system image is created, tmpfs avoids storage-device I/O for resident pages. It still consumes memory or swap and can contribute to memory pressure.

## Advantages

- Very low-latency access while pages remain in memory
- Capacity is allocated on demand
- Configurable size and inode limits
- Supports normal Unix permissions, POSIX access-control lists, and extended attributes
- Leaves no persistent files after unmount or reboot

## Limitations

- Contents are intentionally non-persistent
- Large or unbounded use can exhaust memory and swap
- Performance can fall when pages are heavily swapped
- Does not replace persistent scratch storage when data must survive a crash

## Choose tmpfs when

Use tmpfs for explicitly disposable data whose speed or non-persistence is useful. Do not place irreplaceable files there. In an immutable system, tmpfs can provide volatile writable state alongside [[SquashFS]] or [[Enhanced Read-Only File System|EROFS]].

## Official sources

- [Linux kernel documentation: tmpfs](https://docs.kernel.org/filesystems/tmpfs.html)
