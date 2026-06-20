---
title: DNS LOC Record
---
# DNS LOC Record

A `LOC` record publishes geographic location information for a DNS name.

## Where it fits

Use LOC records only when a system explicitly needs DNS-published location data. They are uncommon on the public internet.

## Example

```dns
example.com. 3600 IN LOC 48 12 0.000 N 16 22 0.000 E 200.00m
```

## Notes

- LOC can reveal sensitive physical-location information.
- Do not publish precise location data unless that exposure is intentional.
- LOC is unrelated to geolocation databases that infer location from IP addresses.

## Official Sources

- [RFC 1876 - A Means for Expressing Location Information in the DNS](https://datatracker.ietf.org/doc/html/rfc1876)

