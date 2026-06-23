# Verilog Data Types and Operators

Verilog has a small set of core data types and a broad set of operators. Correct width handling is one of the main practical skills in writing reliable RTL.

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

Example:

```verilog
assign Y1 = A & B;        // bitwise AND
assign Y2 = A && B;       // logical truth test
assign Y3 = A | B;        // bitwise OR
assign Y4 = ~A;           // bitwise NOT
assign Y5 = A == B;       // equality
assign Y6 = A != B;       // inequality
assign Y7 = A < B;        // relational
assign Y8 = A << 1;       // shift left
assign Y9 = {A, B};       // concatenation
assign Y10 = {4{A}};      // replication
```

For vectors, `&` and `&&` are not interchangeable. `A & B` returns a vector with one result bit per input bit. `A && B` returns one Boolean result indicating whether both operands are logically true.

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
- YouTube: [Verilog Data Types Explained](https://www.youtube.com/watch?v=R57WWiEqkLQ)
- YouTube: [Logical Operators, Shift & Concatenation in Verilog](https://www.youtube.com/watch?v=s7FXSFFniWQ)
