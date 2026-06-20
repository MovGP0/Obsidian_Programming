---
title: DNS-Based Service Discovery (DNS-SD)
---
**DNS-Based Service Discovery** (**DNS-SD**) describes services with ordinary DNS record types. It can run over multicast DNS on a local link or over normal unicast DNS in a managed domain.

## Where it fits

Use DNS-SD when a client needs to find service instances by service type and then learn the host, port, and compact metadata needed to connect.

## Record chain

DNS-SD usually uses this record chain:

```text
_service._proto.local PTR instance._service._proto.local
instance._service._proto.local SRV host.local port
instance._service._proto.local TXT key=value metadata
host.local A / AAAA address
```

For an HTTP service:

```text
_http._tcp.local PTR Lab Sensor._http._tcp.local
Lab Sensor._http._tcp.local SRV sensorbox.local 8080
Lab Sensor._http._tcp.local TXT path=/ui version=1.2
sensorbox.local A 192.168.1.42
```

The client can then construct:

```text
http://sensorbox.local:8080/ui
```

## Usage Examples

Discover IPP printers:

```text
Query:
  PTR _ipp._tcp.local

Answer:
  _ipp._tcp.local PTR Office Printer._ipp._tcp.local
  Office Printer._ipp._tcp.local SRV printer-01.local 631
  Office Printer._ipp._tcp.local TXT rp=printers/office ty=Office Laser Printer
  printer-01.local A 192.168.1.50
```

Discover OPC UA TCP endpoints:

```text
Query:
  PTR _opcua-tcp._tcp.local

Answer:
  _opcua-tcp._tcp.local PTR Packaging Line PLC._opcua-tcp._tcp.local
  Packaging Line PLC._opcua-tcp._tcp.local SRV plc-line-1.local 4840
  Packaging Line PLC._opcua-tcp._tcp.local TXT path=/UA/PackagingLine
```

## Notes

- DNS-SD discovers where a service is. It does not define the application protocol after connection.
- `TXT` records should stay compact and non-sensitive.
- The same service type can have multiple instances.
- Instance names are human-facing names; hostnames are the network targets.
- DNS-SD over mDNS is usually local-link. DNS-SD over unicast DNS can cover a wider administrative domain.

## Programming Examples

### C# server

```csharp
using Makaretu.Dns;

using var sd = new ServiceDiscovery();

var profile = new ServiceProfile("Office Printer", "_ipp._tcp", 631);
profile.AddProperty("rp", "printers/office");
profile.AddProperty("ty", "Office Laser Printer");

sd.Advertise(profile);
Console.WriteLine("Advertising Office Printer._ipp._tcp");
Console.ReadLine();
```

### C# client

```csharp
using Makaretu.Dns;

using var sd = new ServiceDiscovery();

sd.ServiceInstanceDiscovered += (_, e) =>
{
    Console.WriteLine($"Found instance: {e.ServiceInstanceName}");
    Console.WriteLine(e.Message);
};

sd.QueryServiceInstances("_ipp._tcp");
Console.ReadLine();
```

### Rust server

```rust
use mdns_sd::{ServiceDaemon, ServiceInfo};
use std::collections::HashMap;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mdns = ServiceDaemon::new()?;
    let properties = HashMap::from([
        ("rp".to_string(), "printers/office".to_string()),
        ("ty".to_string(), "Office Laser Printer".to_string()),
    ]);

    let service = ServiceInfo::new(
        "_ipp._tcp.local.",
        "Office Printer",
        "printer-01.local.",
        "192.168.1.50",
        631,
        properties,
    )?;

    mdns.register(service)?;
    std::thread::park();
    Ok(())
}
```

### Rust client

```rust
use mdns_sd::{ServiceDaemon, ServiceEvent};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mdns = ServiceDaemon::new()?;
    let receiver = mdns.browse("_ipp._tcp.local.")?;

    while let Ok(event) = receiver.recv() {
        if let ServiceEvent::ServiceResolved(info) = event {
            println!("{}:{} {:?}", info.get_hostname(), info.get_port(), info.get_properties());
        }
    }

    Ok(())
}
```

## Official Sources

- [RFC 6763 - DNS-Based Service Discovery](https://datatracker.ietf.org/doc/html/rfc6763)
- [RFC 6762 - Multicast DNS](https://datatracker.ietf.org/doc/html/rfc6762)
- [RFC 8882 - DNS-SD Privacy and Security Requirements](https://www.rfc-editor.org/rfc/rfc8882.html)
- [RFC 9665 - Service Registration Protocol for DNS-SD](https://www.rfc-editor.org/rfc/rfc9665)
