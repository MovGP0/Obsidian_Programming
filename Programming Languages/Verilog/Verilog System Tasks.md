---
title: System Tasks
---
**System tasks and functions** are built-in simulation utilities whose names begin with `$`.

They are most common in testbenches. Most are ignored or rejected by synthesis tools, so keep them out of synthesizable RTL unless the target flow explicitly documents support.

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

## `$display`, `$strobe`, and `$monitor`

| Task | Use |
| --- | --- |
| `$display` | Prints immediately when executed |
| `$strobe` | Prints at the end of the current simulation time step |
| `$monitor` | Prints whenever one of its arguments changes |

Example:

```verilog
initial
begin
    $monitor("time=%0t state=%0d value=%h", $time, State, Value);
end
```

Use `$display` for explicit checkpoints. Use `$monitor` when value changes are the interesting event.

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

Use `$readmemb` for binary text files and `$readmemh` for hexadecimal text files.

## Simulation Control

```verilog
initial
begin
    #1000;
    $display("Timeout");
    $finish;
end
```

Use `$finish` to end the simulation. Use `$stop` when you want to pause in an interactive simulator.

## Synthesizability

Most system tasks are simulation-only:

- `$display`
- `$monitor`
- `$strobe`
- `$finish`
- `$stop`
- `$dumpfile`
- `$dumpvars`
- `$random`

Memory initialization tasks such as `$readmemh` and `$readmemb` may be supported by FPGA tools for memory initialization, but that is tool-specific.

## Related Notes

- [[_Verilog|Verilog]]
- [[Verilog Compiler Directives]]
- [[Verilog Testing and Testbenches]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 15 and 16.
