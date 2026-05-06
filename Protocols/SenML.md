---
title: Sensor Measurement Lists (RFC 8428 SenML)
---
# RFC 8428 SenML

SenML (Sensor Measurement Lists) is a compact payload format for sensor measurements and actuator values. It is not a transport protocol; it is usually carried over [[CoAP]], [[MQTT]], HTTP, or another application protocol.

## Where it fits

Use SenML when the main problem is representing small measurement records consistently. It is a good fit for constrained devices that need compact JSON, CBOR, XML, or EXI payloads and only need weak built-in discovery.

## Usage Examples

Read a temperature value over CoAP:

```http
GET coap://sensor-17.example/senml
```

Example JSON response:

```json
[
  { "bn": "urn:dev:mac:0024befffe804ff1/", "bt": 1715000000, "n": "temperature", "u": "Cel", "v": 22.7 },
  { "n": "humidity", "u": "%RH", "v": 45.2 }
]
```

Publish measurements over MQTT:

```text
Topic: building/1/room/203/senml
Payload: [{"bn":"room203/","n":"co2","u":"ppm","v":612}]
```

Write an actuator target:

```http
PUT coap://thermostat-4.example/target
Content-Format: application/senml+json

[{"n":"targetTemperature","u":"Cel","v":21.5}]
```

Represent a status or error value:

```json
[{ "bn": "pump-2/", "n": "status", "vs": "sensor-fault" }]
```

## Programming Example

```python
import json
import time

payload = [
    {
        "bn": "urn:dev:mac:0024befffe804ff1/",
        "bt": int(time.time()),
        "n": "temperature",
        "u": "Cel",
        "v": 22.7,
    }
]

print(json.dumps(payload, separators=(",", ":")))
```

## Notes

- SenML solves data representation, not device management.
- Use CBOR SenML when bandwidth and parsing cost matter.
- Use stable names and units; consumers should not infer semantics from transport topics alone.

## Official Sources

- [RFC 8428: Sensor Measurement Lists (SenML)](https://www.rfc-editor.org/rfc/rfc8428.html)
