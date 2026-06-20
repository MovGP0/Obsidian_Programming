---
title: mDNS (Multicast DNS)
---
**Multicast DNS** (**mDNS**) resolves DNS-style names on a local link without a conventional DNS server. It is most visible through names ending in `.local`, such as `printer.local` or `plc-line-1.local`.

## Where it fits

Use mDNS when devices on the same link need name resolution with little or no configuration. It is a name-resolution mechanism; service metadata is usually handled by [[DNS-Based Service Discovery]].

## Network behavior

| Property | Value |
| --- | --- |
| IPv4 multicast | `224.0.0.251` |
| IPv6 multicast | `ff02::fb` |
| UDP port | `5353` |
| Default scope | Link-local |
| Common namespace | `.local` |

Typical query:

```text
Question:
  A sensorbox.local
```

Typical answer:

```text
Answer:
  sensorbox.local A 192.168.1.42
  sensorbox.local AAAA fe80::1234:5678
```

## Relationship to DNS-SD

mDNS answers names. DNS-SD uses DNS records to describe services. They are commonly used together:

```text
mDNS:
  Resolve sensorbox.local to an address.

DNS-SD:
  Discover that Lab Sensor._http._tcp.local exists
  and points to sensorbox.local:8080.
```

## Usage Examples

Resolve a local host:

```text
Query:
  Who has printer.local?

Answer:
  printer.local = 192.168.1.50
```

Resolve the target host from a DNS-SD `SRV` record:

```text
Service:
  Lab Sensor._http._tcp.local

SRV target:
  sensorbox.local

mDNS result:
  sensorbox.local A 192.168.1.42
```

## Notes

- Routers usually do not forward mDNS because it is link-local multicast.
- Some networks bridge or proxy mDNS across segments, but that is an added network service, not the default behavior.
- mDNS alone does not provide authentication.
- Avoid putting sensitive details in names. Local discovery traffic can be visible to other hosts on the link.

## Programming Examples

These examples use a minimal DNS-SD service announcement to make a `.local` hostname discoverable through mDNS infrastructure. For pure host-name response, use the platform mDNS responder or a dedicated mDNS stack.

### C# server

```csharp
using Makaretu.Dns;

using var sd = new ServiceDiscovery();

var profile = new ServiceProfile("Sensorbox", "_workstation._tcp", 9);
sd.Advertise(profile);

Console.WriteLine("Advertising Sensorbox with a local mDNS responder");
Console.ReadLine();
```

### C# client

```csharp
using Makaretu.Dns;

using var sd = new ServiceDiscovery();

sd.ServiceInstanceDiscovered += (_, e) =>
{
    Console.WriteLine($"mDNS service instance: {e.ServiceInstanceName}");
};

sd.QueryServiceInstances("_workstation._tcp");
Console.ReadLine();
```

### Rust server

```rust
use mdns_sd::{ServiceDaemon, ServiceInfo};
use std::collections::HashMap;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mdns = ServiceDaemon::new()?;
    let service = ServiceInfo::new(
        "_workstation._tcp.local.",
        "Sensorbox",
        "sensorbox.local.",
        "192.168.1.42",
        9,
        None::<HashMap<String, String>>,
    )?;

    mdns.register(service)?;
    println!("Advertising sensorbox.local through mDNS/DNS-SD");
    std::thread::park();
    Ok(())
}
```

### Rust client

```rust
use mdns_sd::{ServiceDaemon, ServiceEvent};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mdns = ServiceDaemon::new()?;
    let receiver = mdns.browse("_workstation._tcp.local.")?;

    while let Ok(event) = receiver.recv() {
        if let ServiceEvent::ServiceResolved(info) = event {
            println!("{} -> {:?}", info.get_hostname(), info.get_addresses());
        }
    }

    Ok(())
}
```

## Official Sources

- [RFC 6762 - Multicast DNS](https://datatracker.ietf.org/doc/html/rfc6762)
- [RFC 8882 - DNS-SD Privacy and Security Requirements](https://www.rfc-editor.org/rfc/rfc8882.html)
