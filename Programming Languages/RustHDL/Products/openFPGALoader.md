# openFPGALoader

openFPGALoader programs the FPGA over supported USB/JTAG cables or board interfaces.

## Role In The Flow

```text
.fs bitstream -> openFPGALoader -> FPGA SRAM or external flash
```

## Install

Recommended:

- Install through [[OSS CAD Suite]].

## Verify

```powershell
openFPGALoader --version
openFPGALoader --list-boards
openFPGALoader --detect
```

## Program

Program SRAM:

```powershell
openFPGALoader -b tangnano20k top.fs
```

Program external flash:

```powershell
openFPGALoader -b tangnano20k -f top.fs
```

## Windows USB/JTAG Notes

Some Sipeed Tang boards need a WinUSB driver for the JTAG interface.

For the Tang Primer 20K USB-JTAG connector, Windows should show an FTDI FT2232 device:

```text
USB Composite Device        USB\VID_0403&PID_6010
USB Serial Converter A      USB\VID_0403&PID_6010&MI_00
USB Serial Converter B      USB\VID_0403&PID_6010&MI_01
USB Serial Port             FTDIBUS...
```

`openFPGALoader` uses the `tangprimer20k` board alias:

```powershell
openFPGALoader -b tangprimer20k --detect
```

If detection fails with this error, the device is visible but the JTAG interface is bound to the wrong driver:

```text
unable to open ftdi device: -4 (usb_open() failed)
JTAG init failed with: unable to open ftdi device
```

Driver setup:

1. Install or run Zadig: https://zadig.akeo.ie/
2. Select **Options -> List All Devices**.
3. Select `USB Serial Converter A` / Interface 0 / `MI_00`.
4. Confirm the USB ID is `0403 6010 00`.
5. Set the target driver to `WinUSB`.
6. Click **Replace Driver** or **Install Driver**.
7. Leave `USB Serial Converter B` / Interface 1 / `MI_01` unchanged; it is normally UART/serial.

Working final state on this machine:

```text
MI_00 / Interface 0 -> WinUSB, provider libwdi, JTAG Debugger (Interface 0)
MI_01 / Interface 1 -> FTDIBUS, provider FTDI, USB Serial Converter B
```

Successful detection output:

```text
Jtag frequency : requested 6.00MHz    -> real 6.00MHz
index 0:
  idcode 0x81b
  manufacturer Gowin
  family GW2A
  model  GW2A(R)-18(C)
  irlength 8
```

If Gowin Programmer is needed later, remove the WinUSB driver in Device Manager and let Windows reinstall the default driver.

We tried a generated WinUSB INF with `pnputil`, but Windows rejected it because the third-party INF was unsigned. Zadig is the practical path because it generates and installs a signed driver package.

We also tried `libusbK` on Interface 0. On this machine, `openFPGALoader` crashed immediately with exit code `-1073741819` / `0xC0000005`. Use `WinUSB` instead.

## References

- https://github.com/trabucayre/openFPGALoader
- https://trabucayre.github.io/openFPGALoader/compatibility/fpga.html
