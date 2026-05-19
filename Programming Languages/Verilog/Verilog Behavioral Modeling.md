# Verilog Behavioral Modeling

Behavioral Verilog uses procedural statements inside `always`, `initial`, `function`, and `task` blocks. It is used for both synthesizable RTL and simulation-only testbench code, so context matters.

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

Both can describe combinational logic, but procedural assignments allow `if`, `case`, loops, and local temporary variables.

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

Rules:

- Use `always @(*)` for combinational logic.
- Use blocking assignment `=`.
- Assign every output on every path.
- Give outputs default values at the top of the block.

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

Rules:

- Use edge-sensitive event control for flip-flops.
- Use nonblocking assignment `<=`.
- Put reset and enable behavior in a clear priority order.

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

## Blocking Assignment

Blocking assignment uses `=`. It executes in order within the current procedural block:

```verilog
always @(*)
begin
    Temp = A & B;
    Y = Temp | C;
end
```

Use it for combinational calculations.

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

## Initial Blocks

```verilog
initial
begin
    Clock = 1'b0;
    Reset = 1'b1;
end
```

`initial` is primarily for simulation. Some FPGA tools support initial register or memory values, but portable ASIC-style RTL should not depend on that unless the flow explicitly supports it.

## Related Notes

- [[Verilog]]
- [[Verilog State Machines]]
- [[Verilog Testing and Testbenches]]
- [[Verilog Synthesis and Component Inference]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 8, 9, and 10.
