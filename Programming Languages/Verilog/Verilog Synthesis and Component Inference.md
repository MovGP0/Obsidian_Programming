---
title: Synthesis and Component Inference
---
**Synthesis** converts Verilog RTL into hardware: gates, flip-flops, latches, multiplexers, adders, memories, and tri-state structures. The same simulation behavior can sometimes synthesize into very different hardware depending on coding style.

## What Synthesis Infers

| Code Pattern | Typical Hardware |
| --- | --- |
| `assign Y = A & B;` | Combinational gate logic |
| Complete `always @(*)` assignment | Combinational logic |
| Incomplete `always @(*)` assignment | Latch |
| `always @(posedge Clock)` | Flip-flop |
| `if` / `case` selecting signals | Multiplexer |
| `+` / `-` | Adder or subtracter |
| `*` | Multiplier or DSP block |
| Conditional assignment to `1'bz` | Tri-state buffer, if supported |
| Register array with supported pattern | Memory or flip-flop array |

## Combinational Logic

```verilog
assign Y = (A & B) | C;
```

or:

```verilog
always @(*)
begin
    Y = (A & B) | C;
end
```

Both infer combinational logic.

## Latches

A latch is inferred when a procedural output needs to remember its previous value:

```verilog
always @(*)
begin
    if (Enable)
    begin
        Y = A;
    end
end
```

Fix:

```verilog
always @(*)
begin
    Y = B;

    if (Enable)
    begin
        Y = A;
    end
end
```

Intentional latches exist, but they are rarely wanted in basic RTL.

## Flip-Flops

```verilog
always @(posedge Clock)
begin
    Q <= D;
end
```

With synchronous reset:

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

With asynchronous reset:

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

## Clock Enable

```verilog
always @(posedge Clock)
begin
    if (Reset)
    begin
        Count <= 8'd0;
    end
    else if (Enable)
    begin
        Count <= Count + 8'd1;
    end
end
```

This infers flip-flops with enable behavior. Prefer this over manually gating the clock.

## Multiplexers

```verilog
assign Y = Select ? A : B;
```

or:

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
        default:
        begin
            Y = D;
        end
    endcase
end
```

Large multiplexers are often clearer as `case` statements.

## Adders and Subtracters

```verilog
assign Sum = A + B;
assign Difference = A - B;
```

Make carry width explicit:

```verilog
assign WideSum = {1'b0, A} + {1'b0, B};
```

## Tri-State Buffers

```verilog
assign Bus = Enable ? Data : 1'bz;
```

Check target support. FPGA internal logic usually does not support true internal tri-states; top-level I/O pads may.

## Memories

```verilog
reg [7:0] Memory [0:255];

always @(posedge Clock)
begin
    if (WriteEnable)
    begin
        Memory[Address] <= WriteData;
    end

    ReadData <= Memory[Address];
end
```

Whether this infers block RAM, distributed RAM, flip-flops, or an ASIC memory macro depends on the tool and target library.

## Synthesis Checklist

- [ ] No unintended latches.
- [ ] No unsynthesizable delays in RTL.
- [ ] No testbench system tasks in synthesis modules.
- [ ] All clocked blocks use clear clock and reset rules.
- [ ] Widths are explicit where arithmetic crosses vector sizes.
- [ ] Memories follow the target's inference template.
- [ ] Clock gating is avoided unless intentionally implemented with supported cells.
- [ ] Lint warnings are reviewed.

## Related Notes

- [[_Verilog|Verilog]]
- [[Verilog Behavioral Modeling]]
- [[Verilog State Machines]]
- [[Verilog Data Types]]
- [[Verilog Operators]]
- [[Verilog Concatenation and Replication]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", section 13.
