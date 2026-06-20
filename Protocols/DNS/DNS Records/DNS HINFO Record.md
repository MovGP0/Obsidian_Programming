---
title: DNS HINFO Record
---
# DNS HINFO Record

An `HINFO` record publishes host CPU and operating system information.

## Where it fits

HINFO is mostly historical. Avoid publishing it on public zones unless a specific operational system requires it.

## Example

```dns
host.example.com. 3600 IN HINFO "x86_64" "Linux"
```

## Notes

- HINFO can leak useful fingerprinting information.
- It is not needed for normal address resolution.
- Many public zones intentionally omit it.

## Official Sources

- [RFC 1035 - Domain Names Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)

