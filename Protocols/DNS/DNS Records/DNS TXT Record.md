---
title: DNS TXT Record
---
# DNS TXT Record

A `TXT` record stores text strings at a DNS name. It is widely used by higher-level protocols for domain verification, email policy, and service metadata.

## Where it fits

Use `TXT` records when a protocol specifies DNS-hosted text metadata. Common uses include [[DNS SPF Policy|SPF]], [[DNS DKIM Record|DKIM]], [[DNS DMARC Record|DMARC]], ACME DNS-01 challenges, site verification, and [[DNS-Based Service Discovery]] metadata.

## Examples

SPF:

```dns
example.com. 3600 IN TXT "v=spf1 include:_spf.example.net -all"
```

DKIM:

```dns
selector1._domainkey.example.com. 3600 IN TXT "v=DKIM1; k=rsa; p=base64-public-key"
```

DMARC:

```dns
_dmarc.example.com. 3600 IN TXT "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"
```

ACME DNS-01:

```dns
_acme-challenge.example.com. 300 IN TXT "base64url-token"
```

## Notes

- `TXT` is generic. The consuming protocol defines the actual syntax and meaning.
- Multiple `TXT` records can exist at the same name.
- Long values may be split into multiple quoted strings inside one DNS record.
- Avoid using `TXT` as a dumping ground when a purpose-built record type exists.

## Official Sources

- [RFC 1035 - Domain Names Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)
- [RFC 7208 - Sender Policy Framework](https://datatracker.ietf.org/doc/html/rfc7208)
- [RFC 6376 - DomainKeys Identified Mail Signatures](https://datatracker.ietf.org/doc/html/rfc6376)
- [RFC 7489 - DMARC](https://datatracker.ietf.org/doc/html/rfc7489)
- [RFC 8555 - Automatic Certificate Management Environment](https://datatracker.ietf.org/doc/html/rfc8555)
