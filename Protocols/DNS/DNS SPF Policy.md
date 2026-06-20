---
title: DNS SPF Policy
---
# DNS SPF Policy

SPF is an email-sending authorization policy published in DNS. Modern SPF records are DNS `TXT` records whose value starts with `v=spf1`.

## Where it fits

Use SPF to state which hosts are authorized to send SMTP mail using a domain in the envelope sender identity.

## Example

```dns
example.com. 3600 IN TXT "v=spf1 ip4:192.0.2.0/24 include:_spf.example.net -all"
```

## Common mechanisms

| Mechanism | Meaning |
| --- | --- |
| `ip4` / `ip6` | Authorize address ranges |
| `a` | Authorize addresses from A/AAAA lookups |
| `mx` | Authorize mail exchanger addresses |
| `include` | Include another domain's SPF policy |
| `exists` | Match if a DNS name exists |
| `all` | Final catch-all mechanism |

## Qualifiers

| Qualifier | Result |
| --- | --- |
| `+` | Pass |
| `-` | Fail |
| `~` | SoftFail |
| `?` | Neutral |

## Notes

- SPF is published as `TXT`; the dedicated SPF RR type 99 is obsolete for SPF policy publication.
- SPF checks SMTP envelope identity, not necessarily the visible `From:` header.
- [[DNS DMARC Record|DMARC]] uses SPF alignment with the visible From domain as part of its policy decision.
- SPF has DNS lookup limits; avoid deep include chains.

## Official Sources

- [RFC 7208 - Sender Policy Framework](https://datatracker.ietf.org/doc/html/rfc7208)
