---
title: DNS DMARC Record
---
# DNS DMARC Record

A DMARC record publishes email authentication policy and reporting addresses for a domain.

## Where it fits

Use DMARC to tell receivers how to handle mail that fails SPF and DKIM alignment checks, and where to send aggregate or forensic reports.

## Name format

```text
_dmarc.<domain>
```

## Example

```dns
_dmarc.example.com. 3600 IN TXT "v=DMARC1; p=reject; rua=mailto:dmarc@example.com; adkim=s; aspf=s"
```

## Common tags

| Tag | Meaning |
| --- | --- |
| `v` | Version, `DMARC1` |
| `p` | Policy for the domain: `none`, `quarantine`, or `reject` |
| `sp` | Subdomain policy |
| `rua` | Aggregate report destinations |
| `ruf` | Failure report destinations |
| `adkim` | DKIM alignment mode |
| `aspf` | SPF alignment mode |
| `pct` | Percentage of mail to which policy applies |

## Notes

- DMARC policy is a DNS `TXT` record.
- DMARC evaluates alignment with the visible RFC5322 From domain.
- DMARC depends on [[DNS SPF Policy|SPF]] or [[DNS DKIM Record|DKIM]] passing with alignment.
- Start with `p=none` for monitoring before enforcing quarantine or reject.

## Official Sources

- [RFC 7489 - DMARC](https://datatracker.ietf.org/doc/html/rfc7489)
- [RFC 9989 - DMARCbis](https://www.rfc-editor.org/info/rfc9989)

