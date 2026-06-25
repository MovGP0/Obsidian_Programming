---
title: WinUSB
---
**WinUSB** is the practical Windows path for a custom USB protocol that should not require a custom Windows kernel driver.

Use WinUSB when the device needs USB-native endpoints, a structured binary protocol, or bulk transfers. Microsoft describes WinUSB as a driver stack that lets Windows applications communicate with USB devices by using WinUSB functions, and documents automatic WinUSB installation paths for devices. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/using-winusb-api-to-communicate-with-a-usb-device), [Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/automatic-installation-of-winusb))

On Linux, the closest equivalent is usually not a kernel driver. For a custom USB protocol, use `libusb` from user space and a `udev` rule for permissions unless the device needs a real kernel subsystem driver. See [[Custom Linux Device Drivers]].

## Descriptor shape

The firmware exposes a vendor-specific USB interface:

```text
bDeviceClass        = 0x00 or 0xEF depending on layout
bInterfaceClass     = 0xFF   ; vendor-specific
bInterfaceSubClass  = 0x00
bInterfaceProtocol  = 0x00
```

And endpoints such as:

```text
EP1 OUT  bulk  PC -> MCU commands/data
EP1 IN   bulk  MCU -> PC responses/data
```

Then Windows binds the interface to:

```text
winusb.sys
```

## Host-side options

Host-side options include:

```text
WinUSB API via P/Invoke
LibUsbDotNet
Usb.Net
Device.Net
custom interop layer
```

C and C++ applications can use functions such as `WinUSB_ReadPipe` and `WinUSB_WritePipe`.

## Good for

| Use case | Fit |
|---|---|
| Custom binary protocol | Excellent |
| Bulk data transfer | Good |
| Firmware update channel | Good |
| Oscilloscope/logging/instrument data | Good |
| Avoiding a kernel driver | Excellent |
| Appearing as a COM port | No |

## Loading WinUSB

For prototypes, Zadig can bind a selected USB device or interface to WinUSB. Zadig installs generic USB drivers such as WinUSB, libusb-win32/libusb0.sys, or libusbK for USB access. ([Zadig](https://zadig.akeo.ie/))

This is fast for development, but it is not a polished product deployment strategy.

For a finished device, implement Microsoft OS descriptors in firmware so Windows can load WinUSB automatically. Microsoft’s Windows USB device guidance describes Microsoft OS feature descriptors that report `WINUSB`, allowing Windows to load `Winusb.sys` without a custom INF file. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/building-usb-devices-for-windows))

## See also

- [[USB Driver Choices for Microcontrollers]]
- [[USB Device Protocol Design]]
- [[USB Plug and Play]]
- [[Custom Linux Device Drivers]]
