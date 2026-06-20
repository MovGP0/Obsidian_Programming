---
title: DNS OPENPGPKEY Record
---
# DNS OPENPGPKEY Record

An `OPENPGPKEY` record publishes an OpenPGP public key for an email address.

## Where it fits

Use OPENPGPKEY when software supports discovering OpenPGP keys through DNS and DNSSEC validation is available.

## Name format

The owner name is based on a hash of the local part:

```text
<hash>._openpgpkey.<domain>
```

## Example shape

```dns
hash._openpgpkey.example.com. 3600 IN OPENPGPKEY base64-openpgp-key
```

## Notes

- DNSSEC is needed if the DNS answer is used as an authenticated key source.
- Publishing keys in DNS can reveal address existence and key material metadata.
- WKD is another common OpenPGP key discovery mechanism outside DNS record lookup.

## Official Sources

- [RFC 7929 - DNS-Based Authentication of Named Entities for OpenPGP](https://datatracker.ietf.org/doc/html/rfc7929)

