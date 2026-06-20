---
title: Sparkplug B
---
# Sparkplug B

Sparkplug B is an MQTT topic namespace, payload definition, and state-management convention for industrial telemetry. It standardizes how edge nodes and devices publish birth, death, data, command, and state messages over [[MQTT]].

## Where it fits

Use Sparkplug B when MQTT alone is too informal for industrial systems. It is designed for SCADA, gateways, edge nodes, and unified namespace architectures where consumers need consistent metric names, data types, online/offline state, and command topics.

## Usage Examples

Publish edge-node and device birth certificates:

```text
spBv1.0/FactoryA/NBIRTH/PressGateway
spBv1.0/FactoryA/DBIRTH/PressGateway/Press01
```

Publish telemetry changes:

```text
spBv1.0/FactoryA/DDATA/PressGateway/Press01
Payload: metrics = [{ name: "Pressure", float_value: 143.2 }]
```

Write a metric or send a command:

```text
spBv1.0/FactoryA/DCMD/PressGateway/Press01
Payload: metrics = [{ name: "Start", boolean_value: true }]
```

Report offline state with MQTT Last Will:

```text
spBv1.0/STATE/ScadaHostA
Payload: OFFLINE
```

## Programming Example

```text
connect MQTT client with persistent identity
publish NBIRTH for the edge node
publish DBIRTH for each attached device
publish DDATA when metric values change
subscribe to NCMD and DCMD topics
publish NDEATH/DDEATH or configure MQTT Last Will for unexpected disconnects
```

## Notes

- Sparkplug B uses MQTT as transport but adds industrial session semantics.
- The payload is protobuf-based and includes typed metrics.
- Birth messages define the metric catalog consumers use to decode later updates.
- Sequence numbers and rebirth requests help consumers recover from missed state.

## Official Sources

- [Eclipse Sparkplug specification](https://www.eclipse.org/tahu/spec/sparkplug_spec.pdf)
- [Eclipse Tahu project](https://github.com/eclipse-tahu/tahu)
