---
title: DNS CERT Record
---
# DNS CERT Record

A `CERT` record stores certificates or certificate-related data in DNS.

## Where it fits

Use CERT records only when a protocol explicitly expects certificate data from DNS. More specialized records such as [[DNS TLSA Record|TLSA]], [[DNS SSHFP Record|SSHFP]], [[DNS S-MIMEA Record|S/MIMEA]], and [[DNS OPENPGPKEY Record|OPENPGPKEY]] are usually more relevant for modern systems.

## Example

```dns
user.example.com. 3600 IN CERT PKIX 12345 8 base64-certificate
```

## Notes

- CERT can carry different certificate types.
- DNS packet size, caching, privacy, and validation matter when publishing certificate material.
- DNSSEC is important if DNS-hosted certificate data is used for trust decisions.

## Official Sources

- [RFC 4398 - Storing Certificates in the Domain Name System](https://datatracker.ietf.org/doc/html/rfc4398)

