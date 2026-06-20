---
title: DNSSEC Records
---
# DNSSEC Records

DNSSEC records provide data origin authentication, data integrity, and authenticated denial of existence for DNS data.

## Where it fits

Use DNSSEC when resolvers should be able to validate that DNS answers were signed by the delegated zone and were not modified in transit.

## Main records

| Record | Purpose |
| --- | --- |
| [[DNS DNSKEY Record\|DNSKEY]] | Publishes zone public keys |
| [[DNS DS Record\|DS]] | Delegation signer record in the parent zone |
| [[DNS RRSIG Record\|RRSIG]] | Signature over a record set |
| [[DNS NSEC Record\|NSEC]] | Authenticated denial of existence and next-name proof |
| [[DNS NSEC3 Record\|NSEC3]] | Hashed authenticated denial of existence |
| [[DNS NSEC3 Record\|NSEC3PARAM]] | Parameters for NSEC3 generation |
| [[DNS CDS and CDNSKEY Records\|CDNSKEY]] | Child-to-parent DNSKEY signaling |
| [[DNS CDS and CDNSKEY Records\|CDS]] | Child-to-parent DS signaling |

## Example shape

```dns
example.com. 3600 IN DNSKEY 257 3 13 base64-public-key
example.com. 3600 IN DS 12345 13 2 digest
www.example.com. 300 IN A 192.0.2.10
www.example.com. 300 IN RRSIG A 13 3 300 ...
```

## Validation chain

```text
Root trust anchor
  -> TLD DS / DNSKEY
    -> domain DS / DNSKEY
      -> signed RRset
```

## Security notes

- DNSSEC authenticates DNS data. It does not encrypt DNS queries or answers.
- DNSSEC proves non-existence through `NSEC` or `NSEC3`.
- A validating resolver returns an authenticated answer, an authenticated denial, or a validation failure.
- DNSSEC is required for protocols such as [[DNS TLSA Record|DANE TLSA]] to be meaningful.

## Official Sources

- [RFC 4033 - DNS Security Introduction and Requirements](https://datatracker.ietf.org/doc/html/rfc4033)
- [RFC 4034 - Resource Records for the DNS Security Extensions](https://datatracker.ietf.org/doc/html/rfc4034)
- [RFC 4035 - Protocol Modifications for DNSSEC](https://datatracker.ietf.org/doc/html/rfc4035)
- [RFC 5155 - DNSSEC Hashed Authenticated Denial of Existence](https://datatracker.ietf.org/doc/html/rfc5155)
- [RFC 7344 - Automating DNSSEC Delegation Trust Maintenance](https://datatracker.ietf.org/doc/html/rfc7344)
