---
title: Simple Service Discovery Protocol (SSDP)
---
**Simple Service Discovery Protocol** (**SSDP**) is the discovery protocol used by [[Universal Plug and Play]]. It uses HTTP-like messages over UDP multicast and unicast.

## Where it fits

Use SSDP when interoperating with UPnP devices or control points. SSDP discovers devices and points clients to a device-description document. It does not itself define the full device model or control actions.

## Network behavior

| Property | Value |
| --- | --- |
| IPv4 multicast | `239.255.255.250` |
| UDP port | `1900` |
| Main search method | `M-SEARCH` |
| Main advertisement method | `NOTIFY` |
| Response style | HTTP-like UDP response |

## Active discovery

A control point searches:

```http
M-SEARCH * HTTP/1.1
HOST: 239.255.255.250:1900
MAN: "ssdp:discover"
MX: 2
ST: ssdp:all
```

A device replies by unicast:

```http
HTTP/1.1 200 OK
CACHE-CONTROL: max-age=1800
EXT:
LOCATION: http://192.168.1.42:8000/rootDesc.xml
SERVER: Linux/6.8 UPnP/1.1 SensorBox/1.0
ST: upnp:rootdevice
USN: uuid:12345678-90ab-cdef-1234-567890abcdef::upnp:rootdevice
```

## Important headers

| Header | Meaning |
| --- | --- |
| `ST` | Search target |
| `USN` | Unique Service Name, commonly based on a UUID |
| `LOCATION` | URL of the device-description XML |
| `CACHE-CONTROL` | Validity lifetime for the discovery information |
| `SERVER` | Product and protocol information |

## Notes

- SSDP is usually local-network traffic.
- Internet-exposed SSDP is a security risk and has been abused for reflection attacks.
- SSDP leaks device types, UUIDs, product strings, and description URLs.
- Full UPnP behavior continues after SSDP with XML description, control, eventing, and presentation.

## Programming Examples

These examples show the discovery exchange only. A real UPnP device must also serve the XML description at the `LOCATION` URL.

### C# server

```csharp
using System.Net;
using System.Net.Sockets;
using System.Text;

using var udp = new UdpClient(1900);
udp.JoinMulticastGroup(IPAddress.Parse("239.255.255.250"));

while (true)
{
    var request = await udp.ReceiveAsync();
    var text = Encoding.ASCII.GetString(request.Buffer);
    if (!text.Contains("M-SEARCH") || !text.Contains("ssdp:discover"))
    {
        continue;
    }

    var response = """
HTTP/1.1 200 OK
CACHE-CONTROL: max-age=1800
EXT:
LOCATION: http://192.168.1.42:8000/rootDesc.xml
ST: upnp:rootdevice
USN: uuid:12345678-90ab-cdef-1234-567890abcdef::upnp:rootdevice

""".Replace("\n", "\r\n");

    var bytes = Encoding.ASCII.GetBytes(response);
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

var search = """
M-SEARCH * HTTP/1.1
HOST: 239.255.255.250:1900
MAN: "ssdp:discover"
MX: 2
ST: ssdp:all

""".Replace("\n", "\r\n");

var bytes = Encoding.ASCII.GetBytes(search);
await udp.SendAsync(bytes, new IPEndPoint(IPAddress.Parse("239.255.255.250"), 1900));

while (true)
{
    var response = await udp.ReceiveAsync();
    Console.WriteLine(Encoding.ASCII.GetString(response.Buffer));
}
```

### Rust server

```rust
use std::net::{Ipv4Addr, UdpSocket};

fn main() -> std::io::Result<()> {
    let socket = UdpSocket::bind("0.0.0.0:1900")?;
    socket.join_multicast_v4(&Ipv4Addr::new(239, 255, 255, 250), &Ipv4Addr::UNSPECIFIED)?;

    let mut buffer = [0u8; 2048];
    loop {
        let (len, peer) = socket.recv_from(&mut buffer)?;
        let request = String::from_utf8_lossy(&buffer[..len]);
        if request.contains("M-SEARCH") && request.contains("ssdp:discover") {
            let response = concat!(
                "HTTP/1.1 200 OK\r\n",
                "CACHE-CONTROL: max-age=1800\r\n",
                "EXT:\r\n",
                "LOCATION: http://192.168.1.42:8000/rootDesc.xml\r\n",
                "ST: upnp:rootdevice\r\n",
                "USN: uuid:12345678-90ab-cdef-1234-567890abcdef::upnp:rootdevice\r\n",
                "\r\n"
            );
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

    let search = concat!(
        "M-SEARCH * HTTP/1.1\r\n",
        "HOST: 239.255.255.250:1900\r\n",
        "MAN: \"ssdp:discover\"\r\n",
        "MX: 2\r\n",
        "ST: ssdp:all\r\n",
        "\r\n"
    );

    socket.send_to(search.as_bytes(), "239.255.255.250:1900")?;

    let mut buffer = [0u8; 2048];
    while let Ok((len, peer)) = socket.recv_from(&mut buffer) {
        println!("from {peer}:\n{}", String::from_utf8_lossy(&buffer[..len]));
    }

    Ok(())
}
```

## Official Sources

- [UPnP Device Architecture 2.0](https://openconnectivity.org/upnp-specs/UPnP-arch-DeviceArchitecture-v2.0-20200417.pdf)
- [UPnP Standards and Architecture - OCF](https://openconnectivity.org/developer/specifications/upnp-resources/upnp/)
