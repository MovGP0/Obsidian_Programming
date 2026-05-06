---
title: KNX
---
# KNX

KNX is a building automation standard for field-level control of lighting, blinds, HVAC, sensors, actuators, energy functions, and room automation. Devices communicate through group objects and group addresses.

## Where it fits

Use KNX for building automation projects where certified devices from multiple vendors need to interoperate on a shared installation. KNX TP, RF, IP, and KNX IoT variants cover different physical and IP-based deployments.

## Usage Examples

Read a group value:

```text
GroupValueRead 1/2/10
Response: GroupValueResponse 1/2/10 = 21.5 Cel
```

Write a light command:

```text
GroupValueWrite 1/0/5 = true
```

Write a dimming value:

```text
GroupValueWrite 1/0/6 = 55%
```

Subscribe to group traffic:

```text
Listen for GroupValueWrite and GroupValueResponse on 1/2/*
```

Report an error:

```text
Negative confirmation or missing acknowledgement on the bus
```

## Programming Example

```javascript
await connection.write("1/0/5", true, "DPT1.001");
const temperature = await connection.read("1/2/10", "DPT9.001");
console.log(temperature);
```

## Notes

- Group addresses carry the application-level communication model.
- Datapoint Types define value encoding and meaning.
- Engineering Tool Software (ETS) is normally used to configure devices and group addresses.
- KNX is event-oriented and bus-oriented; it is not a brokered pub/sub system like [[MQTT]].

## Official Sources

- [KNX specifications](https://support.knx.org/hc/en-us/articles/360000040999-KNX-Specifications)
- [KNX Association](https://www.knx.org/)
