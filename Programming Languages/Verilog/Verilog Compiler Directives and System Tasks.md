# Verilog Compiler Directives and System Tasks

Compiler directives affect how Verilog source is compiled. System tasks and functions are built-in simulation utilities whose names begin with `$`.

## Compiler Directives

Compiler directives begin with a backtick:

```verilog
`timescale 1ns/1ps
`define Width 8
`include "common.vh"
```

They are processed before or during compilation and are not normal runtime statements.

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

For local RTL constants, prefer `localparam` over macros when possible. Macros are global text substitution and can collide across files.

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

## Common System Tasks

| Task | Use |
| --- | --- |
| `$display(...)` | Print immediately |
| `$strobe(...)` | Print at the end of the current time step |
| `$monitor(...)` | Print when arguments change |
| `$finish` | End simulation |
| `$stop` | Pause simulation |
| `$dumpfile(...)` | Select VCD output file |
| `$dumpvars(...)` | Select signals for VCD dumping |
| `$time` | Current simulation time |
| `$realtime` | Current simulation time as real value |
| `$random` | Pseudo-random integer |
| `$readmemh(...)` | Load memory from hex file |
| `$readmemb(...)` | Load memory from binary file |

## Printing Values

```verilog
initial
begin
    $display("time=%0t data=%h valid=%b", $time, Data, Valid);
end
```

Format specifiers:

| Specifier | Meaning |
| --- | --- |
| `%b` | Binary |
| `%d` | Decimal |
| `%h` | Hexadecimal |
| `%o` | Octal |
| `%c` | Character |
| `%s` | String |
| `%t` | Time |

## Waveform Dumping

```verilog
initial
begin
    $dumpfile("waves.vcd");
    $dumpvars(0, Testbench);
end
```

The first argument to `$dumpvars` controls hierarchy depth. `0` dumps all levels below the named scope.

## Memory Initialization

```verilog
reg [7:0] Memory [0:255];

initial
begin
    $readmemh("program.hex", Memory);
end
```

This is common in testbenches and FPGA flows. For ASIC synthesis, confirm whether memory initialization is supported by the target flow.

## Synthesizability

Most system tasks are ignored or rejected by synthesis tools. Keep them in testbench code unless the synthesis tool explicitly documents support.

## Related Notes

- [[Verilog]]
- [[Verilog Testing and Testbenches]]
- [[Verilog Syntax and Literals]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 15 and 16.
