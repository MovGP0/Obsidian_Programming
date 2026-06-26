# Create Certificate Signing Requests in .NET

Use `CertificateRequest.CreateSigningRequest()` for DER encoded PKCS#10 requests, or `CreateSigningRequestPem()` when PEM text is preferred.

```csharp
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

using RSA rsa = RSA.Create(2048);

var request = new CertificateRequest(
    "CN=OpcUaServer",
    rsa,
    HashAlgorithmName.SHA256,
    RSASignaturePadding.Pkcs1);

var san = new SubjectAlternativeNameBuilder();
san.AddUri(new Uri("urn:localhost:OpcUaServer"));
san.AddDnsName("localhost");
request.CertificateExtensions.Add(san.Build(false));

byte[] csrDer = request.CreateSigningRequest();
string csrPem = request.CreateSigningRequestPem();
```

`CreateSigningRequest()` returns DER. Store it as `.csr` or wrap it with PEM when the receiving CA expects text. `CreateSigningRequestPem()` already emits the `BEGIN CERTIFICATE REQUEST` PEM block.

## BouncyCastle migration map

- `Pkcs10CertificationRequest` -> `CertificateRequest.CreateSigningRequest()`
- `AttributePkcs(Pkcs9AtExtensionRequest, ...)` -> add extensions to `request.CertificateExtensions`
- manual PEM wrapping -> `CertificateRequest.CreateSigningRequestPem()`

## See also

- [[Create X.509 Certificates using CertificateRequest]]
- [[Create Subject Alternative Name Extensions in .NET]]
- [[Import and Export PEM Keys and Certificates in .NET]]
