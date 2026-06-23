# Verilog

Verilog is a hardware description language (HDL) for describing digital circuits. A Verilog design can be simulated, synthesized for an FPGA, or synthesized into an ASIC netlist when it is written in the synthesizable subset.

## Mental Model

- A `module` is a hardware block.
- Ports are the external pins of a module.
- `wire` values are driven by continuous assignments, gates, or module outputs.
- `reg` values are assigned in procedural blocks; they may synthesize to combinational logic, latches, or flip-flops depending on the code style.
- `assign` statements are concurrent and continuously active.
- `always` and `initial` blocks are procedures, but multiple procedures still run concurrently in simulation.
- Testbench constructs can use time, delays, printing, file I/O, random values, and waveform dumping. Most of those constructs are not synthesizable.

Verilog looks like software, but it describes hardware. Code order only matters inside procedural blocks. Outside them, modules, gate instances, and continuous assignments exist at the same time.

## Common First Module

```verilog
module AndGate
(
    input  wire A,
    input  wire B,
    output wire Y
);
    assign Y = A & B;
endmodule
```

## Common Sequential Module

```verilog
module Counter
#(
    parameter Width = 8
)
(
    input  wire             Clock,
    input  wire             Reset,
    input  wire             Enable,
    output reg  [Width-1:0] Value
);
    always @(posedge Clock)
    begin
        if (Reset)
        begin
            Value <= {Width{1'b0}};
        end
        else if (Enable)
        begin
            Value <= Value + 1'b1;
        end
    end
endmodule
```

## Quick Syntax Reference

| Concept | Syntax |
| --- | --- |
| Line comment | `// comment` |
| Block comment | `/* comment */` |
| Module | `module Name (...); ... endmodule` |
| Continuous assignment | `assign Y = A & B;` |
| Combinational procedure | `always @(*) begin ... end` |
| Clocked procedure | `always @(posedge Clock) begin ... end` |
| Blocking assignment | `Y = A;` |
| Nonblocking assignment | `Q <= D;` |
| Vector | `wire [7:0] ByteValue;` |
| Bit select | `ByteValue[3]` |
| Part select | `ByteValue[7:4]` |
| Concatenation | `{A, B}` |
| Replication | `{8{1'b0}}` |
| Parameter | `parameter Width = 8` |
| Local parameter | `localparam Idle = 2'd0` |

## Literals

```verilog
1'b0        // 1-bit binary zero
4'b1010     // 4-bit binary
8'hFF       // 8-bit hexadecimal
16'd1000    // 16-bit decimal
32'hDEADBEEF
```

Use explicit widths in synthesizable RTL. Unsized constants can produce width-extension surprises.

## Assignment Rules of Thumb

| Context | Preferred Assignment | Reason |
| --- | --- | --- |
| `assign` statement | `assign Y = ...;` | Continuous combinational connection |
| `always @(*)` | Blocking `=` | Models ordered combinational calculation |
| `always @(posedge Clock)` | Nonblocking `<=` | Models simultaneous flip-flop updates |
| Testbench stimulus | Either, intentionally | Simulation-only code can be procedural |

## Synthesizable vs Simulation-Only

Usually synthesizable:

- `module`
- `assign`
- `always @(*)`
- `always @(posedge Clock)`
- `if`, `else`, `case`
- Static `for` loops
- `generate`
- Combinational `function`
- Basic arithmetic, bitwise, logical, shift, concatenation, and reduction operators

Usually simulation-only:

- `initial`, unless the target synthesis tool explicitly supports initialization
- `#` delays
- `$display`, `$monitor`, `$finish`, `$dumpfile`, `$dumpvars`
- File I/O
- Random stimulus
- `wait` and timing-control-heavy procedural code

## Good RTL Habits

- Use one clock domain until there is a clear reason not to.
- Reset control state explicitly.
- Prefer clock enables over gated clocks.
- Use blocking assignments in combinational blocks.
- Use nonblocking assignments in clocked blocks.
- Assign every combinational output on every path.
- Include a `default` branch in combinational `case` statements.
- Prefer named module port connections.
- Keep synthesizable RTL and testbench code separate.
- Lint before synthesis.

## Beginner Learning Path

| Topic | Where to continue |
| --- | --- |
| Modules, comments, literals, and four-state values | [[Verilog Syntax and Literals]] |
| `wire`, `reg`, `integer`, `real`, `time`, vectors, and operators | [[Verilog Data Types and Operators]] |
| Port connection by name/order, structural style, half adders, and full adders | [[Verilog Modules and Instantiation]] |
| `always` blocks, `if`, `case`, loops, MUXes, and assignment timing | [[Verilog Behavioral Modeling]] |
| `$display`, `$monitor`, clocks, reset stimulus, and DUT structure | [[Verilog Testing and Testbenches]] |
| Counters, shift registers, and FSM organization | [[Verilog State Machines]] |

## Dedicated Notes

- [[Verilog Syntax and Literals]]
- [[Verilog Data Types and Operators]]
- [[Verilog Modules and Instantiation]]
- [[Verilog Behavioral Modeling]]
- [[Verilog Functions and Tasks]]
- [[Verilog State Machines]]
- [[Verilog Testing and Testbenches]]
- [[Verilog Compiler Directives and System Tasks]]
- [[Verilog Synthesis and Component Inference]]
- [[Verilog Editors]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", local PDF: [PetervrlK.pdf](file:///C:/Users/Johann.Dirry/Downloads/PetervrlK.pdf)
- YouTube playlist: [Verilog HDL complete course](https://www.youtube.com/playlist?list=PLqPfWwayuBvPYYQS2h5p622vGR6aZIfux)
- YouTube: [Modules, Number Representations & Comments](https://www.youtube.com/watch?v=IP_8QJ5k2I8)
- YouTube: [Verilog Data Types Explained](https://www.youtube.com/watch?v=R57WWiEqkLQ)
- YouTube: [Port Connection Rules in Verilog](https://www.youtube.com/watch?v=C219U48xX04)
- YouTube: [2-Bit Comparator using Gate Level Modeling in Verilog](https://www.youtube.com/watch?v=7r6BRVTjStc)
- YouTube: [Logical Operators, Shift & Concatenation in Verilog](https://www.youtube.com/watch?v=s7FXSFFniWQ)
- YouTube: [Introduction to Behavioral Modeling in Verilog](https://www.youtube.com/watch?v=dTCiUa-s2YE)
- YouTube: [Inter vs Intra Assignment Explained](https://www.youtube.com/watch?v=VG5xdgxjtOY)
- YouTube: [Loops & Case Statements in Verilog](https://www.youtube.com/watch?v=g1MkRBDuM1Y)
- YouTube: [MOD-4 Synchronous Up Counter Explained](https://www.youtube.com/watch?v=CEFFm50USgA)
