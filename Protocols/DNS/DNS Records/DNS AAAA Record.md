---
title: DNS AAAA Record
---
# DNS AAAA Record

An `AAAA` record maps a DNS name to an IPv6 address.

## Where it fits

Use `AAAA` records for IPv6 reachability. Dual-stack services commonly publish both [[DNS A Record|A]] and `AAAA` records.

## Example

```dns
www.example.com. 300 IN AAAA 2001:db8::10
api.example.com. 300 IN AAAA 2001:db8::20
```

## Lookup result

```text
www.example.com -> 2001:db8::10
```

## Notes

- `AAAA` records contain IPv6 addresses only.
- Multiple `AAAA` records can exist for one name.
- Clients often use address-selection algorithms such as Happy Eyeballs when both `A` and `AAAA` records are present.
- Use `2001:db8::/32` for documentation examples.

## Official Sources

- [RFC 3596 - DNS Extensions to Support IP Version 6](https://datatracker.ietf.org/doc/html/rfc3596)
- [RFC 3849 - IPv6 Address Prefix Reserved for Documentation](https://datatracker.ietf.org/doc/html/rfc3849)
- [RFC 8305 - Happy Eyeballs Version 2](https://datatracker.ietf.org/doc/html/rfc8305)

