---
title: Service Discovery
---
**Service discovery** is the set of mechanisms a client uses to find a service without hard-coding every host, port, and endpoint URL.

## Where it fits

Use service discovery when endpoints move, devices appear dynamically, or a client needs to find a service by role instead of by fixed address. Discovery answers questions such as:

```text
Which printers are available here?
Which OPC UA servers are on this subnet?
Where is the LDAP service for this domain?
Which SOAP devices match this type?
```

## Main families

| Mechanism | Scope | Main model | Good fit |
| --- | --- | --- | --- |
| [[Multicast DNS]] | Local link | DNS names over multicast | Resolving `.local` names without a DNS server |
| [[DNS-Based Service Discovery]] | Local link or DNS domain | DNS `PTR`, `SRV`, `TXT`, `A`, `AAAA` records | Publishing service instances |
| [[DNS SRV Records]] | DNS domain | Service name to host and port | Domain-managed service location |
| [[Simple Service Discovery Protocol]] | Local network | HTTP-like UDP search and advertisement | UPnP device discovery |
| [[Universal Plug and Play]] | Local network | Device description, services, control, eventing | Consumer devices, routers, media devices |
| [[OPC UA Discovery]] | Local, subnet, or administrative domain | LDS, LDS-ME, GDS, DNS-SD | Industrial OPC UA endpoint discovery |
| [[Service Location Protocol]] | Local network or managed scope | Service Agents, User Agents, Directory Agents | Older enterprise LAN discovery |
| [[WS-Discovery]] | Local network or discovery proxy | SOAP-over-UDP probes and announcements | Web services and devices |
| [[Universal Description Discovery and Integration]] | Registry | XML web service registry | Legacy SOA service registry |

## Discovery versus registry

Discovery is usually dynamic and near the service:

```text
Client -> multicast query
Service -> I am here
```

A registry is usually an explicit authority:

```text
Service -> register metadata
Client -> query registry
Registry -> matching services
```

The boundary is not absolute. DNS-SD can be multicast on a local link or backed by unicast DNS. OPC UA supports local discovery and a Global Discovery Server. WS-Discovery can use multicast directly or a discovery proxy.

## Selection notes

- Use [[DNS-Based Service Discovery]] when the service can be described as instance name, host, port, and compact metadata.
- Use [[Universal Plug and Play]] when the device model, service descriptions, control URLs, and event subscriptions matter.
- Use [[DNS SRV Records]] when service location belongs in normal DNS and should work beyond one subnet.
- Use [[OPC UA Discovery]] for industrial OPC UA systems because the final trust and endpoint selection still belong to OPC UA.
- Use [[WS-Discovery]] when interoperating with WS-* or DPWS style devices.
- Treat [[Service Location Protocol]] and [[Universal Description Discovery and Integration]] as mostly legacy unless a specific environment still depends on them.

## Security notes

Discovery protocols often reveal hostnames, service names, model names, versions, paths, and network structure. Do not treat discovery as authentication. Use the real protocol security layer after discovery: TLS, OPC UA application certificates, access control, signed service metadata, or network segmentation.

## Official Sources

- [RFC 6762 - Multicast DNS](https://datatracker.ietf.org/doc/html/rfc6762)
- [RFC 6763 - DNS-Based Service Discovery](https://datatracker.ietf.org/doc/html/rfc6763)
- [RFC 2782 - DNS SRV](https://datatracker.ietf.org/doc/html/rfc2782)
- [UPnP Device Architecture 2.0](https://openconnectivity.org/upnp-specs/UPnP-arch-DeviceArchitecture-v2.0-20200417.pdf)
- [OASIS WS-Discovery 1.1](https://docs.oasis-open.org/ws-dd/discovery/1.1/os/wsdd-discovery-1.1-spec-os.html)
