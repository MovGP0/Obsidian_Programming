---
title: DNS HTTPS and SVCB Records
---
# DNS HTTPS and SVCB Records

`SVCB` and `HTTPS` records publish service binding information: alternative endpoints, protocol hints, port hints, and connection parameters.

## Where it fits

Use `HTTPS` records for HTTPS services and `SVCB` records for other service schemes. They let DNS publish information that clients would otherwise learn after connecting.

## HTTPS example

```dns
example.com. 300 IN HTTPS 1 svc.example.net. alpn="h2,h3" port="443" ipv4hint="192.0.2.10" ipv6hint="2001:db8::10"
```

## Alias mode example

```dns
example.com. 300 IN HTTPS 0 svc.example.net.
```

## Common parameters

| Parameter | Meaning |
| --- | --- |
| `alpn` | Supported application protocols |
| `port` | Alternative port |
| `ipv4hint` | IPv4 address hints |
| `ipv6hint` | IPv6 address hints |
| `ech` | Encrypted ClientHello configuration |
| `mandatory` | Parameters that must be understood |

## Security notes

- `HTTPS` and `SVCB` can help privacy when used with encrypted DNS and ECH, but the record itself is not encryption.
- DNSSEC can authenticate the record data.
- Address hints are hints, not authoritative address records.
- Clients must still validate TLS normally unless another authenticated mechanism such as DANE applies.

## Official Sources

- [RFC 9460 - Service Binding and Parameter Specification via DNS](https://datatracker.ietf.org/doc/html/rfc9460)
- [IANA Service Binding Parameters](https://www.iana.org/assignments/dns-svcb/dns-svcb.xhtml)

