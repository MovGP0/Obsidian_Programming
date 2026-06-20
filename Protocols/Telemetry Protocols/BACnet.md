---
title: BACnet
---
# BACnet

BACnet is a building automation and control networking protocol standardized as ASHRAE Standard 135. It models equipment as objects with properties and services for reading, writing, alarming, scheduling, trending, and device management.

## Where it fits

Use BACnet for HVAC, lighting, access control, fire, elevator, and other building automation integrations. It is strongest where vendor-independent interoperability between building controllers and supervisory systems is required.

## Usage Examples

Read a property:

```text
ReadProperty analog-input,1 present-value
Response: 22.7
```

Write a commandable property:

```text
WriteProperty analog-output,3 present-value = 45.0 priority = 8
```

Subscribe to changes:

```text
SubscribeCOV analog-input,1 confirmed=false lifetime=600
COVNotification present-value = 22.8
```

Send a command:

```text
WriteProperty binary-output,2 present-value = active priority = 8
```

Return an error:

```text
Error class: property
Error code: unknown-property
```

## Programming Example

```python
# Read analog-input 1 present-value from device 1001.
request = "1001 analog-input 1 present-value"
# Application-specific BACnet stack sends ReadProperty and decodes the response.
```

## Notes

- BACnet objects include Analog Input, Binary Output, Device, Schedule, Trend Log, and Notification Class.
- Command priority arrays are important; relinquishing a command is different from writing a lower value.
- BACnet/IP is common, but MS/TP remains common in field networks.
- COV subscriptions are the normal way to avoid polling values constantly.

## Official Sources

- [BACnet Committee](https://bacnet.org/)
- [ASHRAE Standard 135 resource files](https://data.ashrae.org/BACnet/index.html)
