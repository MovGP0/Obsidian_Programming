# Verilog Data Types and Operators

Verilog has a small set of core data types and a broad set of operators. Correct width handling is one of the main practical skills in writing reliable RTL.

## Core Data Types

| Type | Use |
| --- | --- |
| `wire` | Net driven by `assign`, primitive gates, or module outputs |
| `reg` | Procedural variable assigned in `always`, `initial`, `function`, or `task` |
| `integer` | 32-bit signed procedural variable, common in loops and testbenches |
| `time` | 64-bit simulation time value |
| `parameter` | Module constant that can be overridden at instantiation |
| `localparam` | Module constant that cannot be overridden from outside |
| `supply0` | Constant logic zero supply net |
| `supply1` | Constant logic one supply net |

In classic Verilog, `reg` does not necessarily mean a physical register. A `reg` in an `always @(*)` block can synthesize to combinational logic. A `reg` in an edge-triggered block normally synthesizes to flip-flops.

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

Bit select:

```verilog
assign Msb = ByteValue[7];
```

Part select:

```verilog
assign HighNibble = ByteValue[7:4];
assign LowNibble = ByteValue[3:0];
```

## Arrays and Memories

```verilog
reg [7:0] Memory [0:255];
```

This declares 256 elements, each 8 bits wide.

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

## Arithmetic Operators

| Operator | Meaning |
| --- | --- |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Modulo |

Division and modulo can be expensive or unsupported in synthesis depending on the target and operands. Multiplication may infer a DSP block on FPGA or a multiplier structure in ASIC logic.

## Relational and Equality Operators

| Operator | Meaning |
| --- | --- |
| `<` | Less than |
| `<=` | Less than or equal |
| `>` | Greater than |
| `>=` | Greater than or equal |
| `==` | Logical equality |
| `!=` | Logical inequality |
| `===` | Case equality including `x` and `z` |
| `!==` | Case inequality including `x` and `z` |

Use `===` and `!==` mainly in testbenches when checking unknown or high-impedance values.

## Bitwise and Logical Operators

| Operator | Meaning |
| --- | --- |
| `~A` | Bitwise NOT |
| `A & B` | Bitwise AND |
| `A \| B` | Bitwise OR |
| `A ^ B` | Bitwise XOR |
| `A ~^ B` or `A ^~ B` | Bitwise XNOR |
| `!A` | Logical NOT |
| `A && B` | Logical AND |
| `A \|\| B` | Logical OR |

Bitwise operators operate bit-by-bit. Logical operators reduce operands to truth values.

## Reduction Operators

Reduction operators collapse a vector to one bit:

```verilog
assign AllOnes = &Value;
assign AnyOne = |Value;
assign Parity = ^Value;
assign AllZero = ~|Value;
```

## Shift Operators

```verilog
assign Left = Value << 1;
assign Right = Value >> 1;
```

Classic Verilog `>>` is a logical shift. SystemVerilog adds stronger signed-shift support.

## Concatenation and Replication

```verilog
assign Word = {HighByte, LowByte};
assign ZeroExtended = {8'b00000000, ByteValue};
assign Cleared = {Width{1'b0}};
```

Concatenation is also useful for shifting and rotating:

```verilog
assign RotateLeft = {Value[6:0], Value[7]};
```

## Conditional Operator

```verilog
assign Y = Select ? A : B;
```

This commonly synthesizes to a multiplexer.

## Width Discipline

Bad:

```verilog
assign Sum = A + 1;
```

Better:

```verilog
assign Sum = A + 8'd1;
```

When assigning to a wider result, make the extension explicit:

```verilog
assign WideSum = {4'b0000, A} + 8'd1;
```

## Related Notes

- [[Verilog]]
- [[Verilog Syntax and Literals]]
- [[Verilog Synthesis and Component Inference]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 4, 5, and 6.
