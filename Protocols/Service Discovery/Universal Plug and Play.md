---
title: Universal Plug and Play (UPnP)
---
**Universal Plug and Play** (**UPnP**) is a local-network device architecture. Discovery is usually handled by [[Simple Service Discovery Protocol]], then clients fetch XML descriptions and use service-specific control and eventing URLs.

## Where it fits

Use UPnP when the target ecosystem expects a device model, not just host and port discovery. Common examples include media renderers, smart TVs, routers, DLNA devices, and Internet Gateway Device functions.

## Flow

```text
1. Client sends SSDP M-SEARCH.
2. Device responds by unicast with a LOCATION URL.
3. Client fetches the XML device description.
4. XML exposes device type, friendly name, services, icons, and URLs.
5. Client invokes service actions or subscribes to events.
```

## Device description example

```xml
<root>
  <specVersion>
    <major>1</major>
    <minor>1</minor>
  </specVersion>
  <device>
    <deviceType>urn:schemas-upnp-org:device:MediaRenderer:1</deviceType>
    <friendlyName>Living Room TV</friendlyName>
    <manufacturer>ExampleCorp</manufacturer>
    <modelName>ExampleRenderer</modelName>
    <UDN>uuid:12345678-90ab-cdef-1234-567890abcdef</UDN>
    <serviceList>
      <service>
        <serviceType>urn:schemas-upnp-org:service:AVTransport:1</serviceType>
        <serviceId>urn:upnp-org:serviceId:AVTransport</serviceId>
        <SCPDURL>/AVTransport.xml</SCPDURL>
        <controlURL>/control/AVTransport</controlURL>
        <eventSubURL>/event/AVTransport</eventSubURL>
      </service>
    </serviceList>
  </device>
</root>
```

## Comparison with DNS-SD

| Aspect | UPnP | [[DNS-Based Service Discovery]] |
| --- | --- | --- |
| Discovery | SSDP messages | DNS queries and records |
| Main output | Device-description URL | Service instance, host, port, metadata |
| Metadata | XML device and service descriptions | Compact `TXT` key-values |
| Control model | Included in the UPnP architecture | Not included |
| Typical fit | Rich device model | Lightweight service endpoint discovery |

## Notes

- UPnP is heavier than DNS-SD because it continues beyond discovery into description, control, eventing, and presentation.
- SSDP discovery uses multicast; the `LOCATION` header is a concrete URL that the client fetches after discovery.
- IPv4 SSDP commonly uses `239.255.255.250:1900`.
- IPv6 SSDP uses multicast addresses such as `ff02::c`, `ff05::c`, and `ff0e::c` on UDP port `1900`, depending on scope.
- A `LOCATION` URL may use IPv4, a hostname, or an IPv6 literal in brackets such as `http://[2001:db8::42]:8000/rootDesc.xml`.
- For link-local IPv6, prefer a hostname when possible because literal scoped addresses in URLs are awkward and inconsistently handled.
- `presentationURL` can point to a device web UI.
- UPnP discovery and description are not a trust boundary.
- Avoid exposing UPnP or SSDP outside the intended local network.

## Programming Examples

These examples include the two important parts: SSDP multicast discovery and HTTP retrieval of the device-description XML.

### C# server

```csharp
using System.Net;
using System.Net.Sockets;
using System.Text;

var address = Dns.GetHostEntry(Dns.GetHostName())
    .AddressList
    .First(ip => ip.AddressFamily == AddressFamily.InterNetwork);
var location = $"http://{address}:8000/rootDesc.xml";
var listener = new HttpListener();
listener.Prefixes.Add("http://+:8000/");
listener.Start();

const string description = """
<root>
  <device>
    <deviceType>urn:schemas-upnp-org:device:MediaRenderer:1</deviceType>
    <friendlyName>Living Room TV</friendlyName>
    <UDN>uuid:12345678-90ab-cdef-1234-567890abcdef</UDN>
  </device>
</root>
""";

_ = Task.Run(async () =>
{
    while (true)
    {
        var context = await listener.GetContextAsync();
        var bytes = Encoding.UTF8.GetBytes(description);
        context.Response.ContentType = "text/xml";
        await context.Response.OutputStream.WriteAsync(bytes);
        context.Response.Close();
    }
});

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

    var response = $"""
HTTP/1.1 200 OK
CACHE-CONTROL: max-age=1800
EXT:
LOCATION: {location}
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
using System.Net.Http;
using System.Net.Sockets;
using System.Text;

using var udp = new UdpClient();
udp.Client.ReceiveTimeout = 3000;

var search = """
M-SEARCH * HTTP/1.1
HOST: 239.255.255.250:1900
MAN: "ssdp:discover"
MX: 2
ST: upnp:rootdevice

""".Replace("\n", "\r\n");

var bytes = Encoding.ASCII.GetBytes(search);
await udp.SendAsync(bytes, new IPEndPoint(IPAddress.Parse("239.255.255.250"), 1900));

var discovery = await udp.ReceiveAsync();
var headers = Encoding.ASCII.GetString(discovery.Buffer);
var location = headers
    .Split("\r\n")
    .Single(line => line.StartsWith("LOCATION:", StringComparison.OrdinalIgnoreCase))
    .Split(':', 2)[1]
    .Trim();

using var http = new HttpClient();
var xml = await http.GetStringAsync(location);

Console.WriteLine(xml);
```

### Rust server

```rust
use std::io::{Read, Write};
use std::net::{Ipv4Addr, TcpListener, UdpSocket};
use std::thread;

fn main() -> std::io::Result<()> {
    let location = format!("http://{}:8000/rootDesc.xml", local_ipv4()?);
    let description = r#"<root><device><deviceType>urn:schemas-upnp-org:device:MediaRenderer:1</deviceType><friendlyName>Living Room TV</friendlyName><UDN>uuid:12345678-90ab-cdef-1234-567890abcdef</UDN></device></root>"#;

    thread::spawn(move || -> std::io::Result<()> {
        let listener = TcpListener::bind("0.0.0.0:8000")?;
        for stream in listener.incoming() {
            let mut stream = stream?;
            let mut buffer = [0u8; 1024];
            let _ = stream.read(&mut buffer)?;
            let response = format!(
                "HTTP/1.1 200 OK\r\nContent-Type: text/xml\r\nContent-Length: {}\r\n\r\n{}",
                description.len(),
                description
            );
            stream.write_all(response.as_bytes())?;
        }

        Ok(())
    });

    let socket = UdpSocket::bind("0.0.0.0:1900")?;
    socket.join_multicast_v4(&Ipv4Addr::new(239, 255, 255, 250), &Ipv4Addr::UNSPECIFIED)?;

    let mut buffer = [0u8; 2048];
    loop {
        let (len, peer) = socket.recv_from(&mut buffer)?;
        let request = String::from_utf8_lossy(&buffer[..len]);
        if request.contains("M-SEARCH") && request.contains("ssdp:discover") {
            let response = format!(
                "HTTP/1.1 200 OK\r\nCACHE-CONTROL: max-age=1800\r\nEXT:\r\nLOCATION: {location}\r\nST: upnp:rootdevice\r\nUSN: uuid:12345678-90ab-cdef-1234-567890abcdef::upnp:rootdevice\r\n\r\n"
            );
            socket.send_to(response.as_bytes(), peer)?;
        }
    }

}

fn local_ipv4() -> std::io::Result<std::net::Ipv4Addr> {
    let socket = UdpSocket::bind("0.0.0.0:0")?;
    socket.connect("8.8.8.8:80")?;
    match socket.local_addr()?.ip() {
        std::net::IpAddr::V4(ip) => Ok(ip),
        std::net::IpAddr::V6(_) => Err(std::io::Error::new(
            std::io::ErrorKind::AddrNotAvailable,
            "no IPv4 address selected",
        )),
    }
}
```

### Rust client

```rust
use std::io::{Read, Write};
use std::net::{TcpStream, UdpSocket};
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UdpSocket::bind("0.0.0.0:0")?;
    socket.set_read_timeout(Some(Duration::from_secs(3)))?;

    let search = concat!(
        "M-SEARCH * HTTP/1.1\r\n",
        "HOST: 239.255.255.250:1900\r\n",
        "MAN: \"ssdp:discover\"\r\n",
        "MX: 2\r\n",
        "ST: upnp:rootdevice\r\n",
        "\r\n"
    );

    socket.send_to(search.as_bytes(), "239.255.255.250:1900")?;

    let mut buffer = [0u8; 2048];
    let (len, _) = socket.recv_from(&mut buffer)?;
    let headers = String::from_utf8_lossy(&buffer[..len]);
    let location = headers
        .lines()
        .find_map(|line| line.strip_prefix("LOCATION:").or_else(|| line.strip_prefix("Location:")))
        .map(str::trim)
        .expect("SSDP response has LOCATION header");

    let url = location.strip_prefix("http://").expect("HTTP LOCATION URL");
    let (host_port, path) = url.split_once('/').unwrap_or((url, ""));
    let mut stream = TcpStream::connect(host_port)?;
    let request = format!("GET /{path} HTTP/1.1\r\nHost: {host_port}\r\n\r\n");
    stream.write_all(request.as_bytes())?;

    let mut response = String::new();
    stream.read_to_string(&mut response)?;
    println!("{response}");
    Ok(())
}
```

## Official Sources

- [UPnP Device Architecture 2.0](https://openconnectivity.org/upnp-specs/UPnP-arch-DeviceArchitecture-v2.0-20200417.pdf)
- [UPnP Standards and Architecture - OCF](https://openconnectivity.org/developer/specifications/upnp-resources/upnp/)
