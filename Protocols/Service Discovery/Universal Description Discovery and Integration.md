---
title: Universal Description, Discovery, and Integration (UDDI)
---
**Universal Description, Discovery, and Integration** (**UDDI**) is a registry specification for publishing and discovering web services. It belongs to the XML web services and SOA era.

## Where it fits

Use UDDI when working with a legacy SOA environment that already has a UDDI registry. It is not a local-network discovery protocol like [[Multicast DNS]], [[DNS-Based Service Discovery]], or [[Simple Service Discovery Protocol]].

## Registry model

UDDI is centered on registry data such as:

| Concept | Meaning |
| --- | --- |
| Business entity | Organization or provider |
| Business service | Logical service offered by the provider |
| Binding template | Technical access details |
| tModel | Technical model or reusable classification |

## Discovery flow

```text
Provider -> publish service metadata
Client -> query registry
Registry -> matching businesses, services, bindings, or tModels
Client -> call the selected service endpoint
```

## Notes

- UDDI is a service registry, not a multicast discovery protocol.
- It is strongest when service metadata needs to be queried and governed centrally.
- It is mostly legacy in modern systems, but it is still useful to recognize in older SOAP/SOA documentation.
- Registry trust, access control, and metadata governance matter more than packet-level local discovery.

## Programming Examples

These examples exchange SOAP/XML messages shaped like a minimal UDDI inquiry endpoint. They show the network pattern for `find_service`; a production UDDI registry also implements authentication, publishing APIs, custody, validation, and the full UDDI data model.

### C# server

```csharp
using System.Net;
using System.Text;

var listener = new HttpListener();
listener.Prefixes.Add("http://+:8080/");
listener.Start();

while (true)
{
    var context = await listener.GetContextAsync();
    using var reader = new StreamReader(context.Request.InputStream, Encoding.UTF8);
    var requestBody = await reader.ReadToEndAsync();

    var responseBody = requestBody.Contains("find_service")
        ? """
<serviceList xmlns="urn:uddi-org:api_v3">
  <serviceInfos>
    <serviceInfo serviceKey="uuid:inventory">
      <name>InventoryService</name>
    </serviceInfo>
  </serviceInfos>
</serviceList>
"""
        : """<dispositionReport xmlns="urn:uddi-org:api_v3" />""";

    var bytes = Encoding.UTF8.GetBytes(responseBody);
    context.Response.ContentType = "text/xml";
    await context.Response.OutputStream.WriteAsync(bytes);
    context.Response.Close();
}
```

### C# client

```csharp
using System.Net.Http;
using System.Text;

using var http = new HttpClient();
var body = """
<find_service xmlns="urn:uddi-org:api_v3">
  <name>InventoryService</name>
</find_service>
""";

var response = await http.PostAsync(
    "http://localhost:8080/inquiry",
    new StringContent(body, Encoding.UTF8, "text/xml"));

Console.WriteLine(await response.Content.ReadAsStringAsync());
```

### Rust server

```rust
use std::io::{Read, Write};
use std::net::TcpListener;

fn main() -> std::io::Result<()> {
    let listener = TcpListener::bind("0.0.0.0:8080")?;

    for stream in listener.incoming() {
        let mut stream = stream?;
        let mut buffer = [0u8; 1024];
        let len = stream.read(&mut buffer)?;
        let request = String::from_utf8_lossy(&buffer[..len]);
        let xml = if request.contains("find_service") {
            r#"<serviceList xmlns="urn:uddi-org:api_v3"><serviceInfos><serviceInfo serviceKey="uuid:inventory"><name>InventoryService</name></serviceInfo></serviceInfos></serviceList>"#
        } else {
            r#"<dispositionReport xmlns="urn:uddi-org:api_v3" />"#
        };

        let response = format!(
            "HTTP/1.1 200 OK\r\nContent-Type: text/xml\r\nContent-Length: {}\r\n\r\n{}",
            xml.len(),
            xml
        );
        stream.write_all(response.as_bytes())?;
    }

    Ok(())
}
```

### Rust client

```rust
use std::io::{Read, Write};
use std::net::TcpStream;

fn main() -> std::io::Result<()> {
    let mut stream = TcpStream::connect("127.0.0.1:8080")?;
    let body = r#"<find_service xmlns="urn:uddi-org:api_v3"><name>InventoryService</name></find_service>"#;
    let request = format!(
        "POST /inquiry HTTP/1.1\r\nHost: localhost\r\nContent-Type: text/xml\r\nContent-Length: {}\r\n\r\n{}",
        body.len(),
        body
    );

    stream.write_all(request.as_bytes())?;

    let mut response = String::new();
    stream.read_to_string(&mut response)?;
    println!("{response}");
    Ok(())
}
```

## Official Sources

- [OASIS UDDI Specifications TC](https://www.oasis-open.org/committees/uddi-spec/doc/tcspecs.htm)
- [OASIS UDDI Specification TC home](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=uddi-spec)
