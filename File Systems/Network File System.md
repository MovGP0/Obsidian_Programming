---
title: Network File System (NFS)
---
**Network File System** (**NFS**) is a distributed file-system protocol used primarily by Unix and Linux systems to expose remote directories through a local file-system interface.

## Best suited for

- Unix and Linux home directories
- Shared application data
- Virtualization and container infrastructure
- Centralized storage inside trusted networks
- Workflows that expect POSIX-oriented file semantics

## Design

An NFS client mounts an exported directory from a server and sends file operations over the network. Modern deployments normally use NFSv4, which integrates stateful operations, stronger security options, and a single protocol endpoint more cleanly than earlier versions.

The server-side file system remains responsible for physical allocation, local checksums, snapshots, and repair. NFS transports and coordinates access to that storage; it does not turn a non-checksummed server file system into an integrity-checking one.

## Advantages

- Native integration with Unix and Linux environments
- Centralized storage and permissions
- Multiple clients can share the same namespace
- Mature implementations and administration tooling
- NFSv4 supports Kerberos-based authentication and improved locking semantics

## Limitations

- Performance and availability depend on the network and server
- Identity mapping and permissions require careful configuration
- Caching and locking semantics can surprise applications
- A server or network outage can stall client I/O
- Exposing NFS to untrusted networks without suitable security is unsafe

## Choose NFS when

Use NFS for Unix-oriented network storage and applications whose sharing and locking behavior has been validated. Use [[Server Message Block|SMB]] when Windows interoperability and Windows-style sharing are the primary requirements.

## Official sources

- [Linux kernel documentation: NFS](https://docs.kernel.org/admin-guide/nfs/index.html)
