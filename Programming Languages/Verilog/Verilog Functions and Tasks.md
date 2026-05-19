# Verilog Functions and Tasks

Functions and tasks package reusable procedural code inside a module. Functions are most useful for reusable combinational expressions. Tasks are most useful in testbenches or for procedural code with multiple outputs.

## Functions

A function returns one value and is used as an expression operand.

```verilog
function [7:0] Max8;
    input [7:0] A;
    input [7:0] B;
    begin
        if (A > B)
        begin
            Max8 = A;
        end
        else
        begin
            Max8 = B;
        end
    end
endfunction
```

Call it from an assignment or procedure:

```verilog
assign Larger = Max8(A, B);
```

## Function Return Value

The function name is also the implicit return variable. At least one statement must assign to it:

```verilog
function [3:0] Increment;
    input [3:0] Value;
    begin
        Increment = Value + 4'd1;
    end
endfunction
```

## Function Rules

Classic Verilog functions:

- Are declared inside a module.
- Return exactly one value.
- Can have inputs.
- Cannot have output or inout ports.
- Cannot contain `#`, `@`, or `wait` timing controls.
- Cannot call tasks.
- Should describe combinational logic when used in synthesizable RTL.

## Function Used for Decode

```verilog
function [3:0] DecodeAlu;
    input [2:0] Opcode;
    input [3:0] A;
    input [3:0] B;
    begin
        case (Opcode)
            3'b000:
            begin
                DecodeAlu = A + B;
            end
            3'b001:
            begin
                DecodeAlu = A - B;
            end
            3'b010:
            begin
                DecodeAlu = A & B;
            end
            default:
            begin
                DecodeAlu = 4'd0;
            end
        endcase
    end
endfunction
```

Use:

```verilog
assign Result = DecodeAlu(Opcode, A, B);
```

## Avoid Latch-Like Functions

Bad:

```verilog
function [3:0] SelectValue;
    input Enable;
    input [3:0] A;
    begin
        if (Enable)
        begin
            SelectValue = A;
        end
    end
endfunction
```

The return value is not assigned on every path. Fix it:

```verilog
function [3:0] SelectValue;
    input Enable;
    input [3:0] A;
    begin
        SelectValue = 4'd0;

        if (Enable)
        begin
            SelectValue = A;
        end
    end
endfunction
```

## Tasks

A task does not return a value directly. It can have input, output, and inout arguments.

```verilog
task And4;
    input  [3:0] A;
    input  [3:0] B;
    output [3:0] Y;
    integer Index;
    begin
        for (Index = 0; Index < 4; Index = Index + 1)
        begin
            Y[Index] = A[Index] & B[Index];
        end
    end
endtask
```

Call it from a procedure:

```verilog
always @(*)
begin
    And4(A, B, Result);
end
```

## Tasks in Testbenches

Tasks are especially useful for reusable stimulus:

```verilog
task PulseStart;
    begin
        Start = 1'b1;
        @(posedge Clock);
        Start = 1'b0;
    end
endtask
```

This task contains event control, so it is testbench-only.

## Function vs Task

| Feature | Function | Task |
| --- | --- | --- |
| Return value | One implicit return value | No implicit return value |
| Arguments | Inputs only in classic Verilog | Input, output, and inout |
| Timing control | Not allowed | Useful in testbenches |
| Expression use | Can be used inside expressions | Called as a statement |
| Typical RTL use | Combinational helper | Rare, tool-dependent |
| Typical testbench use | Calculation/check helper | Stimulus sequence |

## Related Notes

- [[Verilog]]
- [[Verilog Behavioral Modeling]]
- [[Verilog Testing and Testbenches]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 11 and 12.
