---
title: USB HID
---
**USB HID** is the class used by keyboards, mice, gamepads, and other human-interface devices. It is also useful for custom MCU control devices because the firmware can expose a vendor-defined HID device with a custom HID report descriptor.

Windows has built-in HID drivers, so a vendor-defined HID device often needs no custom INF or driver package. It might show up with an ID such as:

```text
HID\VID_1234&PID_5678
```

## Host-side options

Host-side C# options include:

```text
HidSharp
HidLibrary
Windows.Devices.HumanInterfaceDevice
Raw Input APIs
```

## Good for

| Use case | Fit |
|---|---|
| Small control packets | Excellent |
| Driverless Windows setup | Excellent |
| Cross-platform support | Good |
| Keyboard/mouse-like devices | Excellent |
| High throughput | Poor to mediocre |
| Arbitrary bulk transfer | Not ideal |

HID reports are usually fixed-size. Full-speed USB interrupt endpoints often use packets up to 64 bytes. You can build protocols over HID, but bulk data and variable-size transfers get awkward.

Example report split:

```text
Report ID 1: command report
Report ID 2: response report
Report ID 3: telemetry report
```

HID is a good option for configuration tools, control panels, simple instruments, macro pads, and small robotics controllers.

## See also

- [[USB Driver Choices for Microcontrollers]]
- [[USB Device Protocol Design]]
- [[USB Plug and Play]]
