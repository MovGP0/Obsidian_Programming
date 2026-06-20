---
title: Service Location Protocol (SLP)
---
**Service Location Protocol** (**SLP**) is an IETF protocol for discovering network services and their attributes. Version 2 is defined by RFC 2608.

## Where it fits

Use SLP only when an existing environment requires it. It was designed for automatic service discovery on IP networks, but modern systems more often use DNS-SD, domain-specific discovery, or product-specific registries.

## Roles

| Role | Meaning |
| --- | --- |
| User Agent | Client looking for a service |
| Service Agent | Service that advertises itself |
| Directory Agent | Optional directory that aggregates service advertisements |

## Discovery flow

Without a Directory Agent:

```text
User Agent -> multicast service request
Service Agent -> service reply
```

With a Directory Agent:

```text
Service Agent -> register with Directory Agent
User Agent -> query Directory Agent
Directory Agent -> matching service URLs and attributes
```

## Service URL example

```text
service:printer:lpr://printer-01.example.com/queue
```

Attributes can describe capabilities:

```text
(color=true)
(duplex=true)
(location=office-2)
```

## Notes

- SLP can work with or without a central Directory Agent.
- It is more registry-like than mDNS because attributes and service URLs are explicit SLP concepts.
- Treat SLP as legacy unless the platform or device class still depends on it.
- Exposed discovery traffic can reveal service names, locations, and capabilities.

## Programming Examples

These examples exchange minimal SLPv2 `SrvRqst` and `SrvRply` messages over UDP on port `10427`. Real deployments normally use UDP/TCP port `427`, multicast for discovery, and a complete SLP stack.

### C# server

```csharp
using System.Net;
using System.Net.Sockets;
using System.Text;

using var udp = new UdpClient(10427);
var serviceUrl = "service:printer:lpr://printer-01.example.com/queue";

while (true)
{
    var request = await udp.ReceiveAsync();
    if (request.Buffer.Length > 1 && request.Buffer[1] == 1) // SrvRqst
    {
        var response = BuildSrvRply(request.Buffer, serviceUrl);
        await udp.SendAsync(response, request.RemoteEndPoint);
    }
}

static byte[] BuildSrvRply(byte[] request, string url)
{
    var body = new List<byte>();
    WriteU16(body, 0);      // error code
    WriteU16(body, 1);      // URL entry count
    body.Add(0);            // reserved
    WriteU16(body, 120);    // lifetime seconds
    WriteString(body, url);
    body.Add(0);            // auth block count
    return BuildSlpMessage(2, request[12], request[13], body); // SrvRply
}

static byte[] BuildSlpMessage(byte functionId, byte xidHigh, byte xidLow, List<byte> body)
{
    var lang = Encoding.ASCII.GetBytes("en");
    var length = 14 + lang.Length + body.Count;
    var bytes = new List<byte> { 2, functionId, (byte)(length >> 16), (byte)(length >> 8), (byte)length };
    bytes.AddRange([0, 0, 0, 0, 0, xidHigh, xidLow]);
    WriteU16(bytes, lang.Length);
    bytes.AddRange(lang);
    bytes.AddRange(body);
    return bytes.ToArray();
}

static void WriteString(List<byte> bytes, string value)
{
    var encoded = Encoding.UTF8.GetBytes(value);
    WriteU16(bytes, encoded.Length);
    bytes.AddRange(encoded);
}

static void WriteU16(List<byte> bytes, int value)
{
    bytes.Add((byte)(value >> 8));
    bytes.Add((byte)value);
}
```

### C# client

```csharp
using System.Net;
using System.Net.Sockets;
using System.Text;

using var udp = new UdpClient();
udp.Client.ReceiveTimeout = 3000;

var query = BuildSrvRqst("service:printer");
await udp.SendAsync(query, new IPEndPoint(IPAddress.Loopback, 10427));

var response = await udp.ReceiveAsync();
Console.WriteLine(ReadFirstUrl(response.Buffer));

static byte[] BuildSrvRqst(string serviceType)
{
    var body = new List<byte>();
    WriteString(body, "");            // previous responder list
    WriteString(body, serviceType);
    WriteString(body, "DEFAULT");     // scopes
    WriteString(body, "");            // predicate
    WriteString(body, "");            // SPI
    return BuildSlpMessage(1, 0x12, 0x34, body); // SrvRqst
}

static string ReadFirstUrl(byte[] message)
{
    var langLength = ReadU16(message, 14);
    var offset = 16 + langLength;
    offset += 2; // error code
    var count = ReadU16(message, offset);
    offset += 2;
    if (count == 0)
    {
        return "";
    }

    offset += 3; // reserved + lifetime
    var urlLength = ReadU16(message, offset);
    offset += 2;
    return Encoding.UTF8.GetString(message, offset, urlLength);
}

static byte[] BuildSlpMessage(byte functionId, byte xidHigh, byte xidLow, List<byte> body)
{
    var lang = Encoding.ASCII.GetBytes("en");
    var length = 14 + lang.Length + body.Count;
    var bytes = new List<byte> { 2, functionId, (byte)(length >> 16), (byte)(length >> 8), (byte)length };
    bytes.AddRange([0, 0, 0, 0, 0, xidHigh, xidLow]);
    WriteU16(bytes, lang.Length);
    bytes.AddRange(lang);
    bytes.AddRange(body);
    return bytes.ToArray();
}

static void WriteString(List<byte> bytes, string value)
{
    var encoded = Encoding.UTF8.GetBytes(value);
    WriteU16(bytes, encoded.Length);
    bytes.AddRange(encoded);
}

static void WriteU16(List<byte> bytes, int value)
{
    bytes.Add((byte)(value >> 8));
    bytes.Add((byte)value);
}

static ushort ReadU16(byte[] bytes, int offset)
{
    return (ushort)((bytes[offset] << 8) | bytes[offset + 1]);
}
```

### Rust server

```rust
use std::net::UdpSocket;

fn main() -> std::io::Result<()> {
    let socket = UdpSocket::bind("127.0.0.1:10427")?;
    let mut buffer = [0u8; 1024];

    loop {
        let (len, peer) = socket.recv_from(&mut buffer)?;
        if len > 1 && buffer[1] == 1 {
            let response = build_srv_rply(&buffer[..len], "service:printer:lpr://printer-01.example.com/queue");
            socket.send_to(&response, peer)?;
        }
    }
}

fn build_srv_rply(request: &[u8], url: &str) -> Vec<u8> {
    let mut body = Vec::new();
    write_u16(&mut body, 0);
    write_u16(&mut body, 1);
    body.push(0);
    write_u16(&mut body, 120);
    write_string(&mut body, url);
    body.push(0);
    build_slp_message(2, request[12], request[13], body)
}

fn build_slp_message(function_id: u8, xid_high: u8, xid_low: u8, body: Vec<u8>) -> Vec<u8> {
    let lang = b"en";
    let length = 14 + lang.len() + body.len();
    let mut bytes = vec![2, function_id, (length >> 16) as u8, (length >> 8) as u8, length as u8];
    bytes.extend_from_slice(&[0, 0, 0, 0, 0, xid_high, xid_low]);
    write_u16(&mut bytes, lang.len() as u16);
    bytes.extend_from_slice(lang);
    bytes.extend_from_slice(&body);
    bytes
}

fn write_string(bytes: &mut Vec<u8>, value: &str) {
    write_u16(bytes, value.len() as u16);
    bytes.extend_from_slice(value.as_bytes());
}

fn write_u16(bytes: &mut Vec<u8>, value: u16) {
    bytes.extend_from_slice(&value.to_be_bytes());
}
```

### Rust client

```rust
use std::net::UdpSocket;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UdpSocket::bind("0.0.0.0:0")?;
    socket.set_read_timeout(Some(Duration::from_secs(3)))?;
    socket.send_to(&build_srv_rqst("service:printer"), "127.0.0.1:10427")?;

    let mut buffer = [0u8; 1024];
    let (len, _) = socket.recv_from(&mut buffer)?;
    println!("{}", read_first_url(&buffer[..len]));
    Ok(())
}

fn build_srv_rqst(service_type: &str) -> Vec<u8> {
    let mut body = Vec::new();
    write_string(&mut body, "");
    write_string(&mut body, service_type);
    write_string(&mut body, "DEFAULT");
    write_string(&mut body, "");
    write_string(&mut body, "");
    build_slp_message(1, 0x12, 0x34, body)
}

fn read_first_url(message: &[u8]) -> String {
    let lang_len = read_u16(message, 14) as usize;
    let mut offset = 16 + lang_len + 2;
    let count = read_u16(message, offset);
    offset += 2;
    if count == 0 {
        return String::new();
    }

    offset += 3;
    let url_len = read_u16(message, offset) as usize;
    offset += 2;
    String::from_utf8_lossy(&message[offset..offset + url_len]).to_string()
}

fn build_slp_message(function_id: u8, xid_high: u8, xid_low: u8, body: Vec<u8>) -> Vec<u8> {
    let lang = b"en";
    let length = 14 + lang.len() + body.len();
    let mut bytes = vec![2, function_id, (length >> 16) as u8, (length >> 8) as u8, length as u8];
    bytes.extend_from_slice(&[0, 0, 0, 0, 0, xid_high, xid_low]);
    write_u16(&mut bytes, lang.len() as u16);
    bytes.extend_from_slice(lang);
    bytes.extend_from_slice(&body);
    bytes
}

fn write_string(bytes: &mut Vec<u8>, value: &str) {
    write_u16(bytes, value.len() as u16);
    bytes.extend_from_slice(value.as_bytes());
}

fn write_u16(bytes: &mut Vec<u8>, value: u16) {
    bytes.extend_from_slice(&value.to_be_bytes());
}

fn read_u16(bytes: &[u8], offset: usize) -> u16 {
    u16::from_be_bytes([bytes[offset], bytes[offset + 1]])
}
```

## Official Sources

- [RFC 2608 - Service Location Protocol, Version 2](https://www.ietf.org/rfc/rfc2608.txt)
- [RFC 3224 - Vendor Extensions for Service Location Protocol](https://datatracker.ietf.org/doc/html/rfc3224)
