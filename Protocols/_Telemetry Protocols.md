---
title: Telemetry Protocols
---
### Telemetry Protocol Capability Matrix

|Protocol|Query / Response|Subscription / Streaming|Pub/Sub|Device Management|Hierarchical Paths|Binary Efficient|Real-Time QoS|Discovery / Schema|
|---|---|---|---|---|---|---|---|---|
|RFC 8428 SenML|Payload only|Via transport|Via transport|—|partial|yes|depends|weak|
|SSI|yes|limited|limited|limited|yes|yes|low|weak|
|MQTT|limited*|yes|yes|no|topic hierarchy|yes|medium|weak|
|MQTT + Sparkplug B|limited*|yes|yes|partial|structured topics|yes|medium|medium|
|CoAP|yes|yes (Observe)|partial|no|URI paths|yes|medium|weak|
|LwM2M|yes|yes|partial|yes|object/resource paths|yes|medium|strong|
|OPC UA|yes|yes|yes|yes|node graph|yes|high|very strong|
|DDS|yes|yes|yes|partial|topic-centric|yes|very high|strong|
|W3C WoT|yes|yes|partial|partial|URI-based|optional|low/medium|very strong|
|Matter|yes|yes|partial|yes|endpoint/cluster paths|yes|medium|strong|
|BACnet|yes|yes|partial|yes|object/property|medium|medium|medium|
|KNX|limited|yes|multicast|yes|group addresses|yes|medium|medium|
|Modbus|yes|no|no|no|register addressing|yes|low|none|
|gNMI|yes|yes|streaming telemetry|partial|hierarchical paths|yes|high|strong|

|Protocol|Send Commands|Write Settings|RPC / Methods|State Sync|Streaming Control|Reliability/QoS|
|---|---|---|---|---|---|---|
|MQTT|yes|yes|ad-hoc|partial|yes|QoS 0/1/2|
|Sparkplug B|yes|yes|structured metrics|strong|moderate|QoS|
|CoAP|yes|yes|REST-like|moderate|limited|confirmable msgs|
|LwM2M|yes|yes|Execute/Write ops|strong|moderate|good|
|OPC UA|yes|yes|native methods|very strong|good|very strong|
|DDS|yes|yes|distributed objects|strong|excellent|deterministic QoS|
|Matter|yes|yes|cluster commands|strong|moderate|good|
|Modbus|yes|yes|register writes|weak|poor|weak|
|BACnet|yes|yes|object services|medium|moderate|medium|
### Communication Modes

| Model                        | Example               | Semantics               |
| ---------------------------- | --------------------- | ----------------------- |
| Fire-and-forget command      | `device/42/cmd/start` | asynchronous event      |
| Request/response RPC         | `setSpeed(1200)`      | synchronous method call |
| Desired state / digital twin | `"targetTemp": 22`    | declarative convergence |
| Resource write               | `PUT /3303/0/5850`    | modify resource         |
| Streaming control channel    | joystick/control loop | continuous control      |
| Configuration management     | firmware/settings     | persistent state        |
### Usages

| Layer                  | Technology          |
| ---------------------- | ------------------- |
| Edge devices           | CoAP/LwM2M          |
| Gateway                | MQTT bridge         |
| Broker                 | MQTT/Sparkplug B    |
| Industrial integration | OPC UA              |
| Cloud analytics        | Kafka/Timeseries DB |
**Embedded Systems**

| Layer      | Technology           |
| ---------- | -------------------- |
| Telemetry  | MQTT                 |
| Commands   | MQTT RPC topics      |
| State sync | retained topics      |
| Schema     | protobuf/JSON schema |
| Discovery  | custom registry      |
**Industrial Automation**

| Layer       | Technology       |
| ----------- | ---------------- |
| Telemetry   | Sparkplug B      |
| Device mgmt | LwM2M or OPC UA  |
| Control     | OPC UA methods   |
| Real-time   | DDS where needed |

| Requirement                 | Best fit    |
| --------------------------- | ----------- |
| Tiny microcontrollers       | CoAP/LwM2M  |
| Cloud telemetry             | MQTT        |
| Industrial interoperability | OPC UA      |
| Factory telemetry           | Sparkplug B |
| Hard real-time robotics     | DDS         |
| Smart-home ecosystems       | Matter      |

### Architectural categories

|Category|Examples|Main idea|
|---|---|---|
|Resource-oriented REST|CoAP, LwM2M|URI/path-based access|
|Pub/sub telemetry|MQTT, DDS|asynchronous streaming|
|Semantic industrial|OPC UA|typed object graph|
|Simple metrics|SenML|compact measurement serialization|
|Device management|LwM2M|lifecycle + telemetry|
|Legacy industrial|Modbus, BACnet|register/object addressing|
