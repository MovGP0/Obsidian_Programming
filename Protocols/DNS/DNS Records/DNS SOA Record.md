---
title: DNS SOA Record
---
# DNS SOA Record

An `SOA` record marks the start of authority for a DNS zone and stores zone-level timing metadata.

## Where it fits

Every authoritative zone has one `SOA` record at the zone apex. Secondary servers and resolvers use its fields for zone transfer and negative caching behavior.

## Example

```dns
example.com. 3600 IN SOA ns1.example.com. hostmaster.example.com. (
  2026062001 ; serial
  3600       ; refresh
  900        ; retry
  1209600    ; expire
  300        ; minimum / negative cache TTL
)
```

## Fields

| Field | Meaning |
| --- | --- |
| Primary name server | Main authoritative server for the zone |
| Responsible mailbox | Contact mailbox with `.` replacing `@` |
| Serial | Zone version number |
| Refresh | How often secondaries check for changes |
| Retry | Retry interval after failed refresh |
| Expire | When secondaries stop serving stale zone data |
| Minimum | Historically minimum TTL; now used for negative caching TTL behavior |

## Notes

- Increment the serial when zone contents change.
- The responsible mailbox is encoded as a DNS name, for example `hostmaster.example.com.` means `hostmaster@example.com`.
- Negative answers include the zone's `SOA` so resolvers know how long to cache non-existence.

## Official Sources

- [RFC 1035 - Domain Names Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)
- [RFC 2308 - Negative Caching of DNS Queries](https://datatracker.ietf.org/doc/html/rfc2308)

