---
title: CAN bus and CANopen
---
**CAN bus** is a robust serial communication bus originally developed for vehicles and later adopted in industrial, embedded, and mobile-machine systems. **CANopen** is a CAN-based higher-layer protocol and device-profile family for automation devices.

## Where It Fits

CAN bus is important in embedded controllers, vehicles, mobile machinery, compact machines, drives, battery systems, and distributed devices where robustness and low wiring cost matter. CANopen is common in industrial machinery, motion control, drives, encoders, I/O modules, and devices that need standardized configuration and process data.

## Key Technical Ideas

- CAN provides arbitration, error handling, and short frame-based communication on a shared bus.
- CANopen adds network management, object dictionaries, process data objects (PDO), service data objects (SDO), emergency messages, heartbeat, and synchronization.
- CiA 301 defines the CANopen application layer and communication profile.
- Device profiles such as CiA 402 standardize drives and motion control behavior.
- EDS and XDD files describe device communication and object dictionary entries.

## Engineering Notes

- Use CAN bus when the application is embedded, compact, mobile, or already built around CAN controllers.
- Use CANopen when you need interoperable industrial devices instead of raw custom CAN messages.
- Bus length, bitrate, termination, shielding, and connector rules matter.
- CANopen networks need node ID management, object dictionary knowledge, and careful PDO mapping.
- CAN FD and CANopen FD extend the technology for larger payloads and higher data rates, but classic CANopen remains common.

## Software Libraries

- NuGet: [Peak.PCANBasic.NET](https://www.nuget.org/packages/Peak.PCANBasic.NET/) - .NET wrapper for PEAK-System PCAN-Basic hardware API on Windows and Linux.
- Vendor API: [PEAK-System PCAN-Basic](https://www.peak-system.com/products/software/development-packages/pcan-basic/) - native API for PEAK CAN interfaces.
- NuGet: [SocketCAN](https://www.nuget.org/packages/SocketCAN) - older .NET package for Linux SocketCAN access; verify runtime compatibility.
- Linux API: [SocketCAN kernel documentation](https://docs.kernel.org/networking/can.html) - canonical Linux CAN userspace model.
- Tools: [linux-can/can-utils](https://github.com/linux-can/can-utils) - command-line tools such as `candump`, `cansend`, and `canplayer`.
- Rust crate: [socketcan](https://crates.io/crates/socketcan) - Rust access to Linux SocketCAN.
- Rust docs: [socketcan on docs.rs](https://docs.rs/socketcan) - API documentation.
- Rust crate: [embedded-can](https://crates.io/crates/embedded-can) - common embedded CAN traits.
- Rust crate: [oze-canopen](https://crates.io/crates/oze-canopen) - async CANopen library for Rust; evaluate maturity and supported CANopen roles.

## Related Notes

- [[EtherCAT]]
- [[Ethernet POWERLINK]]
- [[EtherNet IP|EtherNet/IP]]
- [[Modbus RTU and Modbus TCP]]
- [[_Industrial Bus Systems|Industrial Bus Systems]]

## Sources

- [CAN in Automation CAN knowledge](https://www.can-cia.org/can-knowledge)
- [CANopen by CAN in Automation](https://www.can-cia.org/can-knowledge/canopen)
- [CAN in Automation technical documents](https://www.can-cia.org/cia-groups/technical-documents)
- [CAN bus on Wikipedia](https://en.wikipedia.org/wiki/CAN_bus)
- [CANopen on Wikipedia](https://en.wikipedia.org/wiki/CANopen)
- [CSS Electronics CAN bus tutorial](https://www.csselectronics.com/pages/can-bus-simple-intro-tutorial)
- [CSS Electronics CANopen tutorial](https://www.csselectronics.com/pages/canopen-tutorial-simple-intro)
- [Linux SocketCAN documentation](https://docs.kernel.org/networking/can.html)
