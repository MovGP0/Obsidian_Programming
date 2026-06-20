---
title: OPC UA Discovery
---
**OPC UA Discovery** helps clients find OPC UA applications and endpoint descriptions. It can use local servers, multicast DNS extensions, or a Global Discovery Server.

## Where it fits

Use OPC UA discovery when the final service is an OPC UA endpoint. Network discovery can find candidates, but OPC UA still decides endpoint URLs, security policies, application certificates, and server identity.

## Discovery mechanisms

| Mechanism | Scope | Purpose |
| --- | --- | --- |
| LDS | Local host | Local Discovery Server for applications on one host |
| LDS-ME | Local subnet | Local Discovery Server with multicast extension |
| mDNS/DNS-SD | Local link | Advertise OPC UA service records |
| GDS | Administrative domain | Authoritative registry for managed OPC UA applications |

## DNS-SD service type

OPC UA over TCP commonly uses:

```text
_opcua-tcp._tcp
```

Example DNS-SD records:

```dns
_opcua-tcp._tcp.local. 120 IN PTR Packaging Line PLC._opcua-tcp._tcp.local.
Packaging\032Line\032PLC._opcua-tcp._tcp.local. 120 IN SRV 0 0 4840 plc-line-1.local.
Packaging\032Line\032PLC._opcua-tcp._tcp.local. 120 IN TXT "path=/UA/PackagingLine"
plc-line-1.local. 120 IN A 192.168.10.42
```

The client constructs:

```text
opc.tcp://plc-line-1.local:4840/UA/PackagingLine
```

## Packet flow

```text
1. Client sends mDNS PTR query for _opcua-tcp._tcp.local.
2. Server answers with an OPC UA service instance.
3. Client resolves SRV and TXT records for host, port, and path.
4. Client resolves A or AAAA records for the host.
5. Client opens OPC UA TCP to the discovered endpoint URL.
6. Client uses OPC UA discovery services such as GetEndpoints.
```

## Discovery result model

```csharp
public sealed record OpcUaMdnsService(
    string InstanceName,
    string HostName,
    int Port,
    string? Path,
    IPAddress[] Addresses)
{
    public string DiscoveryUrl =>
        $"opc.tcp://{HostName}:{Port}{Path ?? string.Empty}";
}
```

## IPv4 and IPv6 notes

The DNS-SD service type is the same for IPv4 and IPv6. Address records can include both:

```text
plc-line-1.local A    192.168.10.42
plc-line-1.local AAAA fe80::1234:5678:abcd:ef01
```

For OPC UA endpoint URLs discovered through DNS-SD, prefer keeping the hostname instead of replacing it with a link-local IPv6 literal:

```text
opc.tcp://plc-line-1.local:4840/UA/PackagingLine
```

That lets the OS resolver and mDNS stack handle interface scope and address selection.

## Security notes

- mDNS/DNS-SD discovery is not trust.
- A rogue device can advertise `_opcua-tcp._tcp.local` unless the network prevents it.
- Trust should come from OPC UA application certificates, endpoint security policies, user authentication, and network segmentation.
- A GDS can provide an administrative source of truth for registered applications.

## Programming Examples

These examples publish and discover the OPC UA DNS-SD records. They do not implement the OPC UA server itself; port `4840` must be served by a real OPC UA stack.

### C# server

```csharp
using Makaretu.Dns;

using var sd = new ServiceDiscovery();

var profile = new ServiceProfile("Packaging Line PLC", "_opcua-tcp._tcp", 4840);
profile.AddProperty("path", "/UA/PackagingLine");

sd.Advertise(profile);
Console.WriteLine("Advertising OPC UA endpoint over mDNS/DNS-SD");
Console.ReadLine();
```

### C# client

```csharp
using Makaretu.Dns;

using var sd = new ServiceDiscovery();

sd.ServiceInstanceDiscovered += (_, e) =>
{
    Console.WriteLine($"Resolved OPC UA service: {e.ServiceInstanceName}");
    Console.WriteLine(e.Message);
};

sd.QueryServiceInstances("_opcua-tcp._tcp");
Console.ReadLine();
```

### Rust server

```rust
use mdns_sd::{ServiceDaemon, ServiceInfo};
use std::collections::HashMap;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mdns = ServiceDaemon::new()?;
    let properties = HashMap::from([("path".to_string(), "/UA/PackagingLine".to_string())]);
    let service = ServiceInfo::new(
        "_opcua-tcp._tcp.local.",
        "Packaging Line PLC",
        "plc-line-1.local.",
        "192.168.10.42",
        4840,
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
    let receiver = mdns.browse("_opcua-tcp._tcp.local.")?;

    while let Ok(event) = receiver.recv() {
        if let ServiceEvent::ServiceResolved(info) = event {
            let path = info.get_property_val_str("path").unwrap_or("");
            println!("opc.tcp://{}:{}{}", info.get_hostname(), info.get_port(), path);
        }
    }

    Ok(())
}
```

## Official Sources

- [OPC UA Part 12 - Global Discovery Server](https://reference.opcfoundation.org/specs/OPC-10000-12/6)
- [OPC UA Part 12 Annex C - DNS-SD and mDNS requirements](https://reference.opcfoundation.org/GDS/v104/docs/C)
- [OPC UA Part 82 - HostName resolution using mDNS](https://reference.opcfoundation.org/specs/OPC-10000-82/5.3.3)
- [RFC 6763 - DNS-Based Service Discovery](https://datatracker.ietf.org/doc/html/rfc6763)
