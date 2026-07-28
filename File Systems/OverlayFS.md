---
title: OverlayFS
---
**OverlayFS** is a Linux union file system that presents one merged directory tree from one or more lower layers and an optional writable upper layer.

## Best suited for

- Container image layers
- Immutable operating systems
- Live systems with temporary writable state
- Development or test environments that need disposable changes

## Layer model

The lower directory tree supplies the base content and may be read-only. A writable upper directory records new or changed objects, while a work directory supports copy-up operations. The merged mount exposes the combined result.

When a lower-layer file is modified, OverlayFS copies it to the upper layer and modifies that copy. Deletions are represented with whiteouts so hidden lower entries do not reappear.

## Advantages

- Reuses shared read-only base layers
- Creates lightweight writable views
- Changes can be discarded by removing the upper layer
- Central to common Linux container-storage designs
- Works well with immutable image file systems such as [[SquashFS]] and [[Enhanced Read-Only File System|EROFS]]

## Limitations

- It layers other file systems rather than replacing their persistent storage
- Upper and lower file systems must satisfy compatibility requirements
- Copy-up can make the first write to a large lower-layer file expensive
- Inode identity, renames, hard links, and file handles have overlay-specific behavior
- Modifying underlying layers while mounted can produce undefined behavior
- Backup and monitoring tools must understand which layer contains the authoritative change

## Choose OverlayFS when

Use OverlayFS when a shared or immutable base needs a disposable or separately managed writable view. Select the underlying file systems based on their own durability and performance requirements.

## Official sources

- [Linux kernel documentation: OverlayFS](https://docs.kernel.org/filesystems/overlayfs.html)
