# Verilog State Machines

Finite state machines (FSMs) model control logic. A good FSM separates current-state storage from next-state and output logic.

## State Machine Parts

An FSM usually has:

- A state register.
- Named state encodings.
- Combinational next-state logic.
- Output logic.
- Reset behavior.

## State Encodings

```verilog
localparam StateIdle = 2'd0;
localparam StateLoad = 2'd1;
localparam StateRun  = 2'd2;
localparam StateDone = 2'd3;
```

Use `localparam` for state names unless the state encoding must be overridden from outside.

## Two-Process FSM

This style uses one clocked block for the state register and one combinational block for next-state logic.

```verilog
reg [1:0] State;
reg [1:0] NextState;

always @(posedge Clock)
begin
    if (Reset)
    begin
        State <= StateIdle;
    end
    else
    begin
        State <= NextState;
    end
end

always @(*)
begin
    NextState = State;

    case (State)
        StateIdle:
        begin
            if (Start)
            begin
                NextState = StateLoad;
            end
        end
        StateLoad:
        begin
            NextState = StateRun;
        end
        StateRun:
        begin
            if (Finished)
            begin
                NextState = StateDone;
            end
        end
        StateDone:
        begin
            NextState = StateIdle;
        end
        default:
        begin
            NextState = StateIdle;
        end
    endcase
end
```

The default `NextState = State;` prevents accidental latches for paths that do not change state.

## Output Logic

Moore-style outputs depend only on state:

```verilog
always @(*)
begin
    Busy = 1'b0;
    Done = 1'b0;

    case (State)
        StateRun:
        begin
            Busy = 1'b1;
        end
        StateDone:
        begin
            Done = 1'b1;
        end
        default:
        begin
            Busy = 1'b0;
            Done = 1'b0;
        end
    endcase
end
```

Mealy-style outputs depend on state and inputs:

```verilog
assign Accept = (State == StateIdle) && Start;
```

## One-Process FSM

A small FSM can be written in one clocked block:

```verilog
always @(posedge Clock)
begin
    if (Reset)
    begin
        State <= StateIdle;
        Done <= 1'b0;
    end
    else
    begin
        Done <= 1'b0;

        case (State)
            StateIdle:
            begin
                if (Start)
                begin
                    State <= StateRun;
                end
            end
            StateRun:
            begin
                if (Finished)
                begin
                    State <= StateDone;
                end
            end
            StateDone:
            begin
                Done <= 1'b1;
                State <= StateIdle;
            end
            default:
            begin
                State <= StateIdle;
            end
        endcase
    end
end
```

This is compact, but next-state and output behavior are less visually separated.

## Counters as State Machines

Counters are simple FSMs where the state is numeric:

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

assign TerminalCount = &Count;
```

## Shift Registers

```verilog
always @(posedge Clock)
begin
    if (Reset)
    begin
        Shift <= 4'b0001;
    end
    else
    begin
        Shift <= {Shift[2:0], Shift[3]};
    end
end
```

The nonblocking assignment uses the old value of `Shift` for all right-hand-side bits.

## FSM Checklist

- [ ] All states have names.
- [ ] Reset puts the FSM in a valid state.
- [ ] Next-state logic has a default.
- [ ] Combinational outputs are assigned on every path.
- [ ] `case` has a `default`.
- [ ] Clocked logic uses nonblocking assignment.
- [ ] State encoding width is large enough.
- [ ] Illegal states recover to a safe state.

## Related Notes

- [[Verilog]]
- [[Verilog Behavioral Modeling]]
- [[Verilog Testing and Testbenches]]
- [[Verilog Synthesis and Component Inference]]

## Sources

- Peter M. Nyasulu, "Introduction to Verilog", section 14.
