
- On Linux, this uses `/usr/share/.mono/certs` or `/etc/ssl/certs`
- On Windows, the certificate store is used

Get a certificate store
```csharp
using System.Security.Cryptography.X509Certificates;
using var store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
```

Add a certificate to the store
```csharp
try
{
	store.Open(OpenFlags.ReadWrite);
	store.Add(cert);
}
finally
{
    store.Close();
}
```

Find a certificate
```csharp
try
{
	store.Open(OpenFlags.ReadOnly);
	var foundCerts = store.Certificates
	    .Find(X509FindType.FindBySubjectName, "SubjectName", false);
	var certificate = foundCerts[0];
}
finally
{
    store.Close();
}
```

Delete a certificate
```csharp
try
{
	store.Open(OpenFlags.ReadWrite);
	store.Remove(certificate);
	store.RemoveRange(certificates);
}
finally
{
    store.Close();
}
```

## See also

- [[Create X.509 Certificates using CertificateRequest]]
- [[Create Certificate Signing Requests in .NET]]
- [[Create and Parse Certificate Revocation Lists in .NET]]
- [[Import and Export PEM Keys and Certificates in .NET]]
