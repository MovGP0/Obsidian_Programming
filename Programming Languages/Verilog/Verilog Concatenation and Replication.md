---
title: Concatenation and Replication
---
**Concatenation** and **replication** use curly braces to build a wider vector from smaller pieces.

## Concatenation

Concatenation syntax:

```verilog
{LeftPart, RightPart}
```

Read it as:

```text
put LeftPart in the high bits,
put RightPart after it in the low bits.
```

Example:

```verilog
wire [3:0] HighNibble = 4'b1010;
wire [3:0] LowNibble  = 4'b0111;
wire [7:0] ByteValue;

assign ByteValue = {HighNibble, LowNibble};
```

Bit pattern:

```text
HighNibble = 4'b1010
LowNibble  = 4'b0111

{HighNibble, LowNibble}
= {4'b1010, 4'b0111}
= 8'b10100111
```

The left item becomes the most significant bits. The right item becomes the least significant bits.

## Zero Extension

Concatenation is often used to make a value wider without changing its numeric value:

```verilog
wire [7:0] A = 8'b10101010;
wire [8:0] ExtendedA;

assign ExtendedA = {1'b0, A};
```

Bit pattern:

```text
A        = 8'b10101010
{1'b0,A} = 9'b010101010
```

The leading zero makes `A` a 9-bit unsigned value.

This is why an adder often uses:

```verilog
assign Sum = {1'b0, A} + {1'b0, B};
```

If `A` and `B` are 8-bit values, each side is extended to 9 bits before the addition:

```text
A        = 8'b11111111
B        = 8'b00000001

{1'b0,A} = 9'b011111111
{1'b0,B} = 9'b000000001

Sum      = 9'b100000000
```

The 9th bit preserves the carry. Without the extra bit, assigning back into an 8-bit result would truncate the carry.

## Splitting a Result

Concatenation can also appear on the left side of an assignment:

```verilog
assign {CarryOut, Sum} = A + B + CarryIn;
```

If `Sum` is 1 bit and `CarryOut` is 1 bit, the two-bit result is split:

```text
A + B + CarryIn = 2'b10

CarryOut = 1'b1
Sum      = 1'b0
```

This is common in adder examples.

For an 8-bit adder, use the same idea with a 9-bit result:

```verilog
wire [7:0] A;
wire [7:0] B;
wire [7:0] Sum;
wire       Carry;

assign {Carry, Sum} = {1'b0, A} + {1'b0, B};
```

Read the left side as one 9-bit destination:

```text
{Carry, Sum}
= {1 bit, 8 bits}
= 9 bits total
```

The right side also produces 9 bits because both operands were zero-extended:

```text
A        = 8'b11111111
B        = 8'b00000001

{1'b0,A} = 9'b011111111
{1'b0,B} = 9'b000000001

result   = 9'b100000000
```

The assignment splits that result:

```text
{Carry, Sum} = 9'b100000000

Carry = 1'b1
Sum   = 8'b00000000
```

This keeps the carry separate instead of losing it through truncation.

## Replication

Replication syntax:

```verilog
{Count{Value}}
```

Read it as:

```text
repeat Value Count times.
```

Example:

```verilog
wire [3:0] Cleared;

assign Cleared = {4{1'b0}};
```

Bit pattern:

```text
{4{1'b0}}
= {1'b0, 1'b0, 1'b0, 1'b0}
= 4'b0000
```

Another example:

```verilog
wire [7:0] Pattern;

assign Pattern = {4{2'b10}};
```

Bit pattern:

```text
{4{2'b10}}
= {2'b10, 2'b10, 2'b10, 2'b10}
= 8'b10101010
```

## Sign Extension

Replication is useful for sign extension. The sign bit is repeated into the new high bits:

```verilog
wire [7:0]  SmallValue = 8'b10000001;
wire [15:0] WideValue;

assign WideValue = {{8{SmallValue[7]}}, SmallValue};
```

Bit pattern:

```text
SmallValue[7] = 1'b1
SmallValue    = 8'b10000001

{8{SmallValue[7]}} = 8'b11111111

WideValue = {8'b11111111, 8'b10000001}
          = 16'b1111111110000001
```

If the sign bit were `0`, the replicated high bits would be zeros.

## Shifts and Rotates

Concatenation can describe wiring rearrangements:

```verilog
assign RotateLeft = {Value[6:0], Value[7]};
```

If:

```text
Value = 8'b10110001
```

then:

```text
Value[6:0] = 7'b0110001
Value[7]   = 1'b1

RotateLeft = {Value[6:0], Value[7]}
           = 8'b01100011
```

This is a rotate, not a shift, because the bit that leaves the left side re-enters on the right.

## Related Notes

- [[_Verilog|Verilog]]
- [[Verilog Operators]]
- [[Verilog Data Types]]
- [[Verilog Synthesis and Component Inference]]
- [[Verilog Modules and Instantiation]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 4, 5, and 6.
- YouTube: [Logical Operators, Shift & Concatenation in Verilog](https://www.youtube.com/watch?v=s7FXSFFniWQ)
