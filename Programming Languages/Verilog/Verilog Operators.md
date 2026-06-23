---
title: Operators
---
**Operators** describe arithmetic, comparison, bitwise logic, Boolean tests, shifts, and conditional selection. Correct width handling is one of the main practical skills in writing reliable RTL.

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

- [[_Verilog|Verilog]]
- [[Verilog Concatenation and Replication]]
- [[Verilog Data Types]]
- [[Verilog Syntax and Literals]]
- [[Verilog Synthesis and Component Inference]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 4, 5, and 6.
- YouTube: [Logical Operators, Shift & Concatenation in Verilog](https://www.youtube.com/watch?v=s7FXSFFniWQ)
