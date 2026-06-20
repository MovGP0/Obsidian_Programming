---
title: DNS NSEC Record
---
# DNS NSEC Record

An `NSEC` record proves that a DNS name or record type does not exist by pointing to the next existing name in canonical order.

## Where it fits

Use `NSEC` in DNSSEC-signed zones for authenticated denial of existence.

## Example

```dns
alpha.example.com. 300 IN NSEC omega.example.com. A RRSIG NSEC
```

This says that no signed names exist between `alpha.example.com` and `omega.example.com` in canonical order, and it lists the record types that exist at `alpha.example.com`.

## Notes

- NSEC denial is authenticated by [[DNS RRSIG Record|RRSIG]] signatures.
- NSEC can enable zone walking because it exposes the next existing name.
- [[DNS NSEC3 Record|NSEC3]] hashes owner names to make zone walking harder.

## Official Sources

- [RFC 4034 - Resource Records for DNS Security Extensions](https://datatracker.ietf.org/doc/html/rfc4034)
- [RFC 4035 - Protocol Modifications for DNSSEC](https://datatracker.ietf.org/doc/html/rfc4035)

