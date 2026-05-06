---
title: Data Distribution Service (DDS)
---
# DDS

DDS (Data Distribution Service) is an OMG data-centric publish/subscribe standard for distributed real-time systems. Applications exchange typed data samples through topics, data writers, and data readers with detailed QoS policies.

## Where it fits

Use DDS when deterministic communication, peer-to-peer discovery, low latency, typed topics, and fine-grained QoS are central requirements. It is common in robotics, aerospace, defense, simulation, and complex industrial systems.

## Usage Examples

Define a topic type:

```idl
struct MotorState {
    string id;
    double rpm;
    double temperature;
};
```

Publish telemetry:

```text
Topic: MotorState
DataWriter writes { id: "motor-7", rpm: 1480, temperature: 64.2 }
QoS: reliable, keep-last 10
```

Send a command using a command topic:

```text
Topic: MotorCommand
Sample: { id: "motor-7", command: "Start", correlationId: "cmd-99" }
```

Return a command result:

```text
Topic: MotorCommandResult
Sample: { correlationId: "cmd-99", status: "accepted" }
```

Report an error:

```text
Topic: MotorFault
Sample: { id: "motor-7", code: "OVER_TEMP", severity: 2 }
```

## Programming Example

```text
participant = create_domain_participant(domain_id=42)
topic = participant.create_topic("MotorState", MotorState)
writer = publisher.create_datawriter(topic, qos=reliable_keep_last_10)
writer.write(MotorState(id="motor-7", rpm=1480, temperature=64.2))
```

## Notes

- DDS is data-centric: topics have types and QoS, not just byte payloads.
- QoS policies cover reliability, durability, deadline, lifespan, liveliness, ownership, history, and resource limits.
- DDS discovery can remove the need for a central broker.

## Official Sources

- [OMG DDS specification](https://www.omg.org/spec/DDS/)
- [DDS Foundation](https://www.dds-foundation.org/)
