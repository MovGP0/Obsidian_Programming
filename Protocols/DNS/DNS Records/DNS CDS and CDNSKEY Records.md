---
title: DNS CDS and CDNSKEY Records
---
# DNS CDS and CDNSKEY Records

`CDS` and `CDNSKEY` records let a child zone signal desired DNSSEC delegation changes to its parent.

## Where it fits

Use these records for automated DNSSEC delegation trust maintenance when the parent registry or DNS provider supports it.

## Examples

```dns
example.com. 3600 IN CDS 12345 13 2 digest
example.com. 3600 IN CDNSKEY 257 3 13 base64-public-key
```

## Relationship to parent records

```text
Child publishes CDS / CDNSKEY
Parent validates the child signal
Parent updates DS records
```

## Notes

- CDS mirrors the shape of a [[DNS DS Record|DS]] record.
- CDNSKEY mirrors the shape of a [[DNS DNSKEY Record|DNSKEY]] record.
- Parent-side automation is policy-dependent; publishing CDS/CDNSKEY does not guarantee the parent will act.
- Incorrect automation can break DNSSEC validation, so parent validation and timing matter.

## Official Sources

- [RFC 7344 - Automating DNSSEC Delegation Trust Maintenance](https://datatracker.ietf.org/doc/html/rfc7344)
- [RFC 8078 - Managing DS Records from the Parent via CDS/CDNSKEY](https://datatracker.ietf.org/doc/html/rfc8078)

