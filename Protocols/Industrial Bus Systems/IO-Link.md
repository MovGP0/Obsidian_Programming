---
title: IO-Link
---
**IO-Link** is a standardized point-to-point digital communication technology for sensors and actuators. It is standardized as IEC 61131-9 and is normally used below a fieldbus or Industrial Ethernet system.

## Where It Fits

IO-Link connects smart sensors and actuators to an IO-Link master. The master then connects upward to systems such as PROFINET, EtherNet/IP, EtherCAT, Modbus TCP, or another controller network. IO-Link is therefore not a plant-wide fieldbus; it is the last-meter communication layer for intelligent field devices.

## Key Technical Ideas

- IO-Link uses point-to-point links between an IO-Link master port and one IO-Link device.
- It supports cyclic process data and acyclic parameter or diagnostic data.
- IODD files describe IO-Link devices for engineering tools.
- Standard 3-wire sensor cabling can often be reused.
- IO-Link Wireless exists for selected use cases, but wired IO-Link is the common baseline.

## Engineering Notes

- Use IO-Link when sensors or actuators need parameters, diagnostics, identification data, or easy replacement.
- IO-Link is useful for condition monitoring because device status and diagnostic data are accessible digitally.
- It reduces manual sensor setup by letting the controller or engineering tool write device parameters.
- It does not replace PROFINET, EtherNet/IP, or EtherCAT; it usually sits underneath them.

## Software Libraries

Most PC software does not talk IO-Link directly to a sensor; it talks to an IO-Link master through PROFINET, EtherNet/IP, EtherCAT, Modbus TCP, OPC UA, REST, MQTT, or a vendor API. Package support is therefore often about IODD parsing, master integration, or vendor-specific APIs.

- NuGet profile: [IOLinkNET packages](https://www.nuget.org/profiles/domdeger) - .NET packages for IO-Link integration, IODD parsing, conversion, and vendor-specific support.
- NuGet: [IOLinkNET.IODD.Parser](https://www.nuget.org/packages/IOLinkNET.IODD.Parser/) - parser package for IO-Link IODD files.
- NuGet: [Master.IoLink.Tmg](https://libraries.io/nuget/Master.IoLink.Tmg) - vendor/library package for IO-Link master integration; verify hardware support.
- Rust note: no mature general-purpose IO-Link crate was found; in Rust projects, talk to the IO-Link master through its exposed protocol, for example [[Modbus RTU and Modbus TCP|Modbus TCP]], [[EtherNet IP|EtherNet/IP]], REST, or OPC UA.
- Hardware/software reference: [IO-Link approved component list](https://io-link.com/downloads) - useful for identifying master devices and then checking their available software interface.

## Related Notes

- [[PROFINET]]
- [[EtherNet IP|EtherNet/IP]]
- [[EtherCAT]]
- [[PROFIBUS]]
- [[_Industrial Bus Systems|Industrial Bus Systems]]

## Sources

- [IO-Link official site](https://io-link.com/)
- [IO-Link downloads](https://io-link.com/downloads)
- [IO-Link Interface and System Specification](https://io-link.com/fileadmin/user_upload/Downloads/Package_2024/IOL-Interface-Spec_10002_V114_Jun24.pdf)
- [IEC 61131-9:2022](https://webstore.iec.ch/en/publication/68534)
- [IO-Link on Wikipedia](https://en.wikipedia.org/wiki/IO-Link)
- [IO-Link North America technology overview](https://io-link.us/technology/)
- [IOLinkNET packages on NuGet](https://www.nuget.org/profiles/domdeger)
