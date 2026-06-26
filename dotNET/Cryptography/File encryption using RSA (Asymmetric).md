Load an RSA certificate from a `.p12` or `.pfx` file.

Modern .NET:

```csharp
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

var filePath = "Certificate.pfx";
var cert = X509CertificateLoader.LoadPkcs12FromFile(filePath, password);
```

Older .NET targets:

```csharp
using System.Security.Cryptography.X509Certificates;

var filePath = "Certificate.pfx";
var cert = new X509Certificate2(filePath, password);
```

Get the RSA keys with the modern extension methods:

```csharp
using RSA? rsaPublic = cert.GetRSAPublicKey();
using RSA? rsaPrivate = cert.GetRSAPrivateKey();

if (rsaPublic is null || rsaPrivate is null)
{
    throw new InvalidOperationException("The certificate does not contain an RSA key pair.");
}
```

Older .NET Framework code often used `RSACryptoServiceProvider` directly:

```csharp
var rsaPublic = (RSACryptoServiceProvider)cert.PublicKey.Key;
var rsaPrivate = (RSACryptoServiceProvider)cert.PrivateKey;
```

Encrypt data using the RSA public key:

```csharp
byte[] dataToEncrypt = Encoding.UTF8.GetBytes("Hello world");
byte[] encryptedData = rsaPublic.Encrypt(dataToEncrypt, RSAEncryptionPadding.OaepSHA256);
```

Older `RSACryptoServiceProvider` code used the Boolean OAEP flag. `true` means OAEP-SHA1; `false` means PKCS#1 v1.5 encryption padding:

```csharp
byte[] encryptedData = rsaPublic.Encrypt(dataToEncrypt, true);
```

Decrypt data using the RSA private key:

```csharp
byte[] decryptedData = rsaPrivate.Decrypt(encryptedData, RSAEncryptionPadding.OaepSHA256);
string decryptedText = Encoding.UTF8.GetString(decryptedData);
```

Older `RSACryptoServiceProvider` code:

```csharp
byte[] decryptedData = rsaPrivate.Decrypt(encryptedData, true);
string decryptedText = Encoding.UTF8.GetString(decryptedData);
```

RSA is for small payloads, key wrapping, or signatures. For files, generate a random AES key, encrypt the file with AES, then encrypt only the AES key with RSA.

## See also

- [[File encryption using AES (Symmetric)]]
- [[Import and Export PEM Keys and Certificates in .NET]]
