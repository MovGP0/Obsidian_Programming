# Verilog Testing and Testbenches

A testbench is a simulation-only Verilog module that instantiates the design under test, drives inputs, checks outputs, and records waveforms.

## Testbench Structure

```verilog
`timescale 1ns/1ps

module CounterTests;
    reg Clock;
    reg Reset;
    reg Enable;
    wire [7:0] Value;

    Counter
    CounterInstance
    (
        .Clock(Clock),
        .Reset(Reset),
        .Enable(Enable),
        .Value(Value)
    );

    initial
    begin
        Clock = 1'b0;
        forever #5 Clock = ~Clock;
    end

    initial
    begin
        Reset = 1'b1;
        Enable = 1'b0;

        repeat (2)
        begin
            @(posedge Clock);
        end

        Reset = 1'b0;
        Enable = 1'b1;

        repeat (10)
        begin
            @(posedge Clock);
        end

        $finish;
    end
endmodule
```

For a small combinational design, the structure is the same but usually does not need a clock:

```verilog
module Mux4Tests;
    reg [1:0] Select;
    reg A;
    reg B;
    reg C;
    reg D;
    wire Y;

    Mux4 Dut
    (
        .Select(Select),
        .A(A),
        .B(B),
        .C(C),
        .D(D),
        .Y(Y)
    );

    initial
    begin
        A = 1'b0;
        B = 1'b1;
        C = 1'b0;
        D = 1'b1;

        Select = 2'b00; #10;
        Select = 2'b01; #10;
        Select = 2'b10; #10;
        Select = 2'b11; #10;

        $finish;
    end
endmodule
```

## Design Under Test

The design under test (DUT) is just a module instance:

```verilog
Counter
Dut
(
    .Clock(Clock),
    .Reset(Reset),
    .Enable(Enable),
    .Value(Value)
);
```

Use named port connections so the testbench remains readable.

## Clock Generation

```verilog
initial
begin
    Clock = 1'b0;
    forever #5 Clock = ~Clock;
end
```

With `timescale 1ns/1ps`, this is a 10 ns period clock, or 100 MHz.

## Reset Sequence

```verilog
initial
begin
    Reset = 1'b1;
    repeat (3)
    begin
        @(posedge Clock);
    end
    Reset = 1'b0;
end
```

Drive reset long enough for all clocked logic to see it.

## Self-Checking Testbench

Do not rely only on waveform inspection. Add checks:

```verilog
initial
begin
    Reset = 1'b1;
    Enable = 1'b0;
    @(posedge Clock);
    Reset = 1'b0;
    Enable = 1'b1;

    @(posedge Clock);
    @(posedge Clock);

    if (Value !== 8'd2)
    begin
        $display("ERROR: expected 2, got %0d", Value);
        $finish;
    end

    $display("PASS");
    $finish;
end
```

Use `!==` in checks when unknown values should fail the test.

## Waveform Dumping

Common VCD waveform tasks:

```verilog
initial
begin
    $dumpfile("counter.vcd");
    $dumpvars(0, CounterTests);
end
```

Open the generated VCD in a waveform viewer such as GTKWave.

## Printing

```verilog
$display("time=%0t value=%h", $time, Value);
```

Common format specifiers:

| Specifier | Meaning |
| --- | --- |
| `%b` | Binary |
| `%d` | Decimal |
| `%h` | Hexadecimal |
| `%o` | Octal |
| `%s` | String |
| `%t` | Simulation time |
| `%0d` | Decimal without leading spaces |

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

`$monitor` is useful for quick beginner testbenches because it automatically prints again when a watched value changes:

```verilog
initial
begin
    $monitor("time=%0t select=%b y=%b", $time, Select, Y);
end
```

Use `$display` when the testbench reaches a specific line. Use `$monitor` when the interesting event is a value change.

## Testbench Tasks

Reusable stimulus:

```verilog
task Tick;
    begin
        @(posedge Clock);
        #1;
    end
endtask

task ExpectValue;
    input [7:0] Expected;
    begin
        if (Value !== Expected)
        begin
            $display("ERROR: expected %h got %h", Expected, Value);
            $finish;
        end
    end
endtask
```

## Synchronous Testbench Pattern

A synchronous testbench changes inputs near a clock edge and samples outputs after the design has reacted:

```verilog
initial
begin
    Reset = 1'b1;
    Enable = 1'b0;
    @(posedge Clock);
    Reset = 1'b0;

    @(posedge Clock);
    Enable = 1'b1;

    @(posedge Clock);
    #1;
    ExpectValue(8'd1);
end
```

The small `#1` is simulation-only and gives nonblocking assignments time to update before checking.

## Random Stimulus

```verilog
initial
begin
    A = $random;
    B = $random;
end
```

Random tests are useful, but keep deterministic directed tests for known edge cases.

## Testbench Checklist

- [ ] Instantiates the correct DUT.
- [ ] Generates a stable clock.
- [ ] Applies reset.
- [ ] Drives all inputs.
- [ ] Checks expected outputs automatically.
- [ ] Fails with a clear message.
- [ ] Dumps waveforms for debugging.
- [ ] Ends with `$finish`.
- [ ] Separates simulation-only code from synthesizable RTL.

## Related Notes

- [[Verilog]]
- [[Verilog Functions and Tasks]]
- [[Verilog Compiler Directives and System Tasks]]
- [[Verilog State Machines]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", sections 16 and 17.
- YouTube: [Loops & Case Statements in Verilog](https://www.youtube.com/watch?v=g1MkRBDuM1Y)
