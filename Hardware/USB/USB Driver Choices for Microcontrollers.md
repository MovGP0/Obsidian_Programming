---
title: USB Driver Choices for Microcontrollers
---
For a self-built microcontroller device, start with the USB class and driver decision. The descriptors decide what Windows thinks the device is, which Plug and Play IDs it creates, and which driver can bind to the device or interface.

```text
Do I want it to look like a serial port?
    -> USB CDC ACM / virtual COM port

Do I want structured custom USB commands without a kernel driver?
    -> WinUSB

Do I want maximum cross-platform generic USB access?
    -> WinUSB on Windows + libusb on the host side

Do I need to look like a keyboard, mouse, gamepad, or control panel?
    -> USB HID

Do I need high performance, kernel integration, storage, audio, network, or another standard function?
    -> Use the relevant USB class or write a real driver
```

For most hobby and custom MCU devices, the practical starting points are [[USB CDC ACM]], [[USB HID]], or [[WinUSB]] on Windows and `cdc_acm`, HID, or `libusb` on Linux. Avoid writing a Windows or Linux kernel driver unless a class driver, generic user-space access path, or user-mode stack cannot meet the device requirements. Microsoft gives similar guidance for Windows USB class drivers: use Microsoft-provided class drivers where possible, consider generic drivers such as WinUSB, and write a custom driver only when necessary. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/supported-usb-classes))

## Choices

| Situation | Windows pick | Linux pick |
|---|---|---|
| First prototype | [[USB CDC ACM]] | `cdc_acm` |
| Debug console + control | [[USB CDC ACM]] | `cdc_acm` and `/dev/ttyACM*` |
| Driverless small control device | [[USB HID]] | HID/input or `hidraw` |
| Keyboard/mouse/gamepad behavior | [[USB HID]] | HID/input |
| Custom binary protocol | [[WinUSB]] | `libusb` |
| Bulk transfer | [[WinUSB]] | `libusb` or a kernel subsystem driver |
| Cross-platform custom USB | libusb-style protocol; WinUSB backend on Windows | `libusb` |
| Disk/audio/camera/network behavior | Relevant USB class | Relevant Linux class/subsystem driver |
| Tight OS integration | [[Custom Windows Device Drivers]] | [[Custom Linux Device Drivers]] |

## Recommended start path

For a first working version:

```text
1. Pick an MCU board with known-good USB device examples.
2. Implement USB CDC serial first.
3. Build the command protocol.
4. Write a C# host tool.
5. Switch to WinUSB only if CDC becomes limiting.
```

A practical first milestone:

```text
MCU enumerates as COM port
PC sends:  PING\n
MCU replies: PONG\n

PC sends:  LED 1\n
MCU replies: OK\n

PC sends:  ADC 0\n
MCU replies: ADC 0 2473\n
```

For “my own MCU device, talk to it from a .NET app on Windows,” start with:

```text
MCU firmware: USB CDC ACM
Windows side: System.IO.Ports.SerialPort
Protocol: line-based ASCII commands
Later: binary framing or WinUSB if needed
```

Only move to WinUSB once USB-native endpoints, better device discovery, or higher-throughput structured transfers are actually needed.

On Linux, the corresponding custom-USB step is usually `libusb` plus a `udev` permissions rule. Only move to a Linux kernel driver when the device must integrate with a Linux kernel subsystem, handle interrupts/DMA, or expose a kernel-managed hardware interface.

## See also

- [[USB Plug and Play]]
- [[USB CDC ACM]]
- [[USB HID]]
- [[WinUSB]]
- [[USB Device Protocol Design]]
- [[Custom Windows Device Drivers]]
- [[Custom Linux Device Drivers]]
