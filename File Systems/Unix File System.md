---
title: Unix File System and Fast File System (UFS and FFS)
---
**Unix File System** (**UFS**) and **Fast File System** (**FFS**) name the same historical file-system family in different BSD contexts. FreeBSD's modern native version is UFS2, while OpenBSD and NetBSD commonly use FFS terminology.

## Best suited for

- Simple FreeBSD installations
- Small servers and appliances
- Boot and recovery partitions
- BSD systems where low storage-management complexity matters

## Consistency model

FreeBSD UFS2 can use soft updates to order metadata writes so on-disk dependencies remain safe without synchronously writing every operation. Soft-updates journaling adds a compact journal of metadata changes, greatly reducing the work required after a crash.

This is a conventional file-system design. It does not combine storage pooling, RAID-like layouts, full data checksumming, and snapshot replication in the manner of [[ZFS]].

## Advantages

- Mature and predictable
- Low administrative and memory overhead
- Strong BSD integration
- Straightforward repair model
- Soft updates provide safe metadata ordering
- Journaling can shorten post-crash consistency checks

## Limitations

- No ordinary end-to-end user-data checksumming
- Snapshots are less capable than ZFS snapshots
- No integrated pooling or RAID-Z
- No transparent compression
- Less suitable for large integrity-focused storage arrays

## Choose UFS2 or FFS when

Choose this family for a conventional BSD installation where simplicity matters more than integrated storage features. On FreeBSD, choose ZFS when pooled storage, boot environments, replication, compression, and strong integrity checking justify the additional complexity.

## Official sources

- [FreeBSD Handbook: file systems](https://docs.freebsd.org/en/books/handbook/filesystems/)
- [FreeBSD manual: newfs](https://man.freebsd.org/cgi/man.cgi?newfs(8))
