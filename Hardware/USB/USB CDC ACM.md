---
title: USB CDC ACM
---
**USB Communications Device Class Abstract Control Model** (**USB CDC ACM**) makes a microcontroller look like a virtual serial port. It is usually the easiest first transport for a custom MCU tool because the host side can use ordinary serial APIs and terminal programs.

A CDC ACM device appears as a COM port on Windows. Windows loads Microsoft’s built-in `usbser.sys` driver for USB communications and CDC control devices. Microsoft documents `usbser.sys` as the Microsoft-provided driver for communications and CDC control devices. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/usb-driver-installation-based-on-compatible-ids))

## Host-side C#

```csharp
using System.IO.Ports;

using var serialPort = new SerialPort("COM7", 115200)
{
    NewLine = "\n",
    ReadTimeout = 1000,
    WriteTimeout = 1000
};

serialPort.Open();

serialPort.WriteLine("LED ON");

var response = serialPort.ReadLine();
Console.WriteLine(response);
```

## Firmware protocol shape

Firmware side, implement a simple line protocol:

```text
PC -> MCU: LED ON\n
MCU -> PC: OK\n

PC -> MCU: ADC?\n
MCU -> PC: ADC 1234\n
```

CDC does not force the application protocol to be text. A binary framed protocol can also run over the serial stream, but text is the fastest way to get the first prototype working.

## Good for

| Use case | Fit |
|---|---|
| Debug/control channel | Excellent |
| Simple commands | Excellent |
| Logging from MCU | Excellent |
| Terminal tools | Excellent |
| Binary protocol | Fine |
| High-throughput streaming | Acceptable, but not ideal |
| Multiple endpoints / USB-native protocol | Not ideal |

Start here unless there is already a known reason to avoid the serial abstraction.

## MCU library routes

| Platform | Typical route |
|---|---|
| STM32 | STM32Cube USB Device CDC |
| RP2040 / Raspberry Pi Pico | TinyUSB CDC |
| ESP32-S2 / ESP32-S3 | TinyUSB CDC |
| nRF52 / nRF53 | Zephyr USB CDC ACM or Nordic SDK |
| SAMD21 / SAMD51 | TinyUSB / Arduino USB CDC |
| Teensy | Built-in USB serial support |

## See also

- [[USB Driver Choices for Microcontrollers]]
- [[USB Device Protocol Design]]
- [[USB Plug and Play]]
