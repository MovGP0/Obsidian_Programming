---
title: Data Types
---
Verilog has a small set of core data types. The important practical distinction is whether an object is driven continuously like a net or assigned procedurally inside an `always`, `initial`, `function`, or `task` block.

## Core Data Types

| Type | Use |
| --- | --- |
| `wire` | Net driven by `assign`, primitive gates, or module outputs |
| `reg` | Procedural variable assigned in `always`, `initial`, `function`, or `task` |
| `integer` | 32-bit signed procedural variable, common in loops and testbenches |
| `real` | Simulation floating-point value, not normally synthesizable |
| `time` | 64-bit simulation time value |
| `parameter` | Module constant that can be overridden at instantiation |
| `localparam` | Module constant that cannot be overridden from outside |
| `supply0` | Constant logic zero supply net |
| `supply1` | Constant logic one supply net |

In classic Verilog, `reg` does not necessarily mean a physical register. A `reg` in an `always @(*)` block can synthesize to combinational logic. A `reg` in an edge-triggered block normally synthesizes to flip-flops.

The practical rule is based on what drives the object:

```verilog
wire Y1;
assign Y1 = A & B;

reg Y2;
always @(*)
begin
    Y2 = A & B;
end
```

`Y1` is a net with a continuous driver. `Y2` is a procedural variable. In the second example, `Y2` still represents combinational logic because every path in the combinational block assigns it.

## Ports

```verilog
module Example
(
    input  wire       A,
    input  wire       B,
    output wire       Y,
    output reg  [7:0] Count,
    inout  wire       Bus
);
endmodule
```

Ports can be declared separately in older Verilog style, but ANSI-style declarations in the port list are easier to read.

## Vectors

```verilog
wire [7:0] ByteValue;
reg  [3:0] Nibble;
```

The range before the signal name is the bit range of that signal:

```text
wire [7:0] ByteValue;
     ^^^^^
     bits 7 down to 0, so 8 bits total
```

Read `[7:0]` as "bit 7 through bit 0". The left number is conventionally the most significant bit, and the right number is conventionally the least significant bit.

Bit select:

```verilog
assign Msb = ByteValue[7];
```

Part select:

```verilog
assign HighNibble = ByteValue[7:4];
assign LowNibble = ByteValue[3:0];
```

A bit select chooses one bit. A part select chooses a contiguous group of bits:

```verilog
wire [31:0] Instruction;
wire [4:0]  Rd = Instruction[11:7];
```

`Instruction[11:7]` selects five bits: 11, 10, 9, 8, and 7. That matches the width of `Rd`, which is declared as `[4:0]`.

## Reading Range Notation

Ranges are inclusive. The number of selected bits is:

```text
left_index - right_index + 1
```

Examples:

| Syntax | Meaning |
| --- | --- |
| `wire [7:0] ByteValue;` | One 8-bit vector, bits 7 through 0 |
| `wire [4:0] Rd;` | One 5-bit vector, bits 4 through 0 |
| `ByteValue[7]` | One bit: bit 7 |
| `ByteValue[7:4]` | Four bits: 7, 6, 5, 4 |
| `Instruction[11:7]` | Five bits: 11, 10, 9, 8, 7 |

The range location matters:

```verilog
reg [31:0] Memory [0:255];
```

```text
reg [31:0] Memory [0:255];
    ^^^^^^         ^^^^^^^
    element width  array index range
```

The range before the name, `[31:0]`, says each element is 32 bits wide. The range after the name, `[0:255]`, says the array has entries indexed from 0 through 255.

## Arrays and Memories

```verilog
reg [31:0] Memory [0:255];
```

This declares 256 elements, each 32 bits wide. Read it as "Memory is an array of 256 32-bit registers."

Examples:

```verilog
Memory[0]          // first 32-bit word
Memory[255]        // last 32-bit word
Memory[10][31]     // bit 31 of word 10
Memory[10][7:0]    // low byte of word 10
```

Synthesis support depends on the target. Small arrays can become flip-flops. Larger arrays may infer FPGA RAM blocks or ASIC memory macros only when coded in a supported pattern.

## Parameters

```verilog
module Shifter
#(
    parameter Width = 8,
    parameter Amount = 1
)
(
    input  wire [Width-1:0] A,
    output wire [Width-1:0] Y
);
    assign Y = A << Amount;
endmodule
```

Override parameters by name:

```verilog
Shifter
#(
    .Width(16),
    .Amount(4)
)
ShifterInstance
(
    .A(A),
    .Y(Y)
);
```

## Related Notes

- [[_Verilog|Verilog]]
- [[Verilog Operators]]
- [[Verilog Syntax and Literals]]
- [[Verilog Synthesis and Component Inference]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 4, 5, and 6.
- YouTube: [Verilog Data Types Explained](https://www.youtube.com/watch?v=R57WWiEqkLQ)
