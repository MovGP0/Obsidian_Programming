---
title: Ethernet POWERLINK
---
**Ethernet POWERLINK** is a deterministic real-time Ethernet protocol for automation and motion-control systems. It was introduced by B&R and is now managed by B&R after the dissolution of the former Ethernet POWERLINK Standardization Group.

## Where It Fits

Ethernet POWERLINK is most relevant in B&R/ABB-centered machine-control environments, deterministic motion systems, robotics, CNC, and applications that need cyclic real-time Ethernet with synchronized devices.

## Key Technical Ideas

- POWERLINK uses standard Ethernet as the base technology but schedules access to avoid nondeterministic collisions.
- A Managing Node coordinates Controlled Nodes.
- The communication cycle has an isochronous phase for time-critical data and an asynchronous phase for less time-critical traffic.
- It can use CANopen device profiles, including drive profiles such as CiA 402.
- openSAFETY can be used as the functional safety layer.

## Engineering Notes

- POWERLINK is technically strong for deterministic control, but its ecosystem is smaller than PROFINET, EtherNet/IP, and EtherCAT.
- It is most compelling when the machine platform or drive ecosystem already uses B&R/POWERLINK.
- Do not confuse Ethernet POWERLINK with Power over Ethernet, powerline communication, or audio-brand PowerLink cabling.
- For new designs, compare available device support, service skills, and controller platform support before choosing it.

## Software Libraries

Ethernet POWERLINK support is commonly done through controller/vendor tooling or the openPOWERLINK C stack rather than through ordinary .NET packages. Rust support exists but should be treated carefully because some crates are young or explicitly marked as work in progress.

- C stack: [openPOWERLINK on GitHub](https://github.com/OpenAutomationTechnologies/openPOWERLINK_V2) - open-source POWERLINK stack for Managing Node and Controlled Node use.
- C stack downloads: [openPOWERLINK on SourceForge](https://sourceforge.net/projects/openpowerlink/) - release downloads and older project material.
- Configuration tooling: [Ethernet POWERLINK openCONFIGURATOR](https://marketplace.eclipse.org/content/ethernet-powerlink-openconfigurator) - open-source configuration framework for POWERLINK networks.
- Rust crate: [powerlink-rs](https://crates.io/crates/powerlink-rs) - Rust implementation of Ethernet POWERLINK, marked work in progress.
- Rust crate: [powerlink-rs-xdc](https://crates.io/crates/powerlink-rs-xdc) - parser/serializer for POWERLINK XDC device-configuration files.
- Rust crate: [powerlink-rs-windows](https://crates.io/crates/powerlink-rs-windows) - raw Ethernet I/O driver support for the powerlink-rs HAL on Windows.
- .NET note: no mature general-purpose Ethernet POWERLINK NuGet package was found; use openPOWERLINK through native interop or vendor SDKs if .NET integration is required.

## Related Notes

- [[EtherCAT]]
- [[PROFINET]]
- [[EtherNet IP|EtherNet/IP]]
- [[CAN bus and CANopen]]
- [[_Industrial Bus Systems|Industrial Bus Systems]]

## Sources

- [B&R POWERLINK technology page](https://www.br-automation.com/en-us/technologies/powerlink/)
- [OPC Foundation introduction to Ethernet POWERLINK](https://reference.opcfoundation.org/specs/OPC-30110/4.1)
- [Ethernet POWERLINK Communication Profile Specification](https://br-cws-assets.de-fra-1.linodeobjects.com/EPSG_301_V-1-5-1_DS-c710608e.pdf)
- [Ethernet POWERLINK on Wikipedia](https://en.wikipedia.org/wiki/Ethernet_Powerlink)
- [openPOWERLINK stack on GitHub](https://github.com/OpenAutomationTechnologies/openPOWERLINK_V2)
- [openPOWERLINK on SourceForge](https://sourceforge.net/projects/openpowerlink/)
