---
title: WS-Discovery
---
**WS-Discovery** is an OASIS discovery protocol for locating web services. It uses SOAP messages, commonly over UDP multicast for ad hoc discovery.

## Where it fits

Use WS-Discovery when interoperating with WS-* or Devices Profile for Web Services environments. It is common in device ecosystems that expose SOAP-based web services, including some printer, scanner, and camera discovery flows.

## Core messages

| Message | Purpose |
| --- | --- |
| `Hello` | A target service announces that it joined |
| `Bye` | A target service announces that it is leaving |
| `Probe` | A client searches by type or scope |
| `ProbeMatches` | A target service returns matching endpoints |
| `Resolve` | A client resolves a known endpoint reference |
| `ResolveMatches` | A target service returns resolved metadata |

## Ad hoc discovery

```text
Client -> multicast Probe
Service -> unicast ProbeMatches
```

With a discovery proxy:

```text
Service -> Hello to discovery proxy
Client -> query discovery proxy
Proxy -> matching services
```

## Notes

- WS-Discovery is message-oriented and SOAP-based, unlike [[Simple Service Discovery Protocol]], which is HTTP-like text over UDP.
- A discovery proxy can reduce multicast traffic and support larger networks.
- WS-Discovery finds service endpoints; it does not replace application-level authentication and authorization.
- It is usually a compatibility protocol rather than the default choice for new lightweight systems.

## Programming Examples

These examples show the shape of a Probe and ProbeMatches exchange. Production WS-Discovery implementations need correct WS-Addressing IDs, namespaces, types, scopes, and endpoint references.

### C# server

```csharp
using System.Net;
using System.Net.Sockets;
using System.Text;

using var udp = new UdpClient(3702);
udp.JoinMulticastGroup(IPAddress.Parse("239.255.255.250"));

while (true)
{
    var request = await udp.ReceiveAsync();
    var text = Encoding.UTF8.GetString(request.Buffer);
    if (!text.Contains("Probe"))
    {
        continue;
    }

    var response = """
<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope"
            xmlns:d="http://docs.oasis-open.org/ws-dd/ns/discovery/2009/01">
  <s:Body>
    <d:ProbeMatches>
      <d:ProbeMatch>
        <d:XAddrs>http://192.168.1.42:8080/device</d:XAddrs>
      </d:ProbeMatch>
    </d:ProbeMatches>
  </s:Body>
</s:Envelope>
""";

    var bytes = Encoding.UTF8.GetBytes(response);
    await udp.SendAsync(bytes, request.RemoteEndPoint);
}
```

### C# client

```csharp
using System.Net;
using System.Net.Sockets;
using System.Text;

using var udp = new UdpClient();
udp.Client.ReceiveTimeout = 3000;

var probe = """
<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope"
            xmlns:d="http://docs.oasis-open.org/ws-dd/ns/discovery/2009/01">
  <s:Body><d:Probe /></s:Body>
</s:Envelope>
""";

var bytes = Encoding.UTF8.GetBytes(probe);
await udp.SendAsync(bytes, new IPEndPoint(IPAddress.Parse("239.255.255.250"), 3702));

var response = await udp.ReceiveAsync();
Console.WriteLine(Encoding.UTF8.GetString(response.Buffer));
```

### Rust server

```rust
use std::net::{Ipv4Addr, UdpSocket};

fn main() -> std::io::Result<()> {
    let socket = UdpSocket::bind("0.0.0.0:3702")?;
    socket.join_multicast_v4(&Ipv4Addr::new(239, 255, 255, 250), &Ipv4Addr::UNSPECIFIED)?;

    let mut buffer = [0u8; 4096];
    loop {
        let (len, peer) = socket.recv_from(&mut buffer)?;
        let request = String::from_utf8_lossy(&buffer[..len]);
        if request.contains("Probe") {
            let response = r#"<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:d="http://docs.oasis-open.org/ws-dd/ns/discovery/2009/01"><s:Body><d:ProbeMatches><d:ProbeMatch><d:XAddrs>http://192.168.1.42:8080/device</d:XAddrs></d:ProbeMatch></d:ProbeMatches></s:Body></s:Envelope>"#;
            socket.send_to(response.as_bytes(), peer)?;
        }
    }
}
```

### Rust client

```rust
use std::net::UdpSocket;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UdpSocket::bind("0.0.0.0:0")?;
    socket.set_read_timeout(Some(Duration::from_secs(3)))?;

    let probe = r#"<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:d="http://docs.oasis-open.org/ws-dd/ns/discovery/2009/01"><s:Body><d:Probe /></s:Body></s:Envelope>"#;
    socket.send_to(probe.as_bytes(), "239.255.255.250:3702")?;

    let mut buffer = [0u8; 4096];
    let (len, peer) = socket.recv_from(&mut buffer)?;
    println!("from {peer}: {}", String::from_utf8_lossy(&buffer[..len]));
    Ok(())
}
```

## Official Sources

- [OASIS WS-Discovery 1.1 specification](https://docs.oasis-open.org/ws-dd/discovery/1.1/os/wsdd-discovery-1.1-spec-os.html)
- [OASIS Web Services Discovery and Web Services Devices Profile TC](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=ws-dd)
