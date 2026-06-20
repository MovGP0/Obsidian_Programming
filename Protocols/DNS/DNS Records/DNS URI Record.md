---
title: DNS URI Record
---
# DNS URI Record

A `URI` record publishes a URI target for a service name.

## Where it fits

Use URI records when a protocol explicitly supports DNS URI lookup for service discovery. It is less commonly deployed than [[DNS SRV Records|SRV]] or [[DNS HTTPS and SVCB Records|HTTPS/SVCB]].

## Example

```dns
_ftp._tcp.example.com. 3600 IN URI 10 1 "ftp://ftp.example.com/public"
```

## Fields

| Field | Meaning |
| --- | --- |
| Priority | Lower values are preferred |
| Weight | Relative weight among equal priority records |
| Target | URI string |

## Notes

- URI records point directly at a URI rather than a host and port pair.
- Client support is protocol-specific.
- URI records are not HTTP redirects.

## Official Sources

- [RFC 7553 - The URI DNS Resource Record](https://datatracker.ietf.org/doc/html/rfc7553)

