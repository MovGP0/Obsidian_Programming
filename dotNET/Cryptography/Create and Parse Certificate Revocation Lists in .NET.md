# Create and Parse Certificate Revocation Lists in .NET

Use `CertificateRevocationListBuilder` instead of BouncyCastle `X509V2CrlGenerator` for CRL creation in modern .NET.

```csharp
using System.Numerics;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

var builder = new CertificateRevocationListBuilder();

builder.AddEntry(
    revokedCertificate,
    DateTimeOffset.UtcNow,
    X509RevocationReason.KeyCompromise);

byte[] crl = builder.Build(
    issuerCertificate,
    BigInteger.One,
    DateTimeOffset.UtcNow.AddDays(30),
    HashAlgorithmName.SHA256,
    RSASignaturePadding.Pkcs1,
    DateTimeOffset.UtcNow);
```

Load an existing CRL and continue from its entries:

```csharp
CertificateRevocationListBuilder builder =
    CertificateRevocationListBuilder.Load(existingCrlBytes, out BigInteger currentCrlNumber);

builder.AddEntry(revokedCertificate, DateTimeOffset.UtcNow, X509RevocationReason.KeyCompromise);
```

`CertificateRevocationListBuilder` decodes the CRL entries and can build a new CRL, but it is not a full CRL inspection object. If code needs issuer names, update times, or low-level signature verification, parse the CRL DER with `System.Formats.Asn1` or use platform chain validation where appropriate.

## BouncyCastle migration map

- `X509V2CrlGenerator` -> `CertificateRevocationListBuilder`
- `AddCrlEntry(...)` -> `AddEntry(...)`
- `AddCrl(existingCrl)` -> `CertificateRevocationListBuilder.Load(...)`
- `CrlNumber` -> `Load(..., out currentCrlNumber)` and `Build(..., currentCrlNumber + 1, ...)`

## See also

- [[Create X.509 Certificates using CertificateRequest]]
- [[Decode X.509 Extensions with System.Formats.Asn1]]
