---
title: Behavioral Modeling
aliases:
  - Behavioral Verilog
---
**Behavioral Modeling** uses procedural statements inside `always`, `initial`, `function`, and `task` blocks. It is used for both synthesizable RTL and simulation-only testbench code, so context matters.

Behavioral Verilog can look like software, but it still describes hardware. The most important question is not "what line runs first in the file?" The important question is "what hardware updates this signal, and when does that hardware react?"

## Continuous vs Procedural

Continuous assignment:

```verilog
assign Y = A & B;
```

Procedural assignment:

```verilog
always @(*)
begin
    Y = A & B;
end
```

Both can describe combinational logic. The difference is expression style:

| Style | Reads like | Common use |
| --- | --- | --- |
| `assign Y = A & B;` | `Y` is continuously connected to `A & B` | Simple combinational expressions |
| `always @(*) begin ... end` | Recompute procedural statements whenever inputs change | Combinational logic with `if`, `case`, loops, and temporary variables |

Outside procedural blocks, Verilog statements are concurrent. This means the order of two `assign` statements in the file does not make one "run before" the other. Inside an `always` block, statements execute procedurally when that block is triggered.

## How To Read `always`

Basic shape:

```verilog
always @(event_expression)
begin
    // procedural statements
end
```

Read it as:

```text
Always wait for this event, then run the block.
When the block finishes, go back and wait again.
```

The `@(...)` part is called an event control or sensitivity list. It says what causes the block to run.

| Syntax | How to read it | Typical use |
| --- | --- | --- |
| `always @(*)` | Run whenever any signal read by the block changes | Combinational logic |
| `always @(A or B or Select)` | Run whenever `A`, `B`, or `Select` changes | Older explicit combinational style |
| `always @(posedge Clock)` | Run on the rising edge of `Clock` | Flip-flops/registers |
| `always @(negedge Clock)` | Run on the falling edge of `Clock` | Less common clocked logic |
| `always @(posedge Clock or posedge Reset)` | Run on rising clock edge or rising reset edge | Flip-flops with asynchronous reset |

`posedge Clock` means the moment `Clock` changes from `0` to `1`. `negedge Clock` means the moment `Clock` changes from `1` to `0`.

The `*` in `always @(*)` is shorthand for "all signals read inside this block." In modern Verilog, prefer this over manually listing signals for combinational logic because it avoids stale sensitivity lists.

## Combinational Always Block

```verilog
always @(*)
begin
    Y = 1'b0;

    if (Enable)
    begin
        Y = A & B;
    end
end
```

Read this block as:

```text
Whenever Enable, A, or B changes, recompute Y.
First set Y to 0.
If Enable is true, replace Y with A & B.
```

Rules:

- Use `always @(*)` for combinational logic.
- Use blocking assignment `=`.
- Assign every output on every path.
- Give outputs default values at the top of the block.

The default assignment is important:

```verilog
Y = 1'b0;
```

It says what `Y` should be when no later branch assigns it. Without that default, the hardware may need to remember the previous value, which means a latch.

Bad combinational block:

```verilog
always @(*)
begin
    if (Enable)
    begin
        Y = A;
    end
end
```

If `Enable` is false, this block does not assign `Y`. Synthesis preserves the old value by inferring a latch.

Better:

```verilog
always @(*)
begin
    Y = 1'b0;

    if (Enable)
    begin
        Y = A;
    end
end
```

## Clocked Always Block

```verilog
always @(posedge Clock)
begin
    if (Reset)
    begin
        Count <= 8'd0;
    end
    else
    begin
        Count <= Count + 8'd1;
    end
end
```

Read this block as:

```text
On each rising edge of Clock, update Count.
If Reset is true at that edge, load zero.
Otherwise load Count + 1.
```

Rules:

- Use edge-sensitive event control for flip-flops.
- Use nonblocking assignment `<=`.
- Put reset and enable behavior in a clear priority order.

This block describes storage. `Count` does not continuously follow `Count + 1`; it changes only on a clock edge.

Common clocked shape:

```verilog
always @(posedge Clock)
begin
    if (Reset)
    begin
        Q <= 1'b0;
    end
    else if (Enable)
    begin
        Q <= D;
    end
end
```

Read the priority from top to bottom: reset wins over enable, and enable controls whether the register loads a new value.

## Asynchronous Reset

```verilog
always @(posedge Clock or posedge Reset)
begin
    if (Reset)
    begin
        Q <= 1'b0;
    end
    else
    begin
        Q <= D;
    end
end
```

The reset signal is in the sensitivity list because it can update `Q` without waiting for a clock edge.

Read it as:

```text
Run this block on the clock edge or immediately when Reset rises.
If Reset caused the block to run, the first branch clears Q.
Otherwise the clock edge loads D.
```

For this style, the reset condition must usually be the first `if` branch:

```verilog
if (Reset)
begin
    Q <= 1'b0;
end
else
begin
    Q <= D;
end
```

Synchronous reset is different. It only checks reset on the clock edge:

```verilog
always @(posedge Clock)
begin
    if (Reset)
    begin
        Q <= 1'b0;
    end
    else
    begin
        Q <= D;
    end
end
```

Both styles are common. Use the reset style expected by the target FPGA, ASIC flow, or surrounding code.

## Blocking Assignment

Blocking assignment uses `=`. It executes in order within the current procedural block:

```verilog
always @(*)
begin
    Temp = A & B;
    Y = Temp | C;
end
```

Use it for combinational calculations. The second assignment sees the new value of `Temp`.

Read it as:

```text
Compute Temp now.
Then compute Y from that new Temp value.
```

## Nonblocking Assignment

Nonblocking assignment uses `<=`. Right-hand sides are sampled and left-hand sides update together:

```verilog
always @(posedge Clock)
begin
    A <= B;
    B <= A;
end
```

This swaps two registers. With blocking assignment it would not mean the same thing.

Read it as:

```text
At the clock edge, sample old B for A.
At the same clock edge, sample old A for B.
After sampling, update both A and B together.
```

In a clocked pipeline, this means the second register sees the old value:

```verilog
always @(posedge Clock)
begin
    X <= A;
    Y <= X;
end
```

Both right-hand sides are evaluated for the same clock edge, then both left-hand sides update. Mixing `=` and `<=` without a specific reason is a common simulation bug.

Practical rule:

| Logic type | Block | Assignment |
| --- | --- | --- |
| Combinational | `always @(*)` | Blocking `=` |
| Sequential | `always @(posedge Clock)` | Nonblocking `<=` |
| Testbench stimulus | `initial` / `always` | Either, but be intentional |

## If / Else

```verilog
always @(*)
begin
    if (Select)
    begin
        Y = A;
    end
    else
    begin
        Y = B;
    end
end
```

If a combinational `if` has no assignment in some path, synthesis infers storage.

Read `if` / `else` as hardware selection, not as a CPU branch. In combinational logic, this usually becomes a multiplexer.

Two-input MUX:

```verilog
always @(*)
begin
    if (Select)
    begin
        Y = B;
    end
    else
    begin
        Y = A;
    end
end
```

In hardware terms:

```text
if Select is 1, Y is B.
otherwise, Y is A.
```

## Case

```verilog
always @(*)
begin
    case (Opcode)
        3'b000:
        begin
            Result = A + B;
        end
        3'b001:
        begin
            Result = A - B;
        end
        3'b010:
        begin
            Result = A & B;
        end
        default:
        begin
            Result = {Width{1'b0}};
        end
    endcase
end
```

Use `default` for combinational decode. This avoids accidental latches and defines behavior for unused encodings.

Read `case` as a multi-way selector. It is often clearer than a long `if` / `else if` chain when decoding opcodes, state values, or MUX selects.

Four-input MUX:

```verilog
always @(*)
begin
    case (Select)
        2'b00:
        begin
            Y = A;
        end
        2'b01:
        begin
            Y = B;
        end
        2'b10:
        begin
            Y = C;
        end
        2'b11:
        begin
            Y = D;
        end
        default:
        begin
            Y = 1'b0;
        end
    endcase
end
```

## `case`, `casex`, and `casez`

| Statement | Behavior |
| --- | --- |
| `case` | Exact comparison |
| `casex` | Treats `x`, `z`, and `?` as don't-care bits |
| `casez` | Treats `z` and `?` as don't-care bits |

Prefer `case` for most RTL. If a wildcard decode is needed, prefer `casez` over `casex` because `casex` can hide unknown values in simulation.

```verilog
casez (Interrupts)
    4'b1???:
    begin
        Vector = 2'd3;
    end
    4'b01??:
    begin
        Vector = 2'd2;
    end
    4'b001?:
    begin
        Vector = 2'd1;
    end
    default:
    begin
        Vector = 2'd0;
    end
endcase
```

## Loops

Static `for` loops are often synthesizable:

```verilog
integer Index;

always @(*)
begin
    Parity = 1'b0;

    for (Index = 0; Index < 8; Index = Index + 1)
    begin
        Parity = Parity ^ Data[Index];
    end
end
```

In synthesizable combinational RTL, this does not create a runtime software loop. The synthesis tool usually unrolls the loop into repeated hardware.

Read the parity example as:

```text
Start with parity = 0.
XOR in each bit of Data.
The resulting hardware is an XOR reduction tree or chain.
```

`while`, `forever`, and `repeat` are mostly testbench constructs unless the synthesis tool can prove finite hardware. Use them carefully in RTL.

## Timing Controls

Simulation delay:

```verilog
#10 Enable = 1'b1;
```

Event control:

```verilog
@(posedge Clock);
```

Wait:

```verilog
wait (Ready);
```

These are useful in testbenches. Delays and waits are generally not synthesizable.

There is an important difference between event control as a block trigger and event control inside a block:

```verilog
always @(posedge Clock)
begin
    Q <= D;
end
```

This is a synthesizable clocked block.

```verilog
initial
begin
    @(posedge Clock);
    Enable = 1'b1;
end
```

This is testbench-style code that waits for a clock edge before driving stimulus.

## Initial Blocks

```verilog
initial
begin
    Clock = 1'b0;
    Reset = 1'b1;
end
```

`initial` is primarily for simulation. Some FPGA tools support initial register or memory values, but portable ASIC-style RTL should not depend on that unless the flow explicitly supports it.

## Quick Reading Checklist

When you see an `always` block, ask:

1. What triggers it?
2. Does it describe combinational logic or clocked storage?
3. Are assignments blocking `=` or nonblocking `<=`?
4. Does every combinational output get assigned on every path?
5. Is reset synchronous or asynchronous?

Examples:

| Code | First interpretation |
| --- | --- |
| `always @(*)` | Combinational recalculation |
| `always @(posedge Clock)` | Rising-edge-triggered registers |
| `always @(posedge Clock or posedge Reset)` | Registers with asynchronous reset |
| `@(posedge Clock);` inside `initial` | Testbench waits for a clock edge |

## Related Notes

- [[_Verilog|Verilog]]
- [[Verilog State Machines]]
- [[Verilog Testing and Testbenches]]
- [[Verilog Synthesis and Component Inference]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 8, 9, and 10.
- YouTube: [Introduction to Behavioral Modeling in Verilog](https://www.youtube.com/watch?v=dTCiUa-s2YE)
- YouTube: [Inter vs Intra Assignment Explained](https://www.youtube.com/watch?v=VG5xdgxjtOY)
- YouTube: [Loops & Case Statements in Verilog](https://www.youtube.com/watch?v=g1MkRBDuM1Y)
