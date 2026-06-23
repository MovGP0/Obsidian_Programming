---
title: Compiler Directives
---
**Compiler directives** affect how Verilog source is compiled. They begin with a backtick and are processed before or during compilation. They are not normal runtime statements.

## Common Directives

```verilog
`timescale 1ns/1ps
`define Width 8
`include "common.vh"
```

Directives are handled by the Verilog preprocessor/compiler. They can affect source text, file inclusion, conditional compilation, and delay interpretation.

## Timescale

```verilog
`timescale 1ns/1ps
```

Format:

```verilog
`timescale <time_unit>/<time_precision>
```

The time unit controls delay values such as `#5`. The precision controls rounding.

Example:

```verilog
`timescale 1ns/1ps

initial
begin
    #10 Signal = 1'b1;    // 10 ns
end
```

## Macro Definitions

```verilog
`define StateIdle 2'd0
`define StateRun  2'd1
```

Use:

```verilog
if (State == `StateIdle)
begin
    NextState = `StateRun;
end
```

Macros require a backtick when used. They are global text substitution after inclusion, so they can collide across files.

For local RTL constants, prefer `localparam` when possible:

```verilog
localparam [1:0] StateIdle = 2'd0;
localparam [1:0] StateRun  = 2'd1;
```

Use macros for shared include-file definitions only when the wider compile flow needs them.

## Include Directive

```verilog
`include "defines.vh"
```

Use includes for shared macro definitions or declarations required by older Verilog flows. Avoid hiding major design logic in include files.

## Conditional Compilation

```verilog
`ifdef SIMULATION
initial
begin
    $display("Simulation build");
end
`endif
```

This is useful for simulation-only instrumentation, but keep synthesis and simulation behavior aligned.

Common conditional directives:

| Directive | Use |
| --- | --- |
| `` `ifdef NAME `` | Compile following text if `NAME` is defined |
| `` `ifndef NAME `` | Compile following text if `NAME` is not defined |
| `` `else `` | Alternate branch |
| `` `elsif NAME `` | Else-if branch |
| `` `endif `` | End conditional compilation block |

## Related Notes

- [[_Verilog|Verilog]]
- [[Verilog System Tasks]]
- [[Verilog Syntax and Literals]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 15 and 16.
