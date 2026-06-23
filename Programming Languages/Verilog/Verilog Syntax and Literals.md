# Verilog Syntax and Literals

This note covers the lexical layer of Verilog: comments, identifiers, numbers, keywords, and the small syntax rules that affect every design.

## Whitespace

Whitespace separates tokens. Spaces, tabs, newlines, and form feeds are allowed. A statement can span multiple lines without a line-continuation character.

```verilog
assign Result =
    A
    &
    B;
```

## Comments

```verilog
// Single-line comment

/*
Multi-line comment.
Useful for temporarily disabling a block while debugging.
*/
```

## Identifiers

Identifiers name modules, signals, instances, blocks, functions, tasks, and parameters.

Rules:

- Start with a letter or underscore.
- Continue with letters, digits, underscores, and dollar signs.
- Do not start with a number.
- Do not use keywords such as `module`, `wire`, `reg`, `assign`, `always`, `case`, or `end`.
- Verilog identifiers are case-sensitive.

```verilog
Adder8
ByteCounter
_InternalEnable
ReadN
```

`ReadN`, `readn`, and `READN` are different identifiers.

## Four-State Values

Most Verilog values can contain:

| Value | Meaning |
| --- | --- |
| `0` | Logic zero |
| `1` | Logic one |
| `x` | Unknown |
| `z` | High impedance |

`x` is common in simulation when a value is uninitialized or driven by conflicting logic. `z` is used for tri-state buses.

## Numeric Literals

Format:

```verilog
<width>'<base><value>
```

Examples:

```verilog
1'b0
4'b1010
8'hFF
12'o755
16'd1000
```

Bases:

| Base | Meaning |
| --- | --- |
| `'b` | Binary |
| `'o` | Octal |
| `'d` | Decimal |
| `'h` | Hexadecimal |

The width is the number of bits. Prefer explicit widths in RTL:

```verilog
assign Next = Count + 8'd1;
```

Avoid relying on unsized constants:

```verilog
assign Next = Count + 1;      // Legal, but less explicit.
```

The common beginner examples are:

```verilog
4'b1010    // 4-bit binary
8'hA5      // 8-bit hexadecimal
6'd37      // 6-bit decimal
```

If the literal is narrower than the destination, Verilog extends it. If it is wider, the extra high bits can be truncated. Make the intended width visible when arithmetic or comparison behavior matters.

## Strings

Strings are mostly used in testbenches and system tasks:

```verilog
$display("Value = %h", Value);
```

## Keywords

Common Verilog keywords:

```verilog
always
and
assign
begin
case
default
else
end
endcase
endmodule
for
function
if
initial
input
inout
module
negedge
or
output
parameter
posedge
reg
task
wire
```

Do not use keywords as signal or module names.

## Source File Skeleton

```verilog
`timescale 1ns/1ps

module Example
(
    input  wire Clock,
    input  wire Reset,
    output reg  Done
);
    always @(posedge Clock)
    begin
        if (Reset)
        begin
            Done <= 1'b0;
        end
        else
        begin
            Done <= 1'b1;
        end
    end
endmodule
```

Minimal combinational module:

```verilog
module And2
(
    input  wire A,
    input  wire B,
    output wire Y
);
    assign Y = A & B;
endmodule
```

Every design unit is wrapped by `module` and `endmodule`. Port declarations describe the boundary, while declarations and assignments inside the module describe the hardware behind that boundary.

## Related Notes

- [[Verilog]]
- [[Verilog Data Types and Operators]]
- [[Verilog Compiler Directives and System Tasks]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 2 and 6.
- YouTube: [Modules, Number Representations & Comments](https://www.youtube.com/watch?v=IP_8QJ5k2I8)
