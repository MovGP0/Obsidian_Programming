## Sign a file

Load certificate from a file.

Modern .NET:

```csharp
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

var certPath = "ServerCertificate.pfx";
var password = "secret";
var cert = X509CertificateLoader.LoadPkcs12FromFile(certPath, password);
```

Older .NET targets:

```csharp
using System.Security.Cryptography.X509Certificates;

var certPath = "ServerCertificate.pfx";
var password = "secret";
var cert = new X509Certificate2(certPath, password);
```

Get the private key.

Modern .NET:

```csharp
using RSA? rsa = cert.GetRSAPrivateKey();

if (rsa is null)
{
    throw new InvalidOperationException("The certificate does not contain an RSA private key.");
}
```

Older .NET Framework code:

```csharp
var rsa = (RSACryptoServiceProvider)cert.PrivateKey;
```

Sign the file content:

```csharp
var filePath = "FileToSign.txt";
byte[] data = File.ReadAllBytes(filePath);

byte[] signature = rsa.SignData(data, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
```

Older .NET Framework code can sign the hash:

```csharp
var filePath = "FileToSign.txt";
byte[] data = File.ReadAllBytes(filePath);

using var sha256 = SHA256.Create();
byte[] hash = sha256.ComputeHash(data);
byte[] signature = rsa.SignHash(hash, CryptoConfig.MapNameToOID("SHA256"));
```

Verify the signature with the public key:

```csharp
using RSA? publicKey = cert.GetRSAPublicKey();

bool isValid = publicKey?.VerifyData(
    data,
    signature,
    HashAlgorithmName.SHA256,
    RSASignaturePadding.Pkcs1) == true;
```

Older .NET Framework code:

```csharp
bool isValid = rsa.VerifyHash(hash, CryptoConfig.MapNameToOID("SHA256"), signature);
```

### Alternatives

Store signature as metadata of a file:

```csharp
using DSOFile;

byte[] signature = ...;
var odp = new OleDocumentProperties();
odp.Open(filePath, false, DSOFile.dsoFileOpenOptions.dsoOptionDefault);
odp.CustomProperties.Add("Signature", ref signatureValue);
odp.Save();
```

#### Use SignTool for signing a binary

Sign a `.exe` or `.dll` file using SignTool:

```powershell
signtool.exe sign `
    /f "Certificate.pfx" `
    /p "secret" `
    /fd SHA256 `
    /tr 'http://timestamp.digicert.com' `
    /td SHA256 `
    "FileToSign.exe"
```

#### Use `Set-AuthenticodeSignature` to sign a binary

Sign a `.exe` or `.dll` file using [[PowerShell]]:

```powershell
$cert = Get-PfxCertificate -FilePath "Certificate.pfx"

Set-AuthenticodeSignature `
    -FilePath "FileToSign.exe" `
    -Certificate $cert `
    -TimestampServer http://timestamp.digicert.com `
    -HashAlgorithm SHA256
```

## See also

- [[Create X.509 Certificates using CertificateRequest]]
- [[Self-Signed TLS Zertifikate]]
