---
title: Lightweight Machine to Machine (LwM2M)
---
# LwM2M

LwM2M (Lightweight Machine to Machine) is an OMA device-management and telemetry protocol for IoT devices. It defines a client/server model, security bootstrap, object model, resource operations, observations, and firmware/device management workflows.

## Where it fits

Use LwM2M when devices need more than raw telemetry: onboarding, security credentials, configuration, firmware update, diagnostics, and standardized resources. It usually runs over [[CoAP]].

## Usage Examples

Read a temperature resource:

```text
READ /3303/0/5700
Response: 22.7
```

Observe a value:

```text
OBSERVE /3303/0/5700
Notification: /3303/0/5700 = 22.8
```

Write a setting:

```text
WRITE /3303/0/5601 = 18.0
```

Execute a command-like resource:

```text
EXECUTE /3/0/4
```

Firmware update flow:

```text
WRITE /5/0/1 = <package URI>
EXECUTE /5/0/2
READ /5/0/3
```

Report an error:

```text
4.04 Not Found for unknown object/resource
4.01 Unauthorized for invalid client credentials
```

## Programming Example

```text
bootstrap security credentials
register endpoint with LwM2M server
expose objects /3 Device, /3303 Temperature, /5 Firmware Update
send notifications for observed resources
handle Read, Write, Execute, Discover, and Write-Attributes operations
update registration before lifetime expires
```

## Notes

- Object IDs and resource IDs are central; `/3303/0/5700` is an object/resource path, not a free-form topic.
- Observations provide server-driven telemetry subscriptions.
- Bootstrap and registration are part of the protocol model, unlike plain MQTT.

## Official Sources

- [OMA LightweightM2M specifications](https://oma-knowledge-base.openmobilealliance.org/specifications/lwm2m)
- [OMA LwM2M registry](https://www.openmobilealliance.org/wp/OMNA/LwM2M/LwM2MRegistry.html)
