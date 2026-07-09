---
title: EtherCAT
---
**EtherCAT** is a real-time Industrial Ethernet fieldbus originally developed by Beckhoff and maintained by the EtherCAT Technology Group (ETG). It is widely used for fast distributed I/O, synchronized drives, robotics, test systems, and motion-control machines.

## Where It Fits

EtherCAT is a strong fit when short cycle times, low jitter, and precise synchronization matter more than ordinary switched Ethernet compatibility. It is common in machine control, semiconductor equipment, packaging, printing, robotics, measurement, and modular machine systems.

## Key Technical Ideas

- EtherCAT frames are processed on the fly as they pass through each slave device.
- The master can often use a standard Ethernet controller, while slave devices need EtherCAT slave controller support.
- Distributed clocks provide tight synchronization between devices.
- ESI files describe slave devices for engineering tools.
- Safety over EtherCAT (FSoE) carries safety data over the same communication system.

## Engineering Notes

- EtherCAT is often selected for motion and high-speed I/O because it uses bandwidth very efficiently.
- Topologies can be line, tree, star, or ring depending on device and coupler support.
- The master project needs the cyclic process image and startup configuration for each slave.
- Check conformance and ESI quality carefully when mixing vendors.

## Software Libraries

- NuGet: [EtherCAT.NET](https://www.nuget.org/packages/EtherCAT.NET/1.0.0-alpha.10.final) - high-level SOEM-based EtherCAT master with ESI support for Windows and Linux; prerelease/alpha status should be considered.
- NuGet: [Leal.Core.Net.EtherCAT](https://www.nuget.org/packages/Leal.Core.Net.EtherCAT) - EtherCAT-related .NET package; verify scope and hardware assumptions before using.
- NuGet: [Triamec.Tam.EtherCAT](https://www.nuget.org/packages/Triamec.Tam.EtherCAT) - vendor-oriented EtherCAT package, useful mainly in that ecosystem.
- Rust crate: [ethercrab](https://crates.io/crates/ethercrab) - async-first EtherCAT MainDevice implementation in Rust.
- Rust docs: [ethercrab on docs.rs](https://docs.rs/ethercrab) - API documentation and feature flags.
- Rust crate: [ethercat](https://crates.io/crates/ethercat) - wrapper for the IgH/EtherLab EtherCAT master on Linux.
- Rust crate: [ethercat-sys](https://crates.io/crates/ethercat-sys) - bindings to the EtherLab open-source EtherCAT master.
- Rust crate: [ethercat-soem-sys](https://crates.io/crates/ethercat-soem-sys) - Rust bindings/build support around SOEM.

## Related Notes

- [[PROFINET]]
- [[EtherNet IP|EtherNet/IP]]
- [[Ethernet POWERLINK]]
- [[CAN bus and CANopen]]
- [[_Industrial Bus Systems|Industrial Bus Systems]]

## Sources

- [EtherCAT Technology Group technology overview](https://www.ethercat.org/en/technology.html)
- [EtherCAT Technology Group organization](https://www.ethercat.org/en/tech_group.html)
- [EtherCAT on Wikipedia](https://en.wikipedia.org/wiki/EtherCAT)
- [Beckhoff EtherCAT technology overview](https://www.beckhoff.com/en-us/products/i-o/ethercat/)
- [Dewesoft EtherCAT protocol overview](https://dewesoft.com/blog/what-is-ethercat-protocol)
- [SOEM - Simple Open EtherCAT Master](https://github.com/OpenEtherCATsociety/SOEM)
