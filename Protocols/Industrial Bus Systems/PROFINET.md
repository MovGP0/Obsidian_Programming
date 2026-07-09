---
title: PROFINET
---
**PROFINET** is an Industrial Ethernet standard from PROFIBUS & PROFINET International (PI) for communication between controllers, distributed I/O, drives, sensors, and machine modules in automation systems.

## Where It Fits

PROFINET is especially common in Siemens-centered automation environments, but it is not limited to Siemens devices. It is used for PLC-to-I/O communication, drive integration, machine diagnostics, functional safety with PROFIsafe, and integration of existing PROFIBUS installations through proxies.

## Key Technical Ideas

- PROFINET IO uses an IO-Controller, IO-Device, and IO-Supervisor model.
- Cyclic real-time process data is separated from acyclic engineering, diagnostics, and parameter traffic.
- Conformance classes define increasing capability levels, from basic real-time communication to synchronized motion and TSN-oriented profiles.
- GSDML files describe devices for engineering tools.
- Application profiles such as PROFIdrive and PROFIsafe standardize behavior across vendors.

## Engineering Notes

- Use PROFINET when the PLC ecosystem, device catalog, or plant standard already points to PI technologies.
- Network design should account for topology, device names, IP addressing, update times, switch behavior, and diagnostics.
- For motion or tightly synchronized applications, check whether the required system needs PROFINET IRT or a newer TSN-capable profile.
- For brownfield systems, PROFINET can coexist with PROFIBUS through gateways and proxies.

## Software Libraries

General-purpose PROFINET controller/device stacks are less common as ordinary NuGet packages or Rust crates because real PROFINET IO depends on raw Ethernet, conformance requirements, device descriptions, and real-time behavior. For production device development, vendor stacks or C stacks are usually more realistic than a small managed package.

- NuGet: [bx.profinet.tcpclient](https://www.nuget.org/packages/bx.profinet.tcpclient) - a .NET package advertised for working with PROFINET devices. Check whether it covers the exact PROFINET role and service you need.
- Rust crate: [profidcp](https://crates.io/crates/profidcp) - PROFINET DCP discovery/configuration support, useful for finding and configuring devices rather than full cyclic PROFINET IO.
- C stack: [RT-Labs P-Net](https://github.com/rtlabs-com/p-net) - open PROFINET device stack for embedded/Linux use.
- Product stack: [RT-Labs P-Net product page](https://rt-labs.com/product/p-net/) - commercial/support information for the P-Net stack.

## Related Notes

- [[PROFIBUS]]
- [[IO-Link]]
- [[EtherNet IP|EtherNet/IP]]
- [[EtherCAT]]
- [[_Industrial Bus Systems|Industrial Bus Systems]]

## Sources

- [PROFINET technology description](https://www.profinet.com/profinet-explained/technology-description)
- [PROFINET specification downloads](https://www.profibus.com/download/profinet-specification)
- [PROFIBUS & PROFINET International](https://www.profibus.com/)
- [PROFINET on Wikipedia](https://en.wikipedia.org/wiki/Profinet)
- [PROFINET University](https://profinetuniversity.com/)
- [RT-Labs P-Net](https://rt-labs.com/product/p-net/)
