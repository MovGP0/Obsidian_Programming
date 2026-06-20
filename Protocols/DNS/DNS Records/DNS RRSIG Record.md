---
title: DNS RRSIG Record
---
# DNS RRSIG Record

An `RRSIG` record contains a DNSSEC signature over one RRset.

## Where it fits

Use `RRSIG` records in signed zones so validating resolvers can verify that each record set was signed by the zone's DNSSEC keys.

## Example

```dns
www.example.com. 300 IN A 192.0.2.10
www.example.com. 300 IN RRSIG A 13 3 300 20260701000000 20260601000000 12345 example.com. signature
```

## Fields

| Field | Meaning |
| --- | --- |
| Type covered | RR type being signed |
| Algorithm | DNSSEC algorithm |
| Labels | Number of labels in the original owner name |
| Original TTL | TTL used when signing |
| Expiration | Signature expiration time |
| Inception | Signature start time |
| Key tag | DNSKEY key tag |
| Signer name | Zone that generated the signature |
| Signature | Cryptographic signature |

## Notes

- RRSIG signatures expire and must be refreshed.
- An RRset is the set of records with the same owner name, class, and type.
- RRSIG authenticates data origin and integrity. It does not encrypt DNS answers.

## Official Sources

- [RFC 4034 - Resource Records for DNS Security Extensions](https://datatracker.ietf.org/doc/html/rfc4034)
- [RFC 4035 - Protocol Modifications for DNSSEC](https://datatracker.ietf.org/doc/html/rfc4035)

