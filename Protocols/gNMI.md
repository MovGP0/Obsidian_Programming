---
title: gRPC Network Management Interface (gNMI)
---
# gNMI

gNMI (gRPC Network Management Interface) is a gRPC/protobuf protocol for network device configuration and telemetry. It supports capabilities discovery, Get, Set, and Subscribe operations against hierarchical schema paths, commonly OpenConfig YANG paths.

## Where it fits

Use gNMI for network automation and streaming telemetry from routers, switches, and other infrastructure devices. It is schema-oriented, path-based, and designed to combine configuration and telemetry in one service.

## Usage Examples

Discover capabilities:

```text
CapabilityRequest
CapabilityResponse: supported models, encodings, gNMI version
```

Read state:

```text
Get /interfaces/interface[name=Ethernet1]/state/counters/in-octets
Encoding: JSON_IETF
```

Write configuration:

```text
Set update /interfaces/interface[name=Ethernet1]/config/description = "uplink to core-1"
```

Delete configuration:

```text
Set delete /interfaces/interface[name=Ethernet1]/subinterfaces/subinterface[index=100]
```

Subscribe to telemetry:

```text
Subscribe STREAM /interfaces/interface/state/counters sample_interval=10s
```

Handle an error:

```text
gRPC status: PermissionDenied
gNMI path error: unknown path element or invalid value
```

## Programming Example

```powershell
gnmic -a switch-1.example:57400 --tls-ca ca.pem capabilities
gnmic -a switch-1.example:57400 --tls-ca ca.pem get --path /interfaces/interface[name=Ethernet1]/state/oper-status
gnmic -a switch-1.example:57400 --tls-ca ca.pem subscribe --path /interfaces/interface/state/counters --stream-mode sample --sample-interval 10s
```

## Notes

- gNMI paths are hierarchical and may include keyed list elements.
- `Get` retrieves snapshots, `Set` modifies configuration, and `Subscribe` streams telemetry.
- TLS and RPC authorization are expected in production deployments.
- Payload encodings include JSON, JSON_IETF, bytes, protobuf, and ASCII depending on target support.

## Official Sources

- [OpenConfig gNMI specification](https://www.openconfig.net/docs/gnmi/gnmi-specification/)
- [OpenConfig gNMI repository](https://github.com/openconfig/gnmi)
