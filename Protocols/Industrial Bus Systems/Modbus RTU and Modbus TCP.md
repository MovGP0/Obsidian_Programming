---
title: Modbus RTU and Modbus TCP
---
**Modbus RTU** and **Modbus TCP** are common forms of the Modbus protocol used to exchange register-oriented data with PLCs, drives, meters, remote I/O, gateways, and simple industrial devices.

## Where It Fits

Modbus is important because it is simple, open, widely implemented, and easy to troubleshoot. It is common in legacy machines, small devices, energy meters, HVAC equipment, drives, SCADA connections, and gateway integrations.

## Key Technical Ideas

- The Modbus data model is based on coils, discrete inputs, input registers, and holding registers.
- Modbus RTU usually runs over RS-485 and uses compact binary frames with a CRC.
- Modbus TCP maps Modbus onto TCP/IP, commonly using port 502.
- The protocol is request/response oriented and normally polled by a client.
- Register maps are vendor-specific and must be documented separately.

## Engineering Notes

- Modbus is usually the easiest protocol to integrate, but it has weak semantics.
- Addressing can be confusing because documentation may use 40001-style references while APIs use zero-based offsets.
- There is no native discovery or standard semantic model for units, scale factors, or engineering meaning.
- Modbus has no inherent security; isolate networks or use protected variants and gateways where needed.
- For deterministic high-speed motion or rich diagnostics, use another bus system.

## Software Libraries

- NuGet: [NModbus](https://www.nuget.org/packages/NModbus/) - common C# Modbus implementation.
- GitHub: [NModbus/NModbus](https://github.com/NModbus/NModbus) - source and examples; supports serial ASCII, serial RTU, TCP, and UDP.
- NuGet: [Modbus.Net](https://www.nuget.org/packages/Modbus.Net) - .NET Modbus communication package.
- NuGet: [Modbus.Library.NET](https://www.nuget.org/packages/Modbus.Library.NET) - another .NET Modbus package option.
- NuGet: [libplctag](https://www.nuget.org/packages/libplctag/) - useful when the target is PLC tag access over Modbus TCP or EtherNet/IP rather than raw Modbus register work.
- Rust crate: [tokio-modbus](https://crates.io/crates/tokio-modbus) - asynchronous Modbus client/server implementation.
- Rust docs: [tokio-modbus on docs.rs](https://docs.rs/tokio-modbus/) - API documentation.
- Rust crate: [modbus-core](https://github.com/slowtec/modbus-core) - no-std Rust Modbus core library.
- Rust crate: [voltage_modbus](https://crates.io/crates/voltage_modbus) - Rust Modbus TCP/RTU library; evaluate maturity before production use.

## Related Notes

- [[Protocols/Telemetry Protocols/Modbus|Modbus]]
- [[PROFINET]]
- [[EtherNet IP|EtherNet/IP]]
- [[CAN bus and CANopen]]
- [[_Industrial Bus Systems|Industrial Bus Systems]]

## Sources

- [Modbus specifications](https://www.modbus.org/modbus-specifications)
- [Modbus on Wikipedia](https://en.wikipedia.org/wiki/Modbus)
- [Modbus Application Protocol Specification](https://www.modbus.org/docs/Modbus_Application_Protocol_V1_1b3.pdf)
- [Modbus Serial Line Protocol and Implementation Guide](https://www.modbus.org/docs/Modbus_over_serial_line_V1_02.pdf)
- [Modbus Messaging on TCP/IP Implementation Guide](https://www.modbus.org/docs/Modbus_Messaging_Implementation_Guide_V1_0b.pdf)
- [NModbus source repository](https://github.com/NModbus/NModbus)
