---
title: EtherNet/IP
---
**EtherNet/IP** is an Industrial Ethernet protocol that maps the Common Industrial Protocol (CIP) onto standard Ethernet, IP, TCP, and UDP networking. The name means EtherNet Industrial Protocol, not Internet Protocol.

## Where It Fits

EtherNet/IP is especially important in Rockwell Automation and ODVA-centered environments. It is used for PLC communication, distributed I/O, drives, robots, safety devices, and plant-floor networks that need broad vendor interoperability within the CIP ecosystem.

## Key Technical Ideas

- CIP provides the object model, services, device profiles, and application behavior.
- EtherNet/IP uses TCP for explicit messaging and UDP for time-critical implicit I/O messaging.
- The same CIP family also includes DeviceNet, ControlNet, and CompoNet.
- CIP extensions include CIP Safety, CIP Motion, CIP Sync, and CIP Security.
- Device integration commonly uses EDS files and vendor-specific configuration tools.

## Engineering Notes

- Use EtherNet/IP when the controller ecosystem is Rockwell/Allen-Bradley or another ODVA-oriented platform.
- Managed switches, multicast handling, QoS, segmentation, and diagnostics matter in larger networks.
- EtherNet/IP can run on standard Ethernet infrastructure, but control traffic still needs industrial network design discipline.
- The protocol is strong for multi-vendor factory automation, but the application model is CIP-specific.

## Software Libraries

- NuGet: [libplctag](https://www.nuget.org/packages/libplctag/) - .NET wrapper around libplctag for reading and writing PLC tags over EtherNet/IP and Modbus TCP.
- NuGet: [MacroMu.IO.EthernetIP](https://www.nuget.org/packages/MacroMu.IO.EthernetIP) - .NET package for EtherNet/IP/CIP communication.
- .NET source library: [EEIP.NET](https://github.com/rossmann-engineering/EEIP.NET) - EtherNet/IP library with IO Scanner and explicit messaging support.
- Rust crate: [rseip](https://crates.io/crates/rseip) - pure Rust EtherNet/IP/CIP client.
- Rust docs: [rseip on docs.rs](https://docs.rs/rseip) - feature and API documentation.
- Rust crate: [cip](https://crates.io/crates/cip) - pure EtherNet/IP library in Rust.
- Rust crate: [rust-ethernet-ip](https://crates.io/crates/rust-ethernet-ip) - EtherNet/IP communication library focused on Allen-Bradley CompactLogix and ControlLogix PLCs.

## Related Notes

- [[PROFINET]]
- [[EtherCAT]]
- [[Modbus RTU and Modbus TCP]]
- [[CAN bus and CANopen]]
- [[_Industrial Bus Systems|Industrial Bus Systems]]

## Sources

- [ODVA EtherNet/IP technology page](https://www.odva.org/technology-standards/key-technologies/ethernet-ip/)
- [ODVA Common Industrial Protocol](https://www.odva.org/technology-standards/key-technologies/common-industrial-protocol-cip/)
- [EtherNet/IP on Wikipedia](https://en.wikipedia.org/wiki/EtherNet/IP)
- [Common Industrial Protocol on Wikipedia](https://en.wikipedia.org/wiki/Common_Industrial_Protocol)
- [Rockwell Automation EtherNet/IP industrial protocol white paper](https://literature.rockwellautomation.com/idc/groups/literature/documents/wp/enet-wp001_-en-p.pdf)
- [ODVA EtherNet/IP infrastructure guide](https://www.odva.org/wp-content/uploads/2020/05/PUB00035R0_Infrastructure_Guide.pdf)
- [libplctag](https://libplctag.github.io/)
