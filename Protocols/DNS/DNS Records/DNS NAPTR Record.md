---
title: DNS NAPTR Record
---
# DNS NAPTR Record

A `NAPTR` record rewrites a domain name into another name or URI using ordered rules. It is used by DDDS-based discovery systems.

## Where it fits

Use `NAPTR` records when a protocol specifies dynamic delegation or rewrite rules. Common examples include ENUM, SIP discovery, and some service-resolution systems.

## Example

```dns
example.com. 3600 IN NAPTR 100 10 "S" "SIP+D2U" "" _sip._udp.example.com.
example.com. 3600 IN NAPTR 100 20 "S" "SIP+D2T" "" _sip._tcp.example.com.
```

This can lead to [[DNS SRV Records|SRV]] lookups:

```text
_sip._udp.example.com SRV
_sip._tcp.example.com SRV
```

## Fields

| Field | Meaning |
| --- | --- |
| Order | Lower values are tried first |
| Preference | Tie-breaker within the same order |
| Flags | Interprets the output, such as service lookup or URI |
| Services | Protocol-specific service identifier |
| Regexp | Rewrite expression |
| Replacement | Replacement domain name |

## Notes

- NAPTR is powerful but not simple; use it only when the consuming protocol requires it.
- NAPTR often chains into SRV and then A/AAAA lookups.
- The meaning of flags and service strings is protocol-specific.

## Official Sources

- [RFC 3403 - DDDS Part Three: The DNS Database](https://datatracker.ietf.org/doc/html/rfc3403)
- [RFC 6116 - The E.164 to URI DDDS Application](https://datatracker.ietf.org/doc/html/rfc6116)

