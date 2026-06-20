---
title: DNS PTR Record
---
# DNS PTR Record

A `PTR` record maps a DNS name to another DNS name. It is most commonly used for reverse DNS.

## Where it fits

Use `PTR` records to map IP addresses back to hostnames under reverse lookup zones such as `in-addr.arpa` for IPv4 and `ip6.arpa` for IPv6.

## IPv4 example

Address:

```text
192.0.2.10
```

Reverse name:

```text
10.2.0.192.in-addr.arpa
```

Record:

```dns
10.2.0.192.in-addr.arpa. 3600 IN PTR www.example.com.
```

## IPv6 example

Address:

```text
2001:db8::10
```

Reverse name uses nibbles under `ip6.arpa`.

## Notes

- Reverse DNS authority usually belongs to the network owner or hosting provider, not necessarily the forward DNS zone owner.
- Email systems often check that forward and reverse DNS are plausible.
- [[DNS-Based Service Discovery]] also uses `PTR` records for service instance enumeration.
- A `PTR` value is a name, not a free-form description.

## Official Sources

- [RFC 1035 - Domain Names Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)
- [RFC 3596 - DNS Extensions to Support IP Version 6](https://datatracker.ietf.org/doc/html/rfc3596)
