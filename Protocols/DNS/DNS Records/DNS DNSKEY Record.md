---
title: DNS DNSKEY Record
---
# DNS DNSKEY Record

A `DNSKEY` record publishes a public key for a DNSSEC-signed zone.

## Where it fits

Use `DNSKEY` records inside a signed zone so validating resolvers can verify [[DNS RRSIG Record|RRSIG]] signatures.

## Example

```dns
example.com. 3600 IN DNSKEY 257 3 13 base64-public-key
example.com. 3600 IN DNSKEY 256 3 13 base64-public-key
```

## Fields

| Field | Meaning |
| --- | --- |
| Flags | Key role, commonly KSK `257` or ZSK `256` |
| Protocol | Always `3` for DNSSEC |
| Algorithm | Signing algorithm number |
| Public key | Base64-encoded public key |

## Notes

- The key-signing key usually signs the DNSKEY RRset.
- The zone-signing key usually signs ordinary zone data.
- A parent [[DNS DS Record|DS]] record authenticates the child zone's KSK.

## Official Sources

- [RFC 4034 - Resource Records for DNS Security Extensions](https://datatracker.ietf.org/doc/html/rfc4034)
- [IANA DNSSEC Algorithm Numbers](https://www.iana.org/assignments/dns-sec-alg-numbers/dns-sec-alg-numbers.xhtml)

