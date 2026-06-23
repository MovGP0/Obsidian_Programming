---
title: Tasks
---
**Tasks** package reusable procedural code inside a module. They are most useful in testbenches or for procedural code with multiple outputs.

## Basic Task

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

## Task Arguments

Classic Verilog tasks can use `input`, `output`, and `inout` arguments:

```verilog
task ExpectValue;
    input [7:0] Actual;
    input [7:0] Expected;
    begin
        if (Actual !== Expected)
        begin
            $display("ERROR: actual=%h expected=%h", Actual, Expected);
            $finish;
        end
    end
endtask
```

Call it from a testbench:

```verilog
initial
begin
    ExpectValue(Result, 8'hA5);
end
```

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

- [[_Verilog|Verilog]]
- [[Verilog Functions]]
- [[Verilog Behavioral Modeling]]
- [[Verilog Testing and Testbenches]]
- [[Verilog System Tasks]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", section 12.
