# Import and Export PEM Keys and Certificates in .NET

Modern .NET can import and export common PEM blocks without BouncyCastle.

Export a certificate:

```csharp
string certificatePem = certificate.ExportCertificatePem();
```

Older .NET targets can export the DER certificate and wrap it as PEM:

```csharp
byte[] der = certificate.Export(X509ContentType.Cert);
string base64 = Convert.ToBase64String(der, Base64FormattingOptions.InsertLineBreaks);
string certificatePem = $"-----BEGIN CERTIFICATE-----\r\n{base64}\r\n-----END CERTIFICATE-----\r\n";
```

Export an RSA private key as PKCS#8:

```csharp
using RSA? rsa = certificate.GetRSAPrivateKey();

if (rsa is null)
{
    throw new InvalidOperationException("The certificate does not contain an RSA private key.");
}

string privateKeyPem = rsa.ExportPkcs8PrivateKeyPem();
```

On older targets, the built-in APIs do not provide a complete PEM surface. If the key is exportable, export `RSAParameters` and write PKCS#1 or PKCS#8 encoding explicitly, or keep the private key in a PFX file instead.

Import an unencrypted PEM private key:

```csharp
using RSA rsa = RSA.Create();
rsa.ImportFromPem(privateKeyPem);

X509Certificate2 certificateWithKey = certificate.CopyWithPrivateKey(rsa);
```

Import an encrypted PEM private key:

```csharp
using RSA rsa = RSA.Create();
rsa.ImportFromEncryptedPem(encryptedPrivateKeyPem, password);
```

Older targets do not have `ImportFromPem`. For compatibility code, parse the PEM armor, decode the Base64 payload, then import the key with the older API shape available to that target. Plain PKCS#1 RSA private keys can be decoded into `RSAParameters`; encrypted PEM should normally stay as PFX on those targets unless a dedicated parser is added.

Use `PemEncoding` when you need to find or write generic PEM blocks yourself:

```csharp
PemFields fields = PemEncoding.Find(pemText);
ReadOnlySpan<char> label = pemText.AsSpan(fields.Label);
ReadOnlySpan<char> base64 = pemText.AsSpan(fields.Base64Data);
```

For CMS / PKCS#7 / signed enveloped data, use `System.Security.Cryptography.Pkcs`. PEM APIs cover key and certificate encoding; they do not replace CMS message handling.

## BouncyCastle migration map

- `PemReader` for RSA keys -> `RSA.ImportFromPem(...)` or `RSA.ImportFromEncryptedPem(...)`
- `PemWriter` for certificates -> `X509Certificate2.ExportCertificatePem()`
- `PrivateKeyInfoFactory.CreatePrivateKeyInfo(...)` -> `RSA.ExportPkcs8PrivateKeyPem()`
- manual PEM scanning -> `PemEncoding`

## See also

- [[File encryption using RSA (Asymmetric)]]
- [[File signing using a certificate]]
- [[Create Certificate Signing Requests in .NET]]
