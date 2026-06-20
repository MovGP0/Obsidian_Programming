---
title: DNS A Record
---
# DNS A Record

An `A` record maps a DNS name to an IPv4 address.

## Where it fits

Use `A` records for IPv4 reachability. A host that is reachable over both IPv4 and IPv6 commonly has both [[DNS A Record|A]] and [[DNS AAAA Record|AAAA]] records.

## Example

```dns
www.example.com. 300 IN A 192.0.2.10
api.example.com. 300 IN A 192.0.2.20
```

## Lookup result

```text
www.example.com -> 192.0.2.10
```

## Notes

- `A` records contain IPv4 addresses only.
- Multiple `A` records can exist for one name.
- Address selection, failover, and load balancing are client and resolver behaviors; an `A` record itself is only data.
- Use documentation addresses such as `192.0.2.0/24`, `198.51.100.0/24`, and `203.0.113.0/24` in examples.

## Official Sources

- [RFC 1035 - Domain Names Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)
- [RFC 5737 - IPv4 Address Blocks Reserved for Documentation](https://datatracker.ietf.org/doc/html/rfc5737)

