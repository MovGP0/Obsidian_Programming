---
title: DNS SSHFP Record
---
# DNS SSHFP Record

An `SSHFP` record publishes a fingerprint of an SSH host key.

## Where it fits

Use `SSHFP` records to help SSH clients verify host keys through DNS. This is most meaningful when the DNS answer is validated with DNSSEC.

## Example

```dns
server.example.com. 3600 IN SSHFP 4 2 0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

Fields:

```text
4 = Ed25519
2 = SHA-256 fingerprint
```

## Security notes

- SSHFP without DNSSEC is only as trustworthy as the DNS transport and resolver path.
- SSHFP with DNSSEC can provide authenticated host-key material.
- SSH clients must be configured to use SSHFP verification.
- SSHFP complements, rather than replaces, careful host-key management.

## Official Sources

- [RFC 4255 - Using DNS to Securely Publish SSH Key Fingerprints](https://datatracker.ietf.org/doc/html/rfc4255)
- [RFC 6594 - Use of SHA-256 Algorithm with RSA, DSA and ECDSA in SSHFP](https://datatracker.ietf.org/doc/html/rfc6594)
- [RFC 7479 - Ed25519 SSHFP Resource Records](https://datatracker.ietf.org/doc/html/rfc7479)

