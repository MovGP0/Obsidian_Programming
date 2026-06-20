---
title: DNS MX Record
---
# DNS MX Record

An `MX` record publishes the mail exchangers that receive email for a domain.

## Where it fits

Use `MX` records for SMTP delivery. Mail senders query the recipient domain's `MX` records, sort by preference, and connect to the selected mail exchanger.

## Example

```dns
example.com. 3600 IN MX 10 mail1.example.com.
example.com. 3600 IN MX 20 mail2.example.com.
mail1.example.com. 3600 IN A 192.0.2.25
mail2.example.com. 3600 IN A 192.0.2.26
```

Lower preference values are tried first:

```text
10 mail1.example.com
20 mail2.example.com
```

## Notes

- The `MX` target must be a hostname, not an IP address.
- The `MX` target should resolve to `A` or `AAAA` records.
- `MX` says where to deliver mail. SPF, DKIM, and DMARC policies are usually published through [[DNS TXT Record|TXT]] records.
- A domain without `MX` records may still receive mail through address records, but explicit `MX` is the normal configuration.

## Official Sources

- [RFC 5321 - Simple Mail Transfer Protocol](https://datatracker.ietf.org/doc/html/rfc5321)
- [RFC 1035 - Domain Names Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)

