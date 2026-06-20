---
title: DNS CNAME Record
---
# DNS CNAME Record

A `CNAME` record aliases one DNS name to another canonical DNS name.

## Where it fits

Use `CNAME` when one name should follow another name's records. It is common for application aliases, CDN names, and managed service targets.

## Example

```dns
docs.example.com. 300 IN CNAME example-docs.hosting.example.net.
```

A client looking for `docs.example.com A` follows the alias and then resolves:

```text
example-docs.hosting.example.net A
```

## Notes

- A `CNAME` owner name normally cannot have other record types at the same owner name.
- Do not put a `CNAME` at a zone apex if the zone also needs `SOA`, `NS`, and other apex records.
- Some DNS providers offer non-standard `ALIAS`, `ANAME`, or flattened records to emulate CNAME-like behavior at the apex.
- `CNAME` does not redirect HTTP paths. It only aliases DNS names.

## Official Sources

- [RFC 1034 - Domain Names Concepts and Facilities](https://datatracker.ietf.org/doc/html/rfc1034)
- [RFC 1035 - Domain Names Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)

