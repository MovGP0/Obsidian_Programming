# Decode X.509 Extensions with System.Formats.Asn1

Prefer built-in extension classes where they exist:

- `X509BasicConstraintsExtension`
- `X509KeyUsageExtension`
- `X509EnhancedKeyUsageExtension`
- `X509SubjectKeyIdentifierExtension`
- `X509AuthorityKeyIdentifierExtension`

Use `System.Formats.Asn1.AsnReader` for extension values that do not have a dedicated .NET type, or when you need a field that the built-in type does not expose.

```csharp
using System.Formats.Asn1;
using System.Security.Cryptography.X509Certificates;

X509Extension extension = certificate.Extensions["2.5.29.17"];

var reader = new AsnReader(extension.RawData, AsnEncodingRules.DER);
var generalNames = reader.ReadSequence();

while (generalNames.HasData)
{
    Asn1Tag tag = generalNames.PeekTag();

    if (tag.TagClass == TagClass.ContextSpecific && tag.TagValue == 2)
    {
        string dnsName = generalNames.ReadCharacterString(
            UniversalTagNumber.IA5String,
            new Asn1Tag(TagClass.ContextSpecific, 2));
    }
    else
    {
        generalNames.ReadEncodedValue();
    }
}
```

`X509Extension.RawData` is the decoded extension value. In normal `X509Certificate2` extension objects, do not add an extra OCTET STRING wrapper before passing the bytes to `AsnReader`.

## Common tags

- SAN DNS name: context-specific tag `[2]`, IA5String
- SAN URI: context-specific tag `[6]`, IA5String
- SAN IP address: context-specific tag `[7]`, OCTET STRING
- Authority key identifier key id: context-specific tag `[0]`, OCTET STRING
- Authority key identifier issuer: context-specific tag `[1]`, GeneralNames
- Authority key identifier serial: context-specific tag `[2]`, INTEGER

## BouncyCastle migration map

- `X509ExtensionUtilities.FromExtensionValue(...)` -> read `X509Extension.RawData` with `AsnReader`
- `GeneralNames.GetInstance(...)` -> parse the sequence and context-specific tags
- `DerObjectIdentifier` -> `Oid` or object identifier strings
- custom DER integer parsing -> `AsnReader.ReadIntegerBytes(...)`

## See also

- [[Create Subject Alternative Name Extensions in .NET]]
- [[Create and Parse Certificate Revocation Lists in .NET]]
