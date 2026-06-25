---
title: Custom Windows Device Drivers
---
**Custom Windows device drivers** are Windows driver packages written for hardware that cannot be handled by an existing Microsoft class driver, [[WinUSB]], [[USB HID]], [[USB CDC ACM]], or another user-mode library stack.

For custom microcontroller-based hardware, a custom driver should usually be the last option. Start with a standard USB class or WinUSB when possible:

| Need | Prefer |
|---|---|
| Serial-style commands, logging, debug console | [[USB CDC ACM]] |
| Small driverless control reports | [[USB HID]] |
| Custom USB endpoints without kernel driver code | [[WinUSB]] |
| Storage, audio, camera, network, Bluetooth, HID, serial | Relevant Windows class driver |
| Tight OS integration, special kernel interfaces, custom bus behavior, DMA/interrupt control | Custom UMDF/KMDF driver |

The Linux equivalent is usually not an INF-based package. Linux driver matching is normally built into the kernel module with bus-specific ID tables and `MODULE_DEVICE_TABLE(...)`; user-space policy such as permissions and stable names is handled by `udev`. See [[Custom Linux Device Drivers]].

## INF files

Windows driver installation uses **INF files**, not INI files. An INF file is a setup information file in a driver package. Microsoft describes it as the file Windows device installation components read to install drivers, settings, device IDs, registry entries, catalog files, and version information for a device. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/overview-of-inf-files), [Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/components-of-a-driver-package))

An INF file does not implement the driver. It tells Windows how to bind a driver package to hardware IDs and how to copy/configure the package.

Common driver package files:

| File | Purpose |
|---|---|
| `.inf` | Installation metadata and hardware ID matching |
| `.sys` | Kernel-mode driver binary, when the package includes one |
| `.dll` / `.exe` | User-mode driver or support component, depending on driver model |
| `.cat` | Catalog file used for package signing |
| Co-installers / services / firmware blobs | Extra package-specific files when needed |

## INF shape

A minimal device INF has these conceptual parts:

```ini
[Version]
Signature="$WINDOWS NT$"
Class=Sample
ClassGuid={...}
Provider=%ManufacturerName%
DriverVer=06/25/2026,1.0.0.0
CatalogFile=SampleDevice.cat

[Manufacturer]
%ManufacturerName%=Models,NTamd64

[Models.NTamd64]
%DeviceName%=Install, USB\VID_1234&PID_5678

[Install.NT]
CopyFiles=DriverCopyFiles

[Install.NT.Services]
AddService=SampleDevice,0x00000002,ServiceInstall

[ServiceInstall]
ServiceType=1
StartType=3
ErrorControl=1
ServiceBinary=%12%\SampleDevice.sys

[DriverCopyFiles]
SampleDevice.sys

[Strings]
ManufacturerName="Example Vendor"
DeviceName="Example Custom Device"
```

The important parts are:

| INF part | Meaning |
|---|---|
| `[Version]` | Package identity, class, catalog, provider, version |
| `[Manufacturer]` | Manufacturer model-section mapping |
| model section | Hardware IDs that this package matches |
| install section | Files, registry settings, interfaces, and directives |
| service section | Driver service creation and `.sys` path for kernel drivers |
| `[Strings]` | Localized display strings |

Every INF has a `[Version]` section, and Microsoft documents many system-defined INF sections. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/inf-version-section), [Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/summary-of-inf-sections))

## Choosing the driver model

Use Windows Driver Frameworks (**WDF**) for new Windows drivers. WDF provides two main frameworks: **User-Mode Driver Framework** (**UMDF**) and **Kernel-Mode Driver Framework** (**KMDF**). Microsoft describes WDF as an abstraction layer that handles much of the common driver boilerplate. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/wdf/))

| Driver model | Use when |
|---|---|
| UMDF | The device can be controlled safely from user mode and does not need direct kernel-only access |
| KMDF | The device needs kernel-mode access, interrupt/DMA handling, tight power/PnP integration, or lower-level bus/filter behavior |
| WinUSB | The device is USB and only needs generic user-mode USB pipe access |
| Class driver | The device already fits an existing Windows class |

Microsoft describes UMDF drivers as user-mode drivers that abstract hardware functionality and run in a user-mode environment. Some driver categories, such as file system, full display, and print drivers, cannot be UMDF drivers. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/wdf/overview-of-the-umdf))

## Microcontroller decision path

For a custom MCU connected over USB:

```text
1. Can it be CDC serial?
   Use USB CDC ACM and usbser.sys.

2. Can it be HID?
   Use USB HID with a vendor-defined report descriptor.

3. Does it need custom USB endpoints?
   Use WinUSB and a user-mode host application.

4. Does Windows itself need to treat it as a system device?
   Consider UMDF first.

5. Does it require kernel-only behavior?
   Use KMDF.
```

Examples that might justify a custom driver:

```text
PCIe device with MMIO registers and interrupts
Custom bus controller that enumerates child devices
Device that must expose a Windows device class interface
Device requiring kernel-mode DMA, interrupt, or power-management control
Filter driver that changes behavior of an existing stack
```

Examples that usually do not justify a custom driver:

```text
MCU command channel
Debug console
Firmware configuration tool
Simple data acquisition over USB bulk endpoints
Small control panel or macro pad
```

## Implementation workflow

For a real custom Windows driver:

```text
1. Identify the bus and the exact hardware IDs Windows reports.
2. Decide whether an inbox class driver, WinUSB, HID, or CDC can solve it.
3. Pick UMDF or KMDF.
4. Install the Windows Driver Kit (WDK) and Visual Studio driver templates.
5. Start from a Microsoft driver template or sample.
6. Implement DriverEntry / device creation / queues / I/O callbacks.
7. Write an INF that matches the device IDs.
8. Build the driver package.
9. Test-sign the package for development.
10. Install with pnputil on a test machine.
11. Debug with WinDbg and WDF tracing.
12. Submit/sign appropriately for production distribution.
```

Microsoft provides tutorials for small KMDF drivers and template-based KMDF drivers. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/writing-a-very-small-kmdf--driver), [Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/writing-a-kmdf-driver-based-on-a-template))

## Installing and testing

Use `pnputil` to add, install, enumerate, and remove driver packages:

```powershell
pnputil /add-driver .\SampleDevice.inf /install
pnputil /enum-drivers
pnputil /enum-devices /deviceids
pnputil /delete-driver oem42.inf /uninstall
```

Microsoft documents `pnputil` as the built-in command-line tool for driver package management. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/devtest/pnputil), [Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/devtest/pnputil-examples))

For development, driver packages are commonly test-signed. A test-signed package contains the driver binary, INF file, catalog file, and any required extra files. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/test-signing))

## Practical rule

For custom microcontroller hardware, do not start by writing a Windows driver. Start by making the hardware enumerate cleanly, then use a standard class or [[WinUSB]]. Write a custom UMDF/KMDF driver only when the operating system itself must manage the device in a way that a user-mode application and generic driver cannot.

## See also

- [[Plug and Play]]
- [[USB Plug and Play]]
- [[USB Driver Choices for Microcontrollers]]
- [[USB Device Protocol Design]]
- [[WinUSB]]
- [[PCI Express Plug and Play]]
- [[Custom Linux Device Drivers]]
