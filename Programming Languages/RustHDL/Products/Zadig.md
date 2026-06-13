# Zadig

Zadig is a Windows driver utility for assigning generic USB drivers such as WinUSB to USB interfaces.
It is needed when `openFPGALoader` can see a USB-JTAG adapter physically but cannot open it through libusb.

## Role In The Flow

```text
USB-JTAG interface -> WinUSB driver -> openFPGALoader
```

## Download

Official site:

- https://zadig.akeo.ie/

The executable is portable. It does not need a normal installer.

Verify the Authenticode signature before running it:

```powershell
Get-AuthenticodeSignature .\zadig-2.9.exe
```

The signer should be `Akeo Consulting`.

## Tang Primer 20K Setup

Connect the **USB-JTAG** port, not the USB-OTG port.

The Tang Primer 20K USB-JTAG interface appears as an FTDI FT2232 device:

```text
VID:PID = 0403:6010
Interface A / MI_00 = JTAG
Interface B / MI_01 = usually UART / COM port
```

In Device Manager, this can appear as:

```text
USB Composite Device        USB\VID_0403&PID_6010
USB Serial Converter A      USB\VID_0403&PID_6010&MI_00
USB Serial Converter B      USB\VID_0403&PID_6010&MI_01
USB Serial Port             FTDIBUS...
```

Use Zadig:

1. Run Zadig as administrator.
2. Select **Options -> List All Devices**.
3. Select `USB Serial Converter A` / Interface 0 / `MI_00`.
4. Confirm the USB ID is `0403 6010 00`.
5. Set the target driver to `WinUSB`.
6. Click **Replace Driver** or **Install Driver**.
7. Leave `USB Serial Converter B` / Interface 1 / `MI_01` unchanged.

Working final state on this machine:

```text
USB\VID_0403&PID_6010&MI_00 -> WinUSB, provider libwdi, JTAG Debugger (Interface 0)
USB\VID_0403&PID_6010&MI_01 -> FTDIBUS, provider FTDI, USB Serial Converter B
```

After the driver change:

```powershell
& "$env:ProgramFiles\oss-cad-suite\environment.ps1"
openFPGALoader -b tangprimer20k --detect
```

Expected successful detection:

```text
Jtag frequency : requested 6.00MHz    -> real 6.00MHz
index 0:
  idcode 0x81b
  manufacturer Gowin
  family GW2A
  model  GW2A(R)-18(C)
  irlength 8
```

In this machine, OSS CAD Suite is currently installed at:

```powershell
& "C:\Programs\oss-cad-suite\environment.ps1"
```

## Troubleshooting

If `openFPGALoader` reports:

```text
unable to open ftdi device: -4 (usb_open() failed)
JTAG init failed with: unable to open ftdi device
```

then the board is visible, but Interface A is still bound to the FTDI driver instead of WinUSB.

If `openFPGALoader` exits immediately with code `-1073741819` / `0xC0000005`, check whether Interface A was set to `libusbK`. On this machine, `libusbK` caused `openFPGALoader` to crash. Use `WinUSB` for Interface A instead.

If `openFPGALoader` reports:

```text
unable to open ftdi device: -3 (device not found)
```

then the USB-JTAG interface is not visible. Check that the USB-JTAG port is connected, not only USB-OTG.

Do not replace drivers for random USB devices. For Tang Primer 20K, target only:

```text
USB\VID_0403&PID_6010&MI_00
```

If Interface 1 was accidentally changed, remove that device in Device Manager or restore it to the FTDI driver. The desired Interface 1 driver is `USB Serial Converter B`, provider `FTDI`.

## References

- https://zadig.akeo.ie/
- https://github.com/pbatard/libwdi/wiki/Zadig
