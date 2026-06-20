---
title: DNS S-MIMEA Record
---
# DNS S-MIMEA Record

An `SMIMEA` record publishes an S/MIME certificate association for an email address.

## Where it fits

Use S/MIMEA with DNSSEC to discover S/MIME certificates for email encryption or signature validation.

## Name format

The owner name is based on a hash of the local part:

```text
<hash>._smimecert.<domain>
```

## Example shape

```dns
hash._smimecert.example.com. 3600 IN SMIMEA 3 1 1 certificate-or-key-digest
```

## Notes

- S/MIMEA uses a TLSA-like certificate association format.
- DNSSEC validation is essential for using S/MIMEA as an authenticated source.
- Publishing email certificate data can have privacy implications.

## Official Sources

- [RFC 8162 - Using Secure DNS to Associate Certificates with Domain Names for S/MIME](https://datatracker.ietf.org/doc/html/rfc8162)

