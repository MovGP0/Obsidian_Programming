---
title: DNS CAA Record
---
# DNS CAA Record

A `CAA` record states which certificate authorities are authorized to issue certificates for a domain.

## Where it fits

Use `CAA` records to restrict certificate issuance. Public certificate authorities are required to check CAA before issuing publicly trusted certificates.

## Example

```dns
example.com. 3600 IN CAA 0 issue "letsencrypt.org"
example.com. 3600 IN CAA 0 iodef "mailto:security@example.com"
```

## Tags

| Tag | Meaning |
| --- | --- |
| `issue` | CA authorized to issue normal certificates |
| `issuewild` | CA authorized to issue wildcard certificates |
| `iodef` | Contact for issuance violation reports |
| `accounturi` | Optional account binding for ACME CAs |
| `validationmethods` | Optional restriction for validation methods |

## Security notes

- CAA is an authorization policy for certificate issuance, not for DNS lookups.
- CAA does not encrypt DNS traffic.
- CAA is stronger when combined with DNSSEC, because DNSSEC protects the integrity of the CAA answer.
- Absence of CAA means no CAA restriction from DNS.

## Official Sources

- [RFC 8659 - DNS Certification Authority Authorization](https://datatracker.ietf.org/doc/html/rfc8659)
- [RFC 8657 - CAA Extensions for Account URI and ACME Method Binding](https://datatracker.ietf.org/doc/html/rfc8657)

