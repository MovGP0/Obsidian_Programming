---
title: DNS Records
---
# DNS Records

DNS records are typed data attached to DNS names. Clients ask for a name and record type; authoritative servers answer from a zone.

## Address and alias records

| Record | Purpose |
| --- | --- |
| [[DNS A Record]] | Maps a name to an IPv4 address |
| [[DNS AAAA Record]] | Maps a name to an IPv6 address |
| [[DNS CNAME Record]] | Creates an alias to another canonical name |
| [[DNS PTR Record]] | Maps an address-derived reverse DNS name back to a hostname |

## Zone and delegation records

| Record | Purpose |
| --- | --- |
| [[DNS NS Record]] | Delegates a zone to authoritative name servers |
| [[DNS SOA Record]] | Defines zone authority and zone timing metadata |

## Mail and domain policy records

| Record or policy | Purpose |
| --- | --- |
| [[DNS MX Record]] | Publishes mail exchangers for a domain |
| [[DNS TXT Record]] | Stores text metadata used by protocols such as SPF, DKIM, DMARC, ACME, and verification systems |
| [[DNS SPF Policy]] | Authorizes which hosts may send mail for a domain |
| [[DNS DKIM Record]] | Publishes DKIM public keys for mail signature verification |
| [[DNS DMARC Record]] | Publishes domain mail authentication policy and reporting addresses |
| [[DNS CAA Record]] | Restricts which certificate authorities may issue certificates for a domain |

## Service and application records

| Record | Purpose |
| --- | --- |
| [[DNS SRV Records]] | Maps a service name to target host, port, priority, and weight |
| [[DNS TLSA Record]] | Publishes DANE TLS certificate or public-key associations |
| [[DNS HTTPS and SVCB Records]] | Publishes service endpoints and connection hints |
| [[DNS SSHFP Record]] | Publishes SSH host-key fingerprints |
| [[DNS NAPTR Record]] | Rewrites names for URI and service discovery systems |
| [[DNS URI Record]] | Publishes URI targets for a service name |
| [[DNS CERT Record]] | Publishes certificates or certificate-related data |
| [[DNS S-MIMEA Record]] | Publishes S/MIME certificate associations |
| [[DNS OPENPGPKEY Record]] | Publishes OpenPGP public keys for email addresses |

## DNSSEC records

| Record | Purpose |
| --- | --- |
| [[DNSSEC Records]] | Publishes signatures, keys, and authenticated denial of existence |
| [[DNS DNSKEY Record]] | Publishes DNSSEC public keys for a zone |
| [[DNS DS Record]] | Links a child zone's DNSKEY to the parent zone |
| [[DNS RRSIG Record]] | Carries DNSSEC signatures over RRsets |
| [[DNS NSEC Record]] | Proves non-existence and next-name ordering |
| [[DNS NSEC3 Record]] | Proves non-existence with hashed owner names |
| [[DNS CDS and CDNSKEY Records]] | Lets a child zone signal DS/DNSKEY updates to the parent |

## Operational and less-common records

| Record | Purpose |
| --- | --- |
| [[DNS LOC Record]] | Publishes geographic location data |
| [[DNS HINFO Record]] | Publishes host CPU and OS information |
| [[DNS RP Record]] | Publishes a responsible person contact |
| [[DNS SVCB-compatible record types\|SVCB-compatible records]] | Record families that carry service binding style data |

## Security model

DNS security has several layers:

- [[DNS Security|Encryption]] protects DNS queries in transit with protocols such as DoT, DoH, and DoQ.
- [[DNS Security|Authentication]] is usually about data origin authentication and integrity. DNSSEC signs DNS data so resolvers can validate that an answer came from the delegated zone and was not modified.
- [[DNS Security|Authorization]] is usually policy expressed through DNS records or server access controls. DNS itself does not have a general user authorization model for normal lookups.

## Notes

- Record names are owner names. Record types describe the shape and purpose of the data.
- TTL controls cache lifetime.
- A single owner name can have multiple records of the same type, depending on the record.
- DNS names and record values often end with a trailing dot in zone files to mark absolute names.

## Official Sources

- [RFC 1034 - Domain Names Concepts and Facilities](https://datatracker.ietf.org/doc/html/rfc1034)
- [RFC 1035 - Domain Names Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)
- [IANA DNS Parameters](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml)
