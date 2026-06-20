---
title: DNS SVCB-compatible record types
---
# DNS SVCB-compatible record types

SVCB-compatible record types use the Service Binding data model. The most visible examples are [[DNS HTTPS and SVCB Records|SVCB and HTTPS]] records.

## Where it fits

Use this concept when a protocol defines a service-specific record type that reuses SVCB parameters such as `alpn`, `port`, address hints, or ECH configuration.

## Examples

```dns
example.com. 300 IN HTTPS 1 svc.example.net. alpn="h2,h3"
_8443._tcp.example.com. 300 IN SVCB 1 svc.example.net. port="8443"
```

## Notes

- `HTTPS` is the SVCB-compatible type for HTTP services.
- `SVCB` is the generic service binding type.
- Future protocol-specific types can use the same parameter registry.

## Official Sources

- [RFC 9460 - Service Binding and Parameter Specification via DNS](https://datatracker.ietf.org/doc/html/rfc9460)
- [IANA Service Binding Parameters](https://www.iana.org/assignments/dns-svcb/dns-svcb.xhtml)

