---
title: Matter
---
# Matter

Matter is an IP-based smart-home interoperability standard from the Connectivity Standards Alliance. Devices expose endpoints, clusters, attributes, commands, and events over secure sessions.

## Where it fits

Use Matter for consumer smart-home ecosystems where local interoperability across vendors and controllers matters. It targets domains such as lighting, HVAC, sensors, locks, energy devices, appliances, bridges, and Thread/Wi-Fi/Ethernet connected products.

## Usage Examples

Read an attribute:

```text
Read Endpoint 1, OnOff cluster, OnOff attribute
Response: true
```

Write an attribute:

```text
Write Endpoint 1, LevelControl cluster, CurrentLevel = 128
```

Subscribe to an attribute:

```text
Subscribe Endpoint 1, TemperatureMeasurement cluster, MeasuredValue
MinInterval: 5s
MaxInterval: 300s
```

Send a command:

```text
Invoke Endpoint 1, OnOff cluster, Off command
```

Report an error:

```text
Status: UnsupportedCluster
Status: UnsupportedCommand
Status: ConstraintError
```

## Programming Example

```powershell
chip-tool onoff on 1234 1
chip-tool onoff read on-off 1234 1
chip-tool temperaturemeasurement read measured-value 1234 1
```

## Notes

- Matter uses a strongly defined data model based on endpoints and clusters.
- Controllers commission devices and establish secure operational credentials.
- Thread, Wi-Fi, and Ethernet are common transports; Bluetooth LE is commonly used during commissioning.
- Matter is not a generic industrial telemetry protocol.

## Official Sources

- [Connectivity Standards Alliance Matter](https://csa-iot.org/all-solutions/matter/)
- [Matter handbook](https://handbook.buildwithmatter.com/)
- [Matter SDK repository](https://github.com/project-chip/connectedhomeip)
