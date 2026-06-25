---
title: Custom Linux Device Drivers
---
**Custom Linux device drivers** are kernel modules or built-in kernel drivers written for hardware that cannot be handled by an existing Linux subsystem driver, class driver, or user-space access library.

For custom microcontroller-based hardware, a kernel driver should usually be the last option. Prefer an existing Linux class driver or user-space API first:

| Need | Prefer |
|---|---|
| Serial-style commands, logging, debug console | `cdc_acm`, exposed as `/dev/ttyACM*` |
| Small HID-style control reports | HID input, `hidraw`, or a user-space HID library |
| Custom USB bulk/control endpoints | `libusb` with a `udev` permissions rule |
| Bluetooth sensor, controller, or peripheral | BlueZ/GATT/HID/profile support before a kernel driver |
| Network, storage, audio, camera, input | Existing Linux subsystem/class driver |
| PCIe MMIO, interrupts, DMA, subsystem integration, custom bus behavior | Custom kernel driver |

## Similarity to Windows

Linux and Windows use the same broad device-driver model:

| Concept | Windows | Linux |
|---|---|---|
| Device discovery | Plug and Play manager plus bus drivers | Linux driver core plus bus drivers |
| Device identity | Hardware IDs and compatible IDs | Bus-specific IDs and modalias strings |
| Driver match metadata | INF file plus driver package | Driver ID tables exported by the module |
| Driver load helper | Driver store and PnP install | `modprobe`, `depmod`, module aliases, `udev` |
| User-facing access | Device interface, COM port, HID, WinUSB API | `/dev/*`, sysfs, input, network, block, tty, hidraw, libusb |

The major difference is where the matching metadata lives. Windows externalizes much of it into an INF file. Linux usually builds the matching metadata into the driver module with ID tables and `MODULE_DEVICE_TABLE(...)`.

## Driver binding

Linux driver binding is the process of associating a device with the driver that can control it. The Linux kernel documentation describes driver binding as mostly common driver-core code, with bus-specific device and driver structures providing the match data. ([Linux kernel documentation](https://docs.kernel.org/driver-api/driver-model/binding.html))

The typical flow is:

```text
Device appears on a bus
Kernel creates a device object
Bus exposes a modalias for the device
Driver module exposes supported aliases
udev/kmod runs modprobe for a matching module alias
Driver probe() runs
Driver registers a subsystem interface or device node
```

For a USB driver, the ID table commonly looks like:

```c
static const struct usb_device_id example_table[] =
{
    { USB_DEVICE(0x1234, 0x5678) },
    { }
};

MODULE_DEVICE_TABLE(usb, example_table);
```

The kernel USB driver documentation describes `MODULE_DEVICE_TABLE` as the mechanism that lets hotplug load the driver automatically for matching vendor/product IDs. ([Linux kernel documentation](https://docs.kernel.org/driver-api/usb/writing_usb_driver.html), [Linux kernel documentation](https://docs.kernel.org/driver-api/usb/hotplug.html))

## udev rules

`udev` is user-space policy, not the kernel driver. The kernel emits device events; `systemd-udevd` receives those events and applies matching rules. Rules can set ownership, permissions, tags, symlinks, and other metadata. ([udev(7)](https://man7.org/linux/man-pages/man7/udev.7.html), [systemd-udevd.service(8)](https://man7.org/linux/man-pages/man8/systemd-udevd.8.html))

For a user-space USB tool using `libusb`, a rule often grants access to the device without a kernel driver:

```udev
SUBSYSTEM=="usb", ATTR{idVendor}=="1234", ATTR{idProduct}=="5678", MODE="0660", GROUP="plugdev", TAG+="uaccess"
```

Then reload rules and re-trigger:

```bash
sudo udevadm control --reload-rules
sudo udevadm trigger
```

## Bluetooth devices

Bluetooth is different from USB or PCIe because the remote peripheral is discovered by the Bluetooth controller and stack, not by a physical connector. On Linux, the kernel provides Bluetooth controller and protocol support, while BlueZ is the usual user-space Bluetooth stack. BlueZ describes itself as the official Linux Bluetooth protocol stack. ([BlueZ](https://www.bluez.org/))

For custom Bluetooth hardware, avoid a custom kernel driver unless the Bluetooth controller itself is custom. Most products should expose a standard Bluetooth profile or Bluetooth Low Energy (**BLE**) GATT service and talk to it from user space.

Typical paths:

| Device type | Linux route |
|---|---|
| BLE sensor or control device | BlueZ D-Bus/GATT from user space |
| Bluetooth keyboard/mouse/gamepad | HID over Bluetooth, input subsystem |
| Custom serial-style stream | Bluetooth RFCOMM where appropriate |
| Custom Bluetooth adapter/controller | Kernel HCI transport/controller driver |
| Vendor-specific Bluetooth profile | User-space daemon or profile integration before kernel code |

Windows has a similar split: Microsoft documents a Bluetooth driver stack with user-mode applications, profile drivers, and kernel-mode stack components. New custom work is often profile or application-level unless the adapter/controller path itself needs a driver. ([Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/bluetooth/bluetooth-driver-stack))

## Microcontroller decision path

For custom MCU hardware connected over USB:

```text
1. Can it be CDC serial?
   Use cdc_acm and talk to /dev/ttyACM*.

2. Can it be HID?
   Use the HID/input stack, hidraw, or a user-space HID library.

3. Does it need custom USB endpoints?
   Use libusb from user space and add a udev permissions rule.

4. Does it need a first-class Linux subsystem interface?
   Write a subsystem driver, such as input, IIO, hwmon, netdev, tty, or block.

5. Does it need kernel-only behavior?
   Write a kernel driver for USB, PCI, platform, I2C, SPI, or another bus.
```

For a wireless MCU device, first ask whether it can be a BLE GATT device, Bluetooth HID device, or another standard profile before designing any Linux kernel driver.

Examples that might justify a custom Linux kernel driver:

```text
PCIe device with BARs, interrupts, and DMA
I2C/SPI sensor that should integrate with IIO, hwmon, input, or DRM
Custom bus controller that enumerates child devices
Custom Bluetooth adapter or HCI transport
Device that must expose a kernel subsystem interface
Low-latency interrupt-driven hardware path
Power-management or runtime-PM integration
```

Examples that usually do not justify a custom kernel driver:

```text
MCU command channel
Debug console
Firmware configuration tool
Simple USB bulk transfer protocol
BLE GATT service
Bluetooth HID device
Small control panel that can be HID
Data acquisition that works through libusb
```

## Implementation workflow

For a real custom Linux driver:

```text
1. Identify the bus: USB, PCI, I2C, SPI, platform, HID, Bluetooth controller, etc.
2. Check whether an existing class/subsystem driver already fits.
3. Decide whether user-space access is enough.
4. Pick the kernel subsystem the device should integrate with.
5. Add the bus-specific ID table.
6. Export the ID table with MODULE_DEVICE_TABLE(...).
7. Implement probe() and remove().
8. Allocate resources, register device nodes or subsystem interfaces.
9. Build as an out-of-tree module first if practical.
10. Load with modprobe or insmod during development.
11. Watch dmesg, sysfs, and udev events while binding.
12. Upstream or package the module if it must be maintained long term.
```

The Linux kernel USB documentation shows the usual USB driver shape: a matching ID table, `probe()` for bind, `disconnect()` for unplug, and file operations if the driver exposes a character device. ([Linux kernel documentation](https://docs.kernel.org/driver-api/usb/writing_usb_driver.html))

## Useful debugging commands

```bash
lsusb
lsusb -v
lspci -nn
modinfo <module>
modprobe <module>
dmesg -w
udevadm monitor --kernel --udev --property
udevadm info --attribute-walk --path=/sys/...
cat /sys/bus/usb/devices/.../modalias
bluetoothctl
btmon
```

## Practical rule

For custom microcontroller hardware on Linux, do not start with a kernel driver. Start with `cdc_acm`, HID, `libusb`, or a standard Bluetooth profile. Write a custom kernel driver when the device must integrate with a Linux kernel subsystem, needs interrupt/DMA/control paths only available in kernel space, or should be managed as part of the kernel hardware model.

## See also

- [[Custom Windows Device Drivers]]
- [[Plug and Play]]
- [[USB Driver Choices for Microcontrollers]]
- [[USB Device Protocol Design]]
