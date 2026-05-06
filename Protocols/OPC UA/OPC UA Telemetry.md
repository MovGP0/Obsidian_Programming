---
title: OPC UA Telemetry
---
# OPC UA Telemetry

OPC UA is an industrial interoperability architecture with a typed address space, services, security model, subscriptions, events, methods, historical access, and multiple transport mappings.

## Where it fits

Use OPC UA when clients need rich machine semantics, browsable structure, typed variables, alarms/events, methods, and strong interoperability across industrial systems. It is usually heavier than [[MQTT]] or [[CoAP]], but it carries much more meaning.

## Usage Examples

Read a value:

```text
Read NodeId ns=2;s=Machine/Press01/Temperature
Value: 82.4 Cel
```

Write a setting:

```text
Write NodeId ns=2;s=Machine/Press01/TargetPressure
Value: 140.0
```

Subscribe to data changes:

```text
CreateSubscription publishingInterval=1000 ms
CreateMonitoredItems ns=2;s=Machine/Press01/Temperature
Publish notifications as values change
```

Call a command method:

```text
Call ObjectId ns=2;s=Machine/Press01
MethodId ns=2;s=Machine/Press01/StartCycle
InputArguments: batchId = "B-4711"
```

Report an alarm/event:

```text
EventType: TripAlarmType
SourceName: Press01
Severity: 900
Message: Hydraulic pressure too high
```

Return an error:

```text
StatusCode: BadUserAccessDenied
StatusCode: BadNodeIdUnknown
StatusCode: BadOutOfRange
```

## Programming Example

```python
import asyncio
from asyncua import Client

async def main() -> None:
    async with Client("opc.tcp://localhost:4840") as client:
        node = client.get_node("ns=2;s=Machine/Press01/Temperature")
        value = await node.read_value()
        print(value)

asyncio.run(main())
```

## Notes

- The address space is a graph of nodes and references, not just a path tree.
- Subscriptions and monitored items are the normal telemetry mechanism.
- Methods model commands with typed arguments and status results.
- OPC UA PubSub can publish datasets over UDP, MQTT, and other mappings for telemetry fan-out.

## Official Sources

- [OPC UA Online Reference](https://reference.opcfoundation.org/)
- [OPC Foundation Unified Architecture specifications](https://opcfoundation.org/developer-tools/specifications-unified-architecture)
