---
title: DNS TLSA Record
---
# DNS TLSA Record

A `TLSA` record publishes a certificate or public-key association for a TLS service. It is the main DNS record used by DANE.

## Where it fits

Use `TLSA` records when DNSSEC-validated DNS should authenticate TLS service keys or certificates. Common examples include SMTP with DANE and specialized service deployments.

## Name format

```text
_<port>._<transport>.<service-name>
```

Example for HTTPS on TCP port 443:

```dns
_443._tcp.www.example.com. 3600 IN TLSA 3 1 1 aabbccddeeff...
```

## Fields

| Field | Meaning |
| --- | --- |
| Certificate usage | How the association relates to PKIX or a trust anchor |
| Selector | Full certificate or SubjectPublicKeyInfo |
| Matching type | Exact value or digest algorithm |
| Association data | Certificate/key material or digest |

## Security notes

- TLSA depends on DNSSEC validation for authenticity.
- TLSA does not encrypt DNS queries. Use DoT, DoH, or DoQ for DNS transport encryption.
- DANE can authenticate service certificates even when public Web PKI is not the only trust source.
- Many browsers do not rely on DANE for normal HTTPS validation.

## Official Sources

- [RFC 6698 - The DNS-Based Authentication of Named Entities TLSA Protocol](https://datatracker.ietf.org/doc/html/rfc6698)
- [RFC 7671 - DANE Updates and Operational Guidance](https://datatracker.ietf.org/doc/html/rfc7671)
- [RFC 7672 - SMTP Security via DANE TLSA](https://datatracker.ietf.org/doc/html/rfc7672)

