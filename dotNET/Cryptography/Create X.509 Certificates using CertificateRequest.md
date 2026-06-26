# Create X.509 Certificates using CertificateRequest

Use `CertificateRequest` instead of BouncyCastle `X509V3CertificateGenerator` for normal RSA and ECDSA certificate creation in modern .NET.

```csharp
using System.Net;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

using RSA rsa = RSA.Create(2048);

var request = new CertificateRequest(
    "CN=OpcUaServer",
    rsa,
    HashAlgorithmName.SHA256,
    RSASignaturePadding.Pkcs1);

request.CertificateExtensions.Add(
    new X509BasicConstraintsExtension(false, false, 0, true));

request.CertificateExtensions.Add(
    new X509KeyUsageExtension(
        X509KeyUsageFlags.DigitalSignature |
        X509KeyUsageFlags.KeyEncipherment |
        X509KeyUsageFlags.DataEncipherment,
        true));

var san = new SubjectAlternativeNameBuilder();
san.AddUri(new Uri("urn:localhost:OpcUaServer"));
san.AddDnsName("localhost");
san.AddIpAddress(IPAddress.Loopback);
request.CertificateExtensions.Add(san.Build(false));

var certificate = request.CreateSelfSigned(
    DateTimeOffset.UtcNow.AddDays(-1),
    DateTimeOffset.UtcNow.AddYears(1));
```

For a CA-signed certificate, create the request with the subject public key and call `request.Create(issuerCertificate, notBefore, notAfter, serialNumber)`. The issuer certificate must contain the issuer private key.

```csharp
byte[] serialNumber = RandomNumberGenerator.GetBytes(16);
serialNumber[0] &= 0x7F;

X509Certificate2 issuedCertificate = request.Create(
    issuerCertificate,
    DateTimeOffset.UtcNow.AddDays(-1),
    DateTimeOffset.UtcNow.AddYears(1),
    serialNumber);
```

## BouncyCastle migration map

- `X509V3CertificateGenerator` -> `CertificateRequest`
- `SetSubjectDN` / `SetIssuerDN` -> constructor subject and `Create(...)` issuer certificate
- `BasicConstraints` -> `X509BasicConstraintsExtension`
- `KeyUsage` -> `X509KeyUsageExtension`
- `ExtendedKeyUsage` -> `X509EnhancedKeyUsageExtension`
- `SubjectKeyIdentifier` -> `X509SubjectKeyIdentifierExtension`
- `AuthorityKeyIdentifier` -> `X509AuthorityKeyIdentifierExtension`
- `GeneralNames` SAN -> `SubjectAlternativeNameBuilder`

## See also

- [[Create Subject Alternative Name Extensions in .NET]]
- [[Create Certificate Signing Requests in .NET]]
- [[Create and Parse Certificate Revocation Lists in .NET]]
- [[Import and Export PEM Keys and Certificates in .NET]]
