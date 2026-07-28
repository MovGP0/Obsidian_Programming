---
title: Server Message Block (SMB)
---
**Server Message Block** (**SMB**) is a network file-sharing protocol used by Windows and implemented by systems such as Samba and the Linux CIFS client. **Common Internet File System** (**CIFS**) normally refers to an older SMB dialect rather than a separate modern file system.

## Best suited for

- Windows file shares
- Mixed Windows, Linux, and macOS networks
- Centralized user and department storage
- Network printers and related Windows-compatible resources
- Applications designed for SMB semantics

## Design

An SMB client presents a remote share as a local drive or mount point and sends file, directory, locking, and metadata operations to the server. Current SMB versions support signing, encryption, durable handles, failover features, and negotiated capabilities.

As with [[Network File System|NFS]], the server-side file system determines how blocks are stored, checksummed, snapshotted, and repaired. SMB provides network access and sharing semantics, not an on-device storage format.

## Advantages

- Native Windows integration
- Strong cross-platform support through Samba and other clients
- Windows access-control and directory-service integration
- Mature file locking, sharing, and failover capabilities
- Signing and encryption in current protocol versions

## Limitations

- Performance and availability depend on the server and network
- Protocol version, authentication, and identity mapping must be configured carefully
- Old SMB versions and CIFS dialects have weaker security and capability sets
- Application behavior can differ from a local file system
- Offline caching and concurrent edits can create conflict scenarios

## Choose SMB when

Use current SMB versions for Windows-compatible network shares. Avoid treating “CIFS” as a recommendation to enable obsolete dialects. Prefer NFS for primarily Unix-oriented environments when its identity and permission model fits better.

## Official sources

- [Microsoft Learn: SMB overview](https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-overview)
- [Linux kernel documentation: CIFS client](https://docs.kernel.org/admin-guide/cifs/index.html)
