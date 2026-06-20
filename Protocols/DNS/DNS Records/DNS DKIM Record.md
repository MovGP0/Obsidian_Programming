---
title: DNS DKIM Record
---
# DNS DKIM Record

A DKIM DNS record publishes a public key used to verify DKIM signatures on email messages.

## Where it fits

Use DKIM records so receivers can verify that a message was signed by a domain-controlled private key.

## Name format

```text
<selector>._domainkey.<domain>
```

## Example

```dns
selector1._domainkey.example.com. 3600 IN TXT "v=DKIM1; k=rsa; p=base64-public-key"
```

## Important tags

| Tag | Meaning |
| --- | --- |
| `v` | Version, usually `DKIM1` |
| `k` | Key type |
| `p` | Public key |
| `h` | Optional acceptable hash algorithms |
| `s` | Optional service type |
| `t` | Optional flags |

## Notes

- DKIM records are usually `TXT` records.
- The selector lets a domain rotate keys and use multiple signing keys.
- The email `DKIM-Signature` header tells receivers which selector and domain to query.
- [[DNS DMARC Record|DMARC]] can require DKIM domain alignment with the visible From domain.

## Official Sources

- [RFC 6376 - DomainKeys Identified Mail Signatures](https://datatracker.ietf.org/doc/html/rfc6376)
- [RFC 8301 - Cryptographic Algorithm and Key Usage Update to DKIM](https://datatracker.ietf.org/doc/html/rfc8301)

