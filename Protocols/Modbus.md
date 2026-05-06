---
title: Modbus
---
# Modbus

Modbus is a simple industrial application protocol based on coils, discrete inputs, input registers, and holding registers. It is commonly used over serial links and TCP/IP for PLCs, meters, drives, and field devices.

## Where it fits

Use Modbus when integration requires a small, widely supported register protocol. It is easy to implement but has weak discovery, weak semantics, and no native subscription model.

## Usage Examples

Read holding registers:

```text
Function 03 Read Holding Registers
Unit: 1
Address: 40001
Quantity: 2
```

Write a single register:

```text
Function 06 Write Single Register
Unit: 1
Address: 40010
Value: 1200
```

Write a coil command:

```text
Function 05 Write Single Coil
Unit: 1
Address: 00017
Value: ON
```

Poll telemetry:

```text
Every 1s: read input registers 30001..30008
```

Handle an exception response:

```text
Function: 0x83
Exception: 0x02 Illegal Data Address
```

## Programming Example

```python
from pymodbus.client import ModbusTcpClient

with ModbusTcpClient("192.0.2.10", port=502) as client:
    result = client.read_holding_registers(address=0, count=2, slave=1)
    if result.isError():
        raise RuntimeError(result)
    print(result.registers)
```

## Notes

- Register maps are vendor-specific and must be documented separately.
- Modbus addresses are often presented as 40001-style references, while APIs often use zero-based offsets.
- Modbus has no built-in security unless using Modbus Security/TLS or a protected network.
- There is no native publish/subscribe; telemetry is usually polling.

## Official Sources

- [Modbus specifications and implementation guides](https://www.modbus.org/modbus-specifications)
- [Modbus Application Protocol Specification V1.1b3](https://www.modbus.org/docs/Modbus_Application_Protocol_V1_1b3.pdf)
