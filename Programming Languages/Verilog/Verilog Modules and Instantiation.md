---
title: Modules and Instantiation
---
A **module** is the main design unit in Verilog. It defines a block of hardware with ports, internal signals, assignments, procedures, and child module instances.

## Module Declaration

```verilog
module Adder
(
    input  wire [7:0] A,
    input  wire [7:0] B,
    output wire [8:0] Sum
);
    assign Sum = {1'b0, A} + {1'b0, B};
endmodule
```

The module name is the reusable template. Each instantiation creates one hardware instance of that template.

## Ports

| Direction | Use |
| --- | --- |
| `input` | Signal driven from outside the module |
| `output` | Signal driven by the module |
| `inout` | Bidirectional signal, usually for tri-state buses or pads |

Outputs assigned in procedural blocks are declared as `reg`:

```verilog
module Register
(
    input  wire Clock,
    input  wire D,
    output reg  Q
);
    always @(posedge Clock)
    begin
        Q <= D;
    end
endmodule
```

Outputs driven by continuous assignments are declared as `wire`:

```verilog
output wire Y;
assign Y = A & B;
```

## Internal Signals

```verilog
wire Carry;
reg  [3:0] State;
```

Use `wire` for net connections and `reg` for procedural variables.

## Continuous Assignment

```verilog
assign Y = (A & B) | C;
```

Continuous assignments are concurrent. Their order in the file does not define execution order.

## Named Instantiation

```verilog
Adder
AdderInstance
(
    .A(A),
    .B(B),
    .Sum(Sum)
);
```

Prefer named port connections. They are robust when the child module's port order changes.

Another common compact style keeps the module type, instance name, and named ports together:

```verilog
full_adder FullAdder0
(
    .A(A),
    .B(B),
    .CarryIn(CarryIn),
    .Sum(Sum),
    .CarryOut(CarryOut)
);
```

## Positional Instantiation

```verilog
Adder AdderInstance(A, B, Sum);
```

This is shorter but fragile. A port order change can silently wire the design incorrectly.

For learning examples this is often written as:

```verilog
full_adder FullAdder0(A, B, CarryIn, Sum, CarryOut);
```

Use it only when the module is tiny and stable. In larger designs, connect-by-name avoids bugs where code still compiles but the wrong signals are connected.

## Parameterized Modules

```verilog
module RegisterN
#(
    parameter Width = 8
)
(
    input  wire             Clock,
    input  wire [Width-1:0] D,
    output reg  [Width-1:0] Q
);
    always @(posedge Clock)
    begin
        Q <= D;
    end
endmodule
```

Instantiation:

```verilog
RegisterN
#(
    .Width(16)
)
RegisterInstance
(
    .Clock(Clock),
    .D(DataIn),
    .Q(DataOut)
);
```

## Top-Level Module

The top-level module is the root of the design. For FPGA and ASIC flows, its ports become the external interface after they are mapped to device pins or chip pads.

Typical top-level rules:

- Keep the interface explicit.
- Avoid unused ports.
- Name clock and reset consistently.
- Do not instantiate modules inside `always` or `initial` blocks.
- Keep testbench-only code out of the top-level synthesis module.

## Structural Gate-Level Style

Verilog includes primitive gates:

```verilog
and AndInstance(Y, A, B);
or  OrInstance(Z, Y, C);
not NotInstance(N, A);
```

This style is useful for simple gate-level examples and generated netlists. RTL using `assign` and `always` blocks is usually clearer for hand-written designs.

Half adder in gate-level style:

```verilog
module HalfAdder
(
    input  wire A,
    input  wire B,
    output wire Sum,
    output wire Carry
);
    xor SumGate(Sum, A, B);
    and CarryGate(Carry, A, B);
endmodule
```

Full adder by composition:

```verilog
module FullAdder
(
    input  wire A,
    input  wire B,
    input  wire CarryIn,
    output wire Sum,
    output wire CarryOut
);
    wire Sum1;
    wire Carry1;
    wire Carry2;

    HalfAdder HalfAdder0
    (
        .A(A),
        .B(B),
        .Sum(Sum1),
        .Carry(Carry1)
    );

    HalfAdder HalfAdder1
    (
        .A(Sum1),
        .B(CarryIn),
        .Sum(Sum),
        .Carry(Carry2)
    );

    or CarryGate(CarryOut, Carry1, Carry2);
endmodule
```

This is useful for seeing the structure. In RTL intended for synthesis, the same intent is usually clearer as arithmetic:

```verilog
assign {CarryOut, Sum} = A + B + CarryIn;
```

The synthesis tool infers the adder hardware from the arithmetic expression.

## Tri-State Buffers

```verilog
assign Bus = Enable ? Data : 1'bz;
```

Internal tri-states are often not supported in FPGA fabric and may be converted to multiplexers. ASIC flows may support tri-state structures, but they require careful bus ownership rules.

## Related Notes

- [[_Verilog|Verilog]]
- [[Verilog Behavioral Modeling]]
- [[Verilog Concatenation and Replication]]
- [[Verilog Synthesis and Component Inference]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 3 and 7.
- YouTube: [Port Connection Rules in Verilog](https://www.youtube.com/watch?v=C219U48xX04)
- YouTube: [2-Bit Comparator using Gate Level Modeling in Verilog](https://www.youtube.com/watch?v=7r6BRVTjStc)
