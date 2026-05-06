---
title: Constrained Application Protocol (CoAP)
---
# CoAP

CoAP (Constrained Application Protocol) is a REST-like web transfer protocol for constrained nodes and constrained networks. It uses UDP by default and maps naturally to resources addressed by URIs.

## Where it fits

Use CoAP when embedded devices need HTTP-like resource access with lower overhead. It is common in constrained IoT networks and pairs well with [[SenML]] payloads. [[LwM2M]] builds a device-management model on top of CoAP.

## Usage Examples

Read a value:

```http
GET coap://device-12.local/sensors/temp
Accept: application/json
```

Write a setting:

```http
PUT coap://device-12.local/config/samplePeriod
Content-Format: application/json

{ "seconds": 30 }
```

Send a command:

```http
POST coap://device-12.local/commands/reboot
```

Subscribe to changes with Observe:

```http
GET coap://device-12.local/sensors/temp
Observe: 0
```

Report an error:

```http
4.04 Not Found
Payload: unknown resource /sensors/temp2
```

## Programming Example

```python
import asyncio
from aiocoap import Context, Message, GET

async def main() -> None:
    protocol = await Context.create_client_context()
    request = Message(code=GET, uri="coap://device-12.local/sensors/temp")
    response = await protocol.request(request).response
    print(response.payload.decode())

asyncio.run(main())
```

## Notes

- Confirmable messages provide acknowledgement and retransmission at the CoAP layer.
- Non-confirmable messages reduce overhead for telemetry where occasional loss is acceptable.
- Discovery commonly uses `/.well-known/core`.
- Use DTLS or OSCORE where security is required.

## Official Sources

- [RFC 7252: The Constrained Application Protocol](https://www.rfc-editor.org/rfc/rfc7252.html)
- [RFC 7641: Observing Resources in CoAP](https://www.rfc-editor.org/rfc/rfc7641.html)
