---
title: Plug and Play Across Hardware Buses
---
Plug and Play is not a USB-specific feature. The general model is:

```text
Physical device or firmware-described device appears
Bus enumerator discovers it
Bus driver reports device IDs, hardware IDs, compatible IDs, and resources
PnP manager creates a devnode
Windows matches IDs against INF files and built-in class drivers
Driver stack starts
Applications use device interfaces exposed by the driver
```

Microsoft describes device identification strings as bus-specific: each enumerator customizes the device IDs, hardware IDs, and compatible IDs for the devices it enumerates. Windows then uses those strings to locate the best matching driver package. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/device-identification-strings), [Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/step-1--the-new-device-is-identified))

The connector is not the important part. The protocol and bus enumerator are. A USB-C connector might carry USB, DisplayPort Alternate Mode, Thunderbolt, USB4 tunneling, or charging negotiation. An M.2 slot might expose PCIe, SATA, USB, or multiple sideband signals depending on the keying and platform wiring. Windows PnP cares about the bus stack that actually enumerates the function.

## Common enumeration paths

| Path | How the device is identified | Typical IDs | Notes |
|---|---|---|---|
| [[USB Plug and Play\|USB]] | Host reads USB descriptors from endpoint 0 | `USB\VID_1234&PID_5678` | Self-describing, hot-plug first-class. |
| [[PCI Express Plug and Play\|PCI Express]] | PCI bus driver reads PCI configuration space | `PCI\VEN_8086&DEV_1234&SUBSYS_...` | Common for GPUs, NICs, NVMe controllers, Thunderbolt-attached PCIe functions. |
| ACPI platform device | Firmware describes the device with ACPI objects | `ACPI\VEN_XXXX&DEV_YYYY`, `ACPI\PNP0C50` | Used for onboard devices that are not discoverable by a self-enumerating bus. |
| HID over I2C/SPI | ACPI describes the device, then class driver reads HID descriptors over I2C or SPI | `ACPI\...`, compatible ID such as `PNP0C50` for HID over I2C | Common for touchpads, sensors, and embedded controllers. |
| Storage behind a controller | Controller driver enumerates child devices through storage protocols | `SCSI\...`, disk class IDs, NVMe as PCIe controller plus storage stack | SATA/SAS/USB storage often becomes child devnodes under a storage stack. |
| Bluetooth | Bluetooth stack discovers remote devices and services | Bluetooth device/service IDs, metadata may use DID profile | No physical connector; identity comes from Bluetooth discovery and profiles. |
| IEEE 1394 / FireWire | 1394 bus driver reads configuration ROM | `1394\VendorName&ModelName` | Legacy hot-plug bus with its own IDs. |
| PC Card / PCMCIA | PCMCIA bus reads CIS tuples | `PCMCIA\Manufacturer-Product-Crc` | Legacy removable card bus. |

## ACPI-described devices

Not every hardware function can announce itself the way USB and PCIe devices can. Many onboard devices on laptops and SoCs sit behind I2C, SPI, GPIO, UART, or internal platform fabric. Those buses often do not provide a universal device-discovery mechanism.

In that case, firmware describes the device in ACPI. Windows loads `Acpi.sys` early; Microsoft describes it as supporting power management and Plug and Play device enumeration. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/acpi-driver))

ACPI device nodes commonly provide:

| ACPI object | Meaning |
|---|---|
| `_HID` | Hardware ID |
| `_CID` | Compatible ID |
| `_UID` | Unique ID when multiple instances exist |
| `_SUB` | Subsystem ID |
| `_CRS` | Current resource settings, such as MMIO ranges, interrupts, GPIOs, I2C/SPI resources |
| `_DSM` | Device-specific method data |

Microsoft’s ACPI guidance describes `_HID` as the minimum requirement for identifying a device, and `_CID` as the compatible ID object. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/bringup/device-management-namespace-objects))

For example, HID over I2C uses ACPI to create the device node. Windows loads the HID I2C class driver based on a compatible identifier match; Microsoft documents `PNP0C50` as the HID I2C compatible ID. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/hid/plug-and-play-support-and-power-management))

## Storage and controller stacks

Some connectors do not directly identify the final device to the PnP manager. Instead, Windows first enumerates a controller, then the controller driver enumerates children.

Examples:

```text
PCIe AHCI controller -> SATA disk child devices
PCIe NVMe controller -> NVMe namespace / disk stack
USB mass storage device -> storage class stack -> disk volume devices
SAS / SCSI HBA -> SCSI logical units
```

Windows has bus-specific identifier formats for SCSI devices. The SCSI bus enumerator builds IDs from information such as peripheral device type, vendor, product, and revision strings returned by the device. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/identifiers-for-scsi-devices))

## Linux comparison

Linux follows the same broad bus-enumeration model, but driver matching is usually based on kernel module metadata instead of INF files. A Linux bus driver creates device objects, exposes bus-specific identity through sysfs and modalias strings, and the driver core binds matching drivers. User-space helpers such as `udev` and `modprobe` can then load modules and apply device-node policy.

For custom hardware, the practical Linux choices mirror the Windows choices:

| Hardware path | Windows route | Linux route |
|---|---|---|
| USB serial-style MCU | [[USB CDC ACM]] / `usbser.sys` | `cdc_acm` and `/dev/ttyACM*` |
| USB HID-style MCU | [[USB HID]] | HID/input, `hidraw`, or user-space HID |
| Custom USB endpoints | [[WinUSB]] | `libusb` plus `udev` permissions |
| Bluetooth peripheral | Bluetooth APIs, HID/profile support, or profile driver | BlueZ, GATT/profile support, HID/input, or HCI driver for custom adapters |
| PCIe hardware | INF + UMDF/KMDF/vendor driver | PCI driver with `pci_device_id`, BAR/IRQ/DMA handling |
| I2C/SPI/platform device | ACPI-described device + driver | Device Tree/ACPI/platform data + subsystem driver |

See [[Custom Linux Device Drivers]] for the Linux-specific driver package and binding model.

## Bluetooth devices

Bluetooth Plug and Play is not connector-based. The host Bluetooth adapter is enumerated through USB, PCIe, UART, SDIO, or another local bus. Remote devices are then discovered by the Bluetooth stack through inquiry, advertising, pairing, services, and profiles.

Typical layers:

```text
Local adapter/controller driver
  -> Bluetooth host stack
  -> Remote device discovery and pairing
  -> SDP, GATT, HID, audio, serial, or vendor profile
  -> User-space API, input device, audio device, serial device, or profile driver
```

For custom hardware, prefer a standard Bluetooth profile or BLE GATT service before writing an operating-system driver. A driver is usually needed only for a custom local Bluetooth adapter/controller, a kernel-integrated profile, or a device that must appear as a specific OS subsystem.

## Practical debugging

When a device is detected but no driver loads, inspect the IDs Windows actually sees:

```powershell
pnputil /enum-devices /deviceids
pnputil /enum-devices /bus PCI /deviceids
```

In Device Manager, the **Hardware Ids** and **Compatible Ids** properties show the strings the INF match must cover. A missing driver problem is usually not about the connector; it is usually one of these:

```text
The bus enumerator did not see the device.
The device ID is wrong or too vendor-specific for the intended inbox driver.
The compatible ID is missing.
The INF does not match the actual hardware ID.
Firmware ACPI data describes the wrong resources or IDs.
The device appears under a parent controller, not directly under the visible connector.
```

## See also

- [[USB Plug and Play]]
- [[PCI Express Plug and Play]]
- [[Custom Windows Device Drivers]]
- [[Custom Linux Device Drivers]]
- [[USB Driver Choices for Microcontrollers]]
- [[USB Device Protocol Design]]
