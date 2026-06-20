---
title: DNS RP Record
---
# DNS RP Record

An `RP` record publishes a responsible person mailbox and optional TXT name for a DNS owner.

## Where it fits

Use RP records only when a system explicitly consumes DNS-hosted responsibility metadata. They are uncommon.

## Example

```dns
example.com. 3600 IN RP hostmaster.example.com. contact-info.example.com.
contact-info.example.com. 3600 IN TXT "DNS operations contact"
```

The mailbox `hostmaster.example.com.` represents:

```text
hostmaster@example.com
```

## Notes

- The first field encodes an email address as a DNS name.
- The second field can point to a TXT record with additional information.
- RP records can expose operational contact details.

## Official Sources

- [RFC 1183 - New DNS RR Definitions](https://datatracker.ietf.org/doc/html/rfc1183)

