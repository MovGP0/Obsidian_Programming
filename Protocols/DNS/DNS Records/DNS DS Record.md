---
title: DNS DS Record
---
# DNS DS Record

A `DS` record stores a digest of a child zone's DNSKEY in the parent zone.

## Where it fits

Use `DS` records to connect the DNSSEC chain of trust from a parent zone to a delegated child zone.

## Example

```dns
example.com. 86400 IN DS 12345 13 2 9f86d081884c7d659a2feaa0c55ad015...
```

## Fields

| Field | Meaning |
| --- | --- |
| Key tag | Identifies the referenced DNSKEY |
| Algorithm | DNSSEC signing algorithm |
| Digest type | Digest algorithm |
| Digest | Hash of the child DNSKEY owner name and DNSKEY RDATA |

## Notes

- `DS` lives in the parent zone, not in the child zone.
- A wrong `DS` can make a signed zone fail validation.
- [[DNS CDS and CDNSKEY Records|CDS]] records can automate parent DS updates when the parent supports them.

## Official Sources

- [RFC 4034 - Resource Records for DNS Security Extensions](https://datatracker.ietf.org/doc/html/rfc4034)
- [RFC 4509 - SHA-256 in DS Resource Records](https://datatracker.ietf.org/doc/html/rfc4509)

