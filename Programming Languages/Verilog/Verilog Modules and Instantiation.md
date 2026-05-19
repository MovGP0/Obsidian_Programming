# Verilog Modules and Instantiation

A module is the main design unit in Verilog. It defines a block of hardware with ports, internal signals, assignments, procedures, and child module instances.

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

## Positional Instantiation

```verilog
Adder AdderInstance(A, B, Sum);
```

This is shorter but fragile. A port order change can silently wire the design incorrectly.

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

## Tri-State Buffers

```verilog
assign Bus = Enable ? Data : 1'bz;
```

Internal tri-states are often not supported in FPGA fabric and may be converted to multiplexers. ASIC flows may support tri-state structures, but they require careful bus ownership rules.

## Related Notes

- [[Verilog]]
- [[Verilog Behavioral Modeling]]
- [[Verilog Synthesis and Component Inference]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 3 and 7.
