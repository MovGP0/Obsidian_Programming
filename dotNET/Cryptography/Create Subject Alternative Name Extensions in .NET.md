# Create Subject Alternative Name Extensions in .NET

Use `SubjectAlternativeNameBuilder` instead of manually constructing `GeneralName` and `GeneralNames` ASN.1 structures.

```csharp
using System.Net;
using System.Security.Cryptography.X509Certificates;

var san = new SubjectAlternativeNameBuilder();
san.AddUri(new Uri("urn:localhost:MyApplication"));
san.AddDnsName("localhost");
san.AddDnsName("machine.example.com");
san.AddIpAddress(IPAddress.Loopback);

X509Extension extension = san.Build(critical: false);
request.CertificateExtensions.Add(extension);
```

For OPC UA application instance certificates, the application URI normally belongs in SAN as a URI entry. DNS names and IP addresses should be added as their real SAN types, not as strings inside the subject.

## BouncyCastle migration map

- `new GeneralName(GeneralName.UniformResourceIdentifier, uri)` -> `san.AddUri(new Uri(uri))`
- `new GeneralName(GeneralName.DnsName, host)` -> `san.AddDnsName(host)`
- `new GeneralName(GeneralName.IPAddress, ip)` -> `san.AddIpAddress(ipAddress)`
- `new GeneralNames(...)` -> `san.Build(false)`

## See also

- [[Create X.509 Certificates using CertificateRequest]]
- [[Decode X.509 Extensions with System.Formats.Asn1]]
