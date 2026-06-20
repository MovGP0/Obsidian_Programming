---
title: DNS NSEC3 Record
---
# DNS NSEC3 Record

`NSEC3` provides authenticated denial of existence with hashed owner names. `NSEC3PARAM` stores zone parameters used for NSEC3 generation.

## Where it fits

Use `NSEC3` when a signed zone wants denial-of-existence proofs without publishing plain next-name links.

## Example

```dns
hashed.example.com. 300 IN NSEC3 1 0 10 A1B2C3 hashed-next A RRSIG
example.com. 300 IN NSEC3PARAM 1 0 10 A1B2C3
```

## Fields

| Field | Meaning |
| --- | --- |
| Hash algorithm | Hash algorithm identifier |
| Flags | NSEC3 flags |
| Iterations | Hash iteration count |
| Salt | Salt used during hashing |
| Next hashed owner | Next hashed name |
| Type bitmap | Record types present at the owner name |

## Notes

- NSEC3 makes casual zone walking harder, not impossible in all cases.
- High iteration counts can increase resolver and authoritative server CPU cost.
- NSEC3PARAM is used by authoritative servers and is not itself a denial proof.

## Official Sources

- [RFC 5155 - DNSSEC Hashed Authenticated Denial of Existence](https://datatracker.ietf.org/doc/html/rfc5155)
- [RFC 9276 - Guidance for NSEC3 Parameter Settings](https://datatracker.ietf.org/doc/html/rfc9276)

