---
title: MQTT
---
# MQTT

MQTT is a lightweight publish/subscribe messaging protocol. Clients connect to a broker, publish messages to topics, and subscribe to topic filters.

## Where it fits

Use MQTT when the main requirement is asynchronous telemetry and command delivery through a broker. It is not a semantic device model by itself; topic design, payload schema, retained messages, and birth/death conventions must be designed separately or provided by [[Sparkplug B]].

## Usage Examples

Publish telemetry:

```text
Topic: site/a/line/3/motor/7/telemetry/speed
QoS: 1
Payload: { "rpm": 1480, "ts": "2026-05-06T13:20:00Z" }
```

Subscribe to a group of values:

```text
site/a/line/+/motor/+/telemetry/#
```

Write desired state:

```text
Topic: site/a/line/3/motor/7/desired
Payload: { "targetRpm": 1200 }
Retain: true
```

Send a command and return a result:

```text
Topic: site/a/line/3/motor/7/cmd/start
Payload: { "correlationId": "f6d8" }

Topic: site/a/line/3/motor/7/cmd-result/f6d8
Payload: { "status": "accepted" }
```

Report an error:

```text
Topic: site/a/line/3/motor/7/event/error
Payload: { "code": "OVER_CURRENT", "severity": "trip" }
```

## Programming Example

```python
import json
import paho.mqtt.client as mqtt

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.connect("broker.example", 1883)
client.publish(
    "site/a/line/3/motor/7/telemetry/speed",
    json.dumps({"rpm": 1480}),
    qos=1,
)
client.disconnect()
```

## Notes

- QoS 0 means best effort, QoS 1 means at least once, QoS 2 means exactly once at the MQTT protocol level.
- Retained messages are useful for desired state and last-known values.
- Last Will and Testament messages are the usual MQTT mechanism for unexpected client disconnects.
- MQTT 5 adds message expiry, response topics, correlation data, user properties, and reason codes.

## Official Sources

- [MQTT Version 5.0 - OASIS Standard](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html)
- [MQTT specifications overview](https://mqtt.org/mqtt-specification/)
