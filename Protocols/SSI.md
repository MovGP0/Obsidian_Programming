---
title: " Simple Sensor Interface (SSI)"
---
# SSI - Simple Sensor Interface

SSI here refers to the historical Simple Sensor Interface protocol for small sensor devices. It should not be confused with Synchronous Serial Interface, which is a different industrial sensor electrical/interface convention.

## Where it fits

Simple Sensor Interface is a compact request/response and streaming protocol for smart sensors, commonly described over UART or nanoIP-style networking. I could not identify a stable current official specification site, so treat this page as a historical protocol note rather than a recommendation for new designs.

## Usage Examples

Discover sensors:

```text
Client -> Sensor: C
Sensor -> Client: N <sensor-description>
```

Query metadata:

```text
Client -> Sensor: Q
Sensor -> Client: A <capabilities>
```

Read a value:

```text
Client -> Sensor: R <sensor-id>
Sensor -> Client: V <sensor-id> <value> <unit>
```

Set configuration:

```text
Client -> Sensor: S <sensor-id> <config-key> <config-value>
Sensor -> Client: D <status>
```

Create a streaming observer:

```text
Client -> Sensor: O <sensor-id> <interval-ms>
Sensor -> Client: Y <observer-id>
Sensor -> Client: M <observer-id> <value-1> <value-2>
```

Report an error:

```text
Sensor -> Client: E <code> <detail>
```

## Programming Example

```python
def frame(command: bytes, payload: bytes = b"") -> bytes:
    body = command + payload
    length = len(body).to_bytes(2, "big")
    negated = bytes((~b) & 0xFF for b in length)
    return b"\xFE" + length + negated + body

print(frame(b"R", b"\x01").hex())
```

## Notes

- Lowercase command variants are commonly described as CRC-protected variants.
- The protocol model includes discovery, read, configuration, observer/listener streaming, reset, and error messages.
- For new constrained-device designs, [[CoAP]] plus [[SenML]] or [[LwM2M]] is usually easier to source and standardize.

## Sources

- [Simple Sensor Interface protocol overview](https://en.wikipedia.org/wiki/Simple_Sensor_Interface_protocol)
- [nanoIP historical reference](http://www.cwc.oulu.fi/nanoip/)
