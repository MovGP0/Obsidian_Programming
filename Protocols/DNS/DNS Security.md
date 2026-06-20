---
title: DNS Security
---
**DNS security** is easy to mix up because encryption, authentication, and authorization are separate concerns.

## Encryption

Encryption protects DNS traffic in transit between a client and a resolver, or between resolvers and authoritative servers when supported.

Common encrypted DNS transports:

| Mechanism | Transport | Purpose |
| --- | --- | --- |
| DoT | DNS over TLS | DNS queries over TLS on port `853` |
| DoH | DNS over HTTPS | DNS queries over HTTPS |
| DoQ | DNS over QUIC | DNS queries over QUIC |

Encryption hides query contents from passive observers on that transport segment, but the resolver still sees the query.

## Authentication

Authentication in DNS usually means authenticating DNS data, not authenticating users.

DNSSEC provides:

- data origin authentication
- data integrity
- authenticated denial of existence

DNSSEC does not provide:

- confidentiality
- user authentication for ordinary DNS lookups
- authorization decisions for who may read public DNS data

## Authorization

DNS does not have a general authorization model for ordinary public lookups. Most public DNS data is readable by anyone.

Authorization appears around DNS in narrower ways:

| Area | Authorization mechanism |
| --- | --- |
| Zone administration | Registrar, DNS provider, API keys, RBAC, change approval |
| Zone transfer | TSIG, ACLs, server configuration |
| Dynamic updates | TSIG, SIG(0), update policy |
| Certificate issuance | [[DNS CAA Record]] policy checked by certificate authorities |
| Email sending policy | [[DNS SPF Policy|SPF]], [[DNS DKIM Record|DKIM]], and [[DNS DMARC Record|DMARC]] records constrain how other systems should treat mail |
| Service-specific trust | [[DNS TLSA Record]], [[DNS SSHFP Record]], [[DNS S-MIMEA Record]], [[DNS OPENPGPKEY Record]], and DNSSEC-validated records |

## TSIG and dynamic DNS

TSIG authenticates DNS messages with a shared secret. It is commonly used for zone transfers and dynamic DNS updates between trusted systems.

Dynamic DNS update lets authorized clients update DNS records without editing a zone file directly.

## Common combinations

Encrypted DNS without DNSSEC:

```text
Client -> encrypted resolver path
Resolver answer is not cryptographically validated by DNSSEC
```

DNSSEC without encrypted DNS:

```text
Client/resolver can validate answer integrity
Query contents may still be visible on the network
```

Encrypted DNS with DNSSEC validation:

```text
Transport privacy + authenticated DNS data
```

DNSSEC-backed DANE:

```text
DNSSEC validates TLSA
TLSA authenticates service certificate or key association
```

Email policy:

```text
SPF authorizes sending hosts
DKIM authenticates signed message content
DMARC authorizes receiver handling policy based on aligned SPF or DKIM
```

## Notes

- DoT, DoH, and DoQ protect transport privacy; they do not make false DNS data true.
- DNSSEC protects data integrity and origin; it does not hide queries.
- CAA authorizes certificate authorities to issue certificates; it does not authorize end users to access a service.
- SPF, DKIM, and DMARC are authorization and authentication policies for email handling, not general DNS access controls.
- DNS provider account security is part of DNS authorization in practice, even though it is outside the DNS wire protocol.

## Official Sources

- [RFC 4033 - DNS Security Introduction and Requirements](https://datatracker.ietf.org/doc/html/rfc4033)
- [RFC 4034 - Resource Records for DNS Security Extensions](https://datatracker.ietf.org/doc/html/rfc4034)
- [RFC 4035 - Protocol Modifications for DNSSEC](https://datatracker.ietf.org/doc/html/rfc4035)
- [RFC 7858 - DNS over TLS](https://datatracker.ietf.org/doc/html/rfc7858)
- [RFC 8484 - DNS Queries over HTTPS](https://datatracker.ietf.org/doc/html/rfc8484)
- [RFC 9250 - DNS over Dedicated QUIC Connections](https://datatracker.ietf.org/doc/html/rfc9250)
- [RFC 2845 - Secret Key Transaction Authentication for DNS](https://datatracker.ietf.org/doc/html/rfc2845)
- [RFC 2136 - Dynamic Updates in the DNS](https://datatracker.ietf.org/doc/html/rfc2136)
- [RFC 7208 - Sender Policy Framework](https://datatracker.ietf.org/doc/html/rfc7208)
- [RFC 6376 - DomainKeys Identified Mail Signatures](https://datatracker.ietf.org/doc/html/rfc6376)
- [RFC 7489 - DMARC](https://datatracker.ietf.org/doc/html/rfc7489)
