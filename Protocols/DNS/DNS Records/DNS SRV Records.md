---
title: DNS SRV Records
---
# DNS SRV Records

DNS `SRV` records publish the hostname and port for a named service in a DNS domain.

## Where it fits

Use `SRV` records when service location should live in DNS and clients know the service name and protocol they want. DNS-SD builds on this pattern, but `SRV` records are useful independently in protocols such as Kerberos, LDAP, SIP, XMPP, and domain controller discovery.

## Record format

```text
_service._proto.name TTL class SRV priority weight port target
```

Example:

```dns
_ldap._tcp.example.com. 3600 IN SRV 10 50 389 ldap1.example.com.
_ldap._tcp.example.com. 3600 IN SRV 10 50 389 ldap2.example.com.
_ldap._tcp.example.com. 3600 IN SRV 20 0  389 ldap-backup.example.com.
```

## Field meanings

| Field | Meaning |
| --- | --- |
| `service` | Symbolic service name, usually prefixed with `_` |
| `proto` | Transport protocol, usually `_tcp` or `_udp` |
| `priority` | Lower value is preferred |
| `weight` | Relative selection weight among records with the same priority |
| `port` | TCP or UDP port |
| `target` | DNS hostname of the server |

## Notes

- `SRV` records do not provide arbitrary metadata. Use DNS-SD `TXT` records when metadata is needed.
- Client support is protocol-specific. A client must be designed to query the relevant `SRV` name.
- `SRV` is useful for managed networks because it works through existing DNS infrastructure.
- DNS TTLs control how quickly clients can observe service-location changes.

## Programming Examples

For DNS SRV, the server side is normally an authoritative DNS server. These examples implement a tiny UDP DNS responder for one SRV record on port `53535`; production DNS would use a real authoritative DNS server on port `53`.

### C# server

```csharp
using System.Net;
using System.Net.Sockets;

using var udp = new UdpClient(53535);

while (true)
{
    var request = await udp.ReceiveAsync();
    var response = BuildSrvResponse(request.Buffer);
    await udp.SendAsync(response, request.RemoteEndPoint);
}

static byte[] BuildSrvResponse(byte[] query)
{
    var questionEnd = FindQuestionEnd(query);
    var response = new List<byte>();

    response.AddRange(query[0..2]);                  // transaction ID
    response.AddRange([0x81, 0x80]);                 // standard response, no error
    response.AddRange([0x00, 0x01, 0x00, 0x01]);     // one question, one answer
    response.AddRange([0x00, 0x00, 0x00, 0x00]);     // no authority/additional
    response.AddRange(query[12..questionEnd]);       // original question
    response.AddRange([0xC0, 0x0C, 0x00, 0x21]);     // name pointer, SRV type
    response.AddRange([0x00, 0x01, 0x00, 0x00, 0x00, 0x3C]); // IN, TTL 60

    var rdata = new List<byte>();
    WriteU16(rdata, 10);     // priority
    WriteU16(rdata, 50);     // weight
    WriteU16(rdata, 389);    // port
    EncodeName(rdata, "ldap1.example.com");

    WriteU16(response, (ushort)rdata.Count);
    response.AddRange(rdata);
    return response.ToArray();
}

static int FindQuestionEnd(byte[] query)
{
    var index = 12;
    while (query[index] != 0)
    {
        index += query[index] + 1;
    }

    return index + 5; // zero label + QTYPE + QCLASS
}

static void EncodeName(List<byte> bytes, string name)
{
    foreach (var label in name.Split('.'))
    {
        bytes.Add((byte)label.Length);
        bytes.AddRange(System.Text.Encoding.ASCII.GetBytes(label));
    }

    bytes.Add(0);
}

static void WriteU16(List<byte> bytes, int value)
{
    bytes.Add((byte)(value >> 8));
    bytes.Add((byte)value);
}
```

### C# client

```csharp
using System.Buffers.Binary;
using System.Net;
using System.Net.Sockets;

var query = BuildSrvQuery("_ldap._tcp.example.com");
using var udp = new UdpClient();

await udp.SendAsync(query, new IPEndPoint(IPAddress.Loopback, 53535));

var response = await udp.ReceiveAsync();
var (priority, weight, port, target) = ReadSrvAnswer(response.Buffer);

Console.WriteLine($"{target}:{port} priority={priority} weight={weight}");

static byte[] BuildSrvQuery(string name)
{
    var bytes = new List<byte>();
    bytes.AddRange([0x12, 0x34, 0x01, 0x00]); // transaction ID, recursion desired
    bytes.AddRange([0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    EncodeName(bytes, name);
    bytes.AddRange([0x00, 0x21, 0x00, 0x01]); // SRV, IN
    return bytes.ToArray();
}

static (ushort Priority, ushort Weight, ushort Port, string Target) ReadSrvAnswer(byte[] message)
{
    var offset = FindQuestionEnd(message) + 2 + 2 + 2 + 4;
    var rdlength = ReadU16(message, offset);
    offset += 2;

    var priority = ReadU16(message, offset);
    var weight = ReadU16(message, offset + 2);
    var port = ReadU16(message, offset + 4);
    var target = DecodeName(message, offset + 6, offset + rdlength);
    return (priority, weight, port, target);
}

static int FindQuestionEnd(byte[] message)
{
    var index = 12;
    while (message[index] != 0)
    {
        index += message[index] + 1;
    }

    return index + 5;
}

static void EncodeName(List<byte> bytes, string name)
{
    foreach (var label in name.Split('.'))
    {
        bytes.Add((byte)label.Length);
        bytes.AddRange(System.Text.Encoding.ASCII.GetBytes(label));
    }

    bytes.Add(0);
}

static string DecodeName(byte[] message, int offset, int end)
{
    var labels = new List<string>();
    while (offset < end && message[offset] != 0)
    {
        var length = message[offset++];
        labels.Add(System.Text.Encoding.ASCII.GetString(message, offset, length));
        offset += length;
    }

    return string.Join('.', labels);
}

static ushort ReadU16(byte[] bytes, int offset)
{
    return BinaryPrimitives.ReadUInt16BigEndian(bytes.AsSpan(offset, 2));
}
```

### Rust server

```rust
use std::net::UdpSocket;

fn main() -> std::io::Result<()> {
    let socket = UdpSocket::bind("127.0.0.1:53535")?;
    let mut buffer = [0u8; 512];

    loop {
        let (len, peer) = socket.recv_from(&mut buffer)?;
        let response = build_srv_response(&buffer[..len]);
        socket.send_to(&response, peer)?;
    }
}

fn build_srv_response(query: &[u8]) -> Vec<u8> {
    let question_end = find_question_end(query);
    let mut response = Vec::new();

    response.extend_from_slice(&query[0..2]);
    response.extend_from_slice(&[0x81, 0x80]);
    response.extend_from_slice(&[0x00, 0x01, 0x00, 0x01]);
    response.extend_from_slice(&[0x00, 0x00, 0x00, 0x00]);
    response.extend_from_slice(&query[12..question_end]);
    response.extend_from_slice(&[0xC0, 0x0C, 0x00, 0x21]);
    response.extend_from_slice(&[0x00, 0x01, 0x00, 0x00, 0x00, 0x3C]);

    let mut rdata = Vec::new();
    write_u16(&mut rdata, 10);
    write_u16(&mut rdata, 50);
    write_u16(&mut rdata, 389);
    encode_name(&mut rdata, "ldap1.example.com");

    write_u16(&mut response, rdata.len() as u16);
    response.extend_from_slice(&rdata);
    response
}

fn find_question_end(message: &[u8]) -> usize {
    let mut index = 12;
    while message[index] != 0 {
        index += message[index] as usize + 1;
    }
    index + 5
}

fn encode_name(bytes: &mut Vec<u8>, name: &str) {
    for label in name.split('.') {
        bytes.push(label.len() as u8);
        bytes.extend_from_slice(label.as_bytes());
    }
    bytes.push(0);
}

fn write_u16(bytes: &mut Vec<u8>, value: u16) {
    bytes.extend_from_slice(&value.to_be_bytes());
}
```

### Rust client

```rust
use std::net::UdpSocket;

fn main() -> std::io::Result<()> {
    let query = build_srv_query("_ldap._tcp.example.com");
    let socket = UdpSocket::bind("127.0.0.1:0")?;

    socket.send_to(&query, "127.0.0.1:53535")?;

    let mut buffer = [0u8; 512];
    let (len, _) = socket.recv_from(&mut buffer)?;
    let (priority, weight, port, target) = read_srv_answer(&buffer[..len]);

    println!("{target}:{port} priority={priority} weight={weight}");
    Ok(())
}

fn build_srv_query(name: &str) -> Vec<u8> {
    let mut bytes = vec![0x12, 0x34, 0x01, 0x00, 0x00, 0x01, 0, 0, 0, 0, 0, 0];
    encode_name(&mut bytes, name);
    bytes.extend_from_slice(&[0x00, 0x21, 0x00, 0x01]);
    bytes
}

fn read_srv_answer(message: &[u8]) -> (u16, u16, u16, String) {
    let mut offset = find_question_end(message) + 2 + 2 + 2 + 4;
    let rdlength = read_u16(message, offset) as usize;
    offset += 2;

    let priority = read_u16(message, offset);
    let weight = read_u16(message, offset + 2);
    let port = read_u16(message, offset + 4);
    let target = decode_name(message, offset + 6, offset + rdlength);
    (priority, weight, port, target)
}

fn find_question_end(message: &[u8]) -> usize {
    let mut index = 12;
    while message[index] != 0 {
        index += message[index] as usize + 1;
    }
    index + 5
}

fn encode_name(bytes: &mut Vec<u8>, name: &str) {
    for label in name.split('.') {
        bytes.push(label.len() as u8);
        bytes.extend_from_slice(label.as_bytes());
    }
    bytes.push(0);
}

fn decode_name(message: &[u8], mut offset: usize, end: usize) -> String {
    let mut labels = Vec::new();
    while offset < end && message[offset] != 0 {
        let length = message[offset] as usize;
        offset += 1;
        labels.push(String::from_utf8_lossy(&message[offset..offset + length]).to_string());
        offset += length;
    }
    labels.join(".")
}

fn read_u16(bytes: &[u8], offset: usize) -> u16 {
    u16::from_be_bytes([bytes[offset], bytes[offset + 1]])
}
```

## Official Sources

- [RFC 2782 - A DNS RR for specifying the location of services](https://datatracker.ietf.org/doc/html/rfc2782)
- [RFC 6186 - Use of SRV Records for Locating Email Submission and Access Services](https://datatracker.ietf.org/doc/html/rfc6186)
