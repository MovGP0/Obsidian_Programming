---
title: DNS NS Record
---
# DNS NS Record

An `NS` record identifies authoritative name servers for a zone or delegated child zone.

## Where it fits

Use `NS` records to define who is authoritative for DNS data. Parent zones use `NS` records to delegate child zones. Zones also contain their own authoritative `NS` records.

## Example

At the parent zone:

```dns
example.com. 86400 IN NS ns1.example.net.
example.com. 86400 IN NS ns2.example.net.
```

If the name server is inside the delegated zone, parent-side glue address records are needed:

```dns
example.com. 86400 IN NS ns1.example.com.
ns1.example.com. 86400 IN A 192.0.2.53
```

## Notes

- `NS` records delegate authority; they are not general load balancer records.
- Parent and child `NS` data should be kept consistent.
- Glue records are address records supplied by the parent so resolvers can reach in-bailiwick name servers.
- DNSSEC delegations also use [[DNSSEC Records|DS]] records at the parent.

## Official Sources

- [RFC 1034 - Domain Names Concepts and Facilities](https://datatracker.ietf.org/doc/html/rfc1034)
- [RFC 1035 - Domain Names Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)

