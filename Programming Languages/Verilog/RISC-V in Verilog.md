---
title: RISC-V
---
This tutorial builds the mental model for a small RV32I-style RISC-V processor in Verilog. It combines three useful learning angles:

- FemtoRV's progressive route from a blinker to a working RISC-V SoC.
- Textbook single-cycle processor structure: instruction memory, register file, ALU, data memory, control, and PC update.
- The official RV32I encoding rules, especially fixed 32-bit instructions, stable register-field positions, and sign-extended immediates.

The goal is not to copy a production core. The goal is to understand the smallest useful pieces well enough to read or write a simple implementation.

## Target Design

Start with a minimal RV32I subset:

| Feature | Beginner target |
| --- | --- |
| Word size | 32-bit registers and ALU |
| Registers | 32 integer registers, `x0` hardwired to zero |
| Instruction length | 32 bits |
| Memory model | Separate instruction and data memory for clarity |
| Clocking | One synchronous clock |
| First implementation | Single-cycle or small multi-cycle FSM |
| First instructions | `ADD`, `SUB`, `ADDI`, `LW`, `SW`, `BEQ`, `JAL`, `LUI`, `AUIPC` |

A single-cycle CPU is easier to draw: every instruction fetches, decodes, executes, accesses memory if needed, writes back if needed, and updates the PC in one long combinational path between clock edges.

A small multi-cycle CPU is often easier to fit and understand in Verilog: fetch one cycle, wait for memory if needed, execute, then optionally access data memory or write back.

## Top-Level Shape

Keep the CPU separate from memories and board I/O:

```verilog
module Cpu
(
    input  wire        Clock,
    input  wire        Reset,
    output reg  [31:0] InstructionAddress,
    input  wire [31:0] Instruction,
    output reg  [31:0] DataAddress,
    output reg  [31:0] WriteData,
    input  wire [31:0] ReadData,
    output reg         DataWriteEnable
);
    // PC, decoder, register file, ALU, control, and writeback go here.
endmodule
```

Then wrap it in a small SoC:

```verilog
module Soc
(
    input  wire Clock,
    input  wire Reset,
    output wire [4:0] Leds
);
    wire [31:0] InstructionAddress;
    wire [31:0] Instruction;
    wire [31:0] DataAddress;
    wire [31:0] WriteData;
    wire [31:0] ReadData;
    wire        DataWriteEnable;

    Cpu Cpu0
    (
        .Clock(Clock),
        .Reset(Reset),
        .InstructionAddress(InstructionAddress),
        .Instruction(Instruction),
        .DataAddress(DataAddress),
        .WriteData(WriteData),
        .ReadData(ReadData),
        .DataWriteEnable(DataWriteEnable)
    );

    InstructionMemory InstructionMemory0
    (
        .Address(InstructionAddress),
        .Instruction(Instruction)
    );

    DataMemory DataMemory0
    (
        .Clock(Clock),
        .WriteEnable(DataWriteEnable),
        .Address(DataAddress),
        .WriteData(WriteData),
        .ReadData(ReadData)
    );

    assign Leds = DataAddress[6:2];
endmodule
```

This mirrors the useful split in the DDCA and Bitspinner material: processor, instruction memory, and data memory are separate components. FemtoRV goes further and adds memory-mapped I/O, UART, LEDs, and board-specific wrappers.

## Step 1: Program Counter and Instruction Fetch

The program counter holds the byte address of the current instruction. In base RV32I without compressed instructions, instructions are 32 bits and normally advance by four bytes.

```verilog
reg [31:0] Pc;

localparam [31:0] ResetVector = 32'h00000000;
localparam [31:0] InstructionBytes = 32'd4;

wire [31:0] PcPlus4 = Pc + InstructionBytes;

always @(posedge Clock)
begin
    if (Reset)
    begin
        Pc <= ResetVector;
    end
    else
    begin
        Pc <= NextPc;
    end
end

always @(*)
begin
    InstructionAddress = Pc;
end
```

In a simple instruction memory, word selection usually ignores the two low address bits:

```verilog
module InstructionMemory
(
    input  wire [31:0] Address,
    output wire [31:0] Instruction
);
    reg [31:0] Memory [0:255];

    initial
    begin
        $readmemh("program.hex", Memory);
    end

    assign Instruction = Memory[Address[9:2]];
endmodule
```

For simulation, `$readmemh` is convenient. For FPGA synthesis, many tools also use it to initialize block RAM, but check the target flow.

## Step 2: Decode Common Instruction Fields

RISC-V keeps `rd`, `rs1`, and `rs2` in the same bit positions across formats. That makes the decoder wiring direct:

```verilog
wire [6:0] Opcode = Instruction[6:0];
wire [4:0] Rd     = Instruction[11:7];
wire [2:0] Funct3 = Instruction[14:12];
wire [4:0] Rs1    = Instruction[19:15];
wire [4:0] Rs2    = Instruction[24:20];
wire [6:0] Funct7 = Instruction[31:25];
```

## Naming Instruction Constants

Raw encodings such as `7'b0110011` and `3'b111` are hard to read once the decoder grows. Give instruction encodings names near the decode logic.

For constants that are local to one module, prefer `localparam`:

```verilog
localparam [6:0] OpcodeLoad   = 7'b0000011;
localparam [6:0] OpcodeStore  = 7'b0100011;
localparam [6:0] OpcodeAluImm = 7'b0010011;
localparam [6:0] OpcodeAluReg = 7'b0110011;
localparam [6:0] OpcodeBranch = 7'b1100011;
localparam [6:0] OpcodeJalr   = 7'b1100111;
localparam [6:0] OpcodeJal    = 7'b1101111;
localparam [6:0] OpcodeAuipc  = 7'b0010111;
localparam [6:0] OpcodeLui    = 7'b0110111;
localparam [6:0] OpcodeSystem = 7'b1110011;

localparam [2:0] Funct3AddSub = 3'b000;
localparam [2:0] Funct3Sll    = 3'b001;
localparam [2:0] Funct3Slt    = 3'b010;
localparam [2:0] Funct3Sltu   = 3'b011;
localparam [2:0] Funct3Xor    = 3'b100;
localparam [2:0] Funct3SrlSra = 3'b101;
localparam [2:0] Funct3Or     = 3'b110;
localparam [2:0] Funct3And    = 3'b111;

localparam [2:0] Funct3Beq  = 3'b000;
localparam [2:0] Funct3Bne  = 3'b001;
localparam [2:0] Funct3Blt  = 3'b100;
localparam [2:0] Funct3Bge  = 3'b101;
localparam [2:0] Funct3Bltu = 3'b110;
localparam [2:0] Funct3Bgeu = 3'b111;
```

Compiler macros are also possible:

```verilog
`define FUNCT3_AND 3'b111

case (Funct3)
    `FUNCT3_AND:
    begin
        AluOperation = AluAnd;
    end
endcase
```

Macros require a backtick when used. They are global text substitution after inclusion, so they can collide across files. Use them for shared include files when needed; use `localparam` for constants that belong to one module.

Useful opcode classification:

```verilog
wire IsLoad   = Opcode == OpcodeLoad;
wire IsStore  = Opcode == OpcodeStore;
wire IsAluImm = Opcode == OpcodeAluImm;
wire IsAluReg = Opcode == OpcodeAluReg;
wire IsBranch = Opcode == OpcodeBranch;
wire IsJalr   = Opcode == OpcodeJalr;
wire IsJal    = Opcode == OpcodeJal;
wire IsAuipc  = Opcode == OpcodeAuipc;
wire IsLui    = Opcode == OpcodeLui;
wire IsSystem = Opcode == OpcodeSystem;
```

Beginner note: do not try to make the first decoder generic. Make named wires for the instruction classes you support, then add more instructions one group at a time.

## Step 3: Immediate Generator

RV32I has several immediate layouts. The awkward-looking bit shuffles are deliberate: they keep register fields fixed and put the sign bit in instruction bit 31.

```verilog
wire [31:0] IImmediate =
{
    {21{Instruction[31]}},
    Instruction[30:20]
};

wire [31:0] SImmediate =
{
    {21{Instruction[31]}},
    Instruction[30:25],
    Instruction[11:7]
};

wire [31:0] BImmediate =
{
    {20{Instruction[31]}},
    Instruction[7],
    Instruction[30:25],
    Instruction[11:8],
    1'b0
};

wire [31:0] UImmediate =
{
    Instruction[31:12],
    12'b000000000000
};

wire [31:0] JImmediate =
{
    {12{Instruction[31]}},
    Instruction[19:12],
    Instruction[20],
    Instruction[30:21],
    1'b0
};
```

Use the immediate by instruction class:

| Instruction class | Immediate |
| --- | --- |
| ALU immediate, load, `JALR` | `IImmediate` |
| Store | `SImmediate` |
| Branch | `BImmediate` |
| `LUI`, `AUIPC` | `UImmediate` |
| `JAL` | `JImmediate` |

## Step 4: Register File

RV32I has 32 integer registers. Register `x0` always reads as zero and ignores writes.

```verilog
module RegisterFile
(
    input  wire        Clock,
    input  wire        WriteEnable,
    input  wire [4:0]  ReadAddress1,
    input  wire [4:0]  ReadAddress2,
    input  wire [4:0]  WriteAddress,
    input  wire [31:0] WriteData,
    output wire [31:0] ReadData1,
    output wire [31:0] ReadData2
);
    reg [31:0] Registers [0:31];

    localparam [4:0] RegisterZero = 5'd0;
    localparam [31:0] ZeroWord = 32'd0;

    assign ReadData1 = ReadAddress1 == RegisterZero ? ZeroWord : Registers[ReadAddress1];
    assign ReadData2 = ReadAddress2 == RegisterZero ? ZeroWord : Registers[ReadAddress2];

    always @(posedge Clock)
    begin
        if (WriteEnable && WriteAddress != RegisterZero)
        begin
            Registers[WriteAddress] <= WriteData;
        end
    end
endmodule
```

This gives two combinational read ports and one synchronous write port. That is the classic structure for a simple RISC datapath.

## Step 5: ALU

Give the ALU a small internal operation code rather than scattering `funct3` and `funct7` checks everywhere.

```verilog
localparam AluAdd  = 4'd0;
localparam AluSub  = 4'd1;
localparam AluAnd  = 4'd2;
localparam AluOr   = 4'd3;
localparam AluXor  = 4'd4;
localparam AluSlt  = 4'd5;
localparam AluSltu = 4'd6;
localparam AluSll  = 4'd7;
localparam AluSrl  = 4'd8;
localparam AluSra  = 4'd9;
```

ALU implementation:

```verilog
always @(*)
begin
    case (AluOperation)
        AluAdd:
        begin
            AluResult = AluA + AluB;
        end
        AluSub:
        begin
            AluResult = AluA - AluB;
        end
        AluAnd:
        begin
            AluResult = AluA & AluB;
        end
        AluOr:
        begin
            AluResult = AluA | AluB;
        end
        AluXor:
        begin
            AluResult = AluA ^ AluB;
        end
        AluSlt:
        begin
            AluResult = $signed(AluA) < $signed(AluB) ? 32'd1 : 32'd0;
        end
        AluSltu:
        begin
            AluResult = AluA < AluB ? 32'd1 : 32'd0;
        end
        AluSll:
        begin
            AluResult = AluA << AluB[4:0];
        end
        AluSrl:
        begin
            AluResult = AluA >> AluB[4:0];
        end
        AluSra:
        begin
            AluResult = $signed(AluA) >>> AluB[4:0];
        end
        default:
        begin
            AluResult = 32'd0;
        end
    endcase
end
```

`SRA` needs an arithmetic shift. In Verilog, cast the left operand to signed before using `>>>`.

## Step 6: Main Control

The control unit turns decoded instruction class into datapath choices:

| Control | Meaning |
| --- | --- |
| `RegWrite` | Write result to `rd` |
| `MemWrite` | Store `rs2` data to data memory |
| `AluSourceA` | Select `rs1` or `PC` |
| `AluSourceB` | Select `rs2` or immediate |
| `ResultSource` | Select ALU result, memory read data, or `PC + 4` |
| `NextPc` | Select `PC + 4`, branch target, `JAL` target, or `JALR` target |

Skeleton:

```verilog
always @(*)
begin
    RegWrite = 1'b0;
    MemWrite = 1'b0;
    AluA = RegisterData1;
    AluB = RegisterData2;
    WriteBackData = AluResult;
    NextPc = PcPlus4;
    AluOperation = AluAdd;

    if (IsAluReg)
    begin
        RegWrite = 1'b1;
        AluB = RegisterData2;
    end
    else if (IsAluImm)
    begin
        RegWrite = 1'b1;
        AluB = IImmediate;
    end
    else if (IsLoad)
    begin
        RegWrite = 1'b1;
        AluB = IImmediate;
        WriteBackData = ReadData;
    end
    else if (IsStore)
    begin
        MemWrite = 1'b1;
        AluB = SImmediate;
    end
    else if (IsLui)
    begin
        RegWrite = 1'b1;
        WriteBackData = UImmediate;
    end
    else if (IsAuipc)
    begin
        RegWrite = 1'b1;
        WriteBackData = Pc + UImmediate;
    end
end
```

The complete version also decodes the exact ALU operation from `funct3`, `funct7`, and bit 30.

## Step 7: ALU Operation Decode

For a first subset:

```verilog
always @(*)
begin
    AluOperation = AluAdd;

    if (IsAluReg || IsAluImm)
    begin
        case (Funct3)
            Funct3AddSub:
            begin
                AluOperation = IsAluReg && Instruction[30] ? AluSub : AluAdd;
            end
            Funct3And:
            begin
                AluOperation = AluAnd;
            end
            Funct3Or:
            begin
                AluOperation = AluOr;
            end
            Funct3Xor:
            begin
                AluOperation = AluXor;
            end
            Funct3Slt:
            begin
                AluOperation = AluSlt;
            end
            Funct3Sltu:
            begin
                AluOperation = AluSltu;
            end
            Funct3Sll:
            begin
                AluOperation = AluSll;
            end
            Funct3SrlSra:
            begin
                AluOperation = Instruction[30] ? AluSra : AluSrl;
            end
            default:
            begin
                AluOperation = AluAdd;
            end
        endcase
    end
end
```

There is no `SUBI`: subtraction by an immediate is `ADDI` with a negative immediate.

## Step 8: Data Memory

Start with word loads/stores only:

```verilog
module DataMemory
(
    input  wire        Clock,
    input  wire        WriteEnable,
    input  wire [31:0] Address,
    input  wire [31:0] WriteData,
    output wire [31:0] ReadData
);
    reg [31:0] Memory [0:255];

    assign ReadData = Memory[Address[9:2]];

    always @(posedge Clock)
    begin
        if (WriteEnable)
        begin
            Memory[Address[9:2]] <= WriteData;
        end
    end
endmodule
```

After the core works, add byte and halfword support:

| Instruction | Extra work |
| --- | --- |
| `LB` / `LH` | Select byte/halfword and sign-extend |
| `LBU` / `LHU` | Select byte/halfword and zero-extend |
| `SB` / `SH` | Generate byte enables or read-modify-write in simulation memory |

For a first learning CPU, `LW` and `SW` are enough to prove fetch, decode, execute, memory, and writeback.

## Step 9: Branches and Jumps

Branch compare:

```verilog
reg BranchTaken;

always @(*)
begin
    case (Funct3)
        Funct3Beq:
        begin
            BranchTaken = RegisterData1 == RegisterData2;              // BEQ
        end
        Funct3Bne:
        begin
            BranchTaken = RegisterData1 != RegisterData2;              // BNE
        end
        Funct3Blt:
        begin
            BranchTaken = $signed(RegisterData1) < $signed(RegisterData2); // BLT
        end
        Funct3Bge:
        begin
            BranchTaken = $signed(RegisterData1) >= $signed(RegisterData2); // BGE
        end
        Funct3Bltu:
        begin
            BranchTaken = RegisterData1 < RegisterData2;               // BLTU
        end
        Funct3Bgeu:
        begin
            BranchTaken = RegisterData1 >= RegisterData2;              // BGEU
        end
        default:
        begin
            BranchTaken = 1'b0;
        end
    endcase
end
```

PC update:

```verilog
always @(*)
begin
    NextPc = PcPlus4;

    if (IsBranch && BranchTaken)
    begin
        NextPc = Pc + BImmediate;
    end
    else if (IsJal)
    begin
        NextPc = Pc + JImmediate;
    end
    else if (IsJalr)
    begin
        NextPc = (RegisterData1 + IImmediate) & ~32'd1;
    end
end
```

`JAL` and `JALR` also write `PC + 4` to `rd`, which is how function calls get a return address.

## Step 10: Single-Cycle Integration

The single-cycle design can be summarized as:

1. `Pc` addresses instruction memory.
2. Instruction bits feed the decoder.
3. `rs1` and `rs2` read the register file.
4. Immediate generator builds the selected immediate.
5. Control selects ALU inputs and operation.
6. ALU produces result or address.
7. Data memory is used for load/store.
8. Writeback selects ALU result, memory data, immediate result, or `PC + 4`.
9. Next-PC logic chooses sequential, branch, or jump target.
10. On the clock edge, `Pc` and register file state update.

The long path is the important limitation:

```text
PC -> instruction memory -> decode -> register file -> ALU -> data memory -> writeback
```

That is why single-cycle processors are pedagogically clean but inefficient. A multi-cycle or pipelined design breaks this path into stages.

## Step 11: Multi-Cycle FSM Alternative

FemtoRV's small cores are easier to understand if you think in states:

| State | Work |
| --- | --- |
| Fetch | Present `PC` to memory |
| WaitInstruction | Capture instruction when memory responds |
| Execute | Decode, read registers, compute ALU/branch result |
| WaitData | Wait for load/store memory access if needed |
| WriteBack | Update register file and PC |

Skeleton:

```verilog
localparam StateFetch = 3'd0;
localparam StateWaitInstruction = 3'd1;
localparam StateExecute = 3'd2;
localparam StateWaitData = 3'd3;
localparam StateWriteBack = 3'd4;

reg [2:0] State;

always @(posedge Clock)
begin
    if (Reset)
    begin
        State <= StateFetch;
        Pc <= 32'd0;
    end
    else
    begin
        case (State)
            StateFetch:
            begin
                InstructionAddress <= Pc;
                State <= StateWaitInstruction;
            end
            StateWaitInstruction:
            begin
                InstructionRegister <= Instruction;
                State <= StateExecute;
            end
            StateExecute:
            begin
                State <= IsLoad || IsStore ? StateWaitData : StateWriteBack;
            end
            StateWaitData:
            begin
                State <= StateWriteBack;
            end
            StateWriteBack:
            begin
                Pc <= NextPc;
                State <= StateFetch;
            end
            default:
            begin
                State <= StateFetch;
            end
        endcase
    end
end
```

This model makes it explicit that memory can take time. The FemtoRV video walkthrough emphasizes the handshake-like idea that memory or I/O may need to delay completion, while the DDCA single-cycle video keeps memory idealized for datapath clarity.

## Step 12: Test Program and Testbench

A minimal first test should write a known value to memory:

```asm
addi x1, x0, 71
sw   x1, 0(x0)
ebreak
```

Your Verilog testbench can watch for that store:

```verilog
localparam [31:0] ExpectedAddress = 32'd0;
localparam [31:0] ExpectedData = 32'd71;

always @(posedge Clock)
begin
    if (DataWriteEnable && DataAddress == ExpectedAddress && WriteData == ExpectedData)
    begin
        $display("PASS");
        $finish;
    end
end
```

Also stop on wrong writes:

```verilog
always @(posedge Clock)
begin
    if (DataWriteEnable && (DataAddress != ExpectedAddress || WriteData != ExpectedData))
    begin
        $display("FAIL: address=%h data=%h", DataAddress, WriteData);
        $finish;
    end
end
```

For waveform debugging, dump the important CPU state:

```verilog
initial
begin
    $dumpfile("riscv_cpu.vcd");
    $dumpvars(0, Testbench);
end
```

Useful signals to inspect:

| Signal | Why it matters |
| --- | --- |
| `Pc` | Fetch sequence and branch/jump targets |
| `Instruction` | Whether memory is initialized correctly |
| `Opcode`, `Funct3`, `Funct7` | Decoder correctness |
| `Rs1`, `Rs2`, `Rd` | Register field extraction |
| `RegisterData1`, `RegisterData2` | Register file reads |
| `AluResult` | Execution/address calculation |
| `RegWrite`, `MemWrite` | Control decisions |
| `WriteBackData` | Final value written to `rd` |

## Build Order

Use this order to avoid debugging everything at once:

1. Counter/blinker SoC with clock and reset.
2. Instruction memory and PC that fetches sequential words.
3. Decoder that recognizes instruction classes and prints fields in simulation.
4. Register file with `x0` behavior.
5. ALU register-register and register-immediate instructions.
6. `LUI` and `AUIPC`.
7. `LW` and `SW` using word-only memory.
8. Branches.
9. `JAL` and `JALR`.
10. Byte/halfword loads and stores.
11. `SYSTEM` handling for `EBREAK` as a clean simulation stop.
12. Toolchain flow that assembles or compiles real RISC-V programs into memory hex.

This is the same strategic lesson as FemtoRV: change one thing at a time, keep each step runnable, and use simulation before FPGA debugging.

## Common Traps

| Trap | Symptom | Fix |
| --- | --- | --- |
| Forgetting byte addressing | PC increments by one instruction but memory indexing is wrong | Increment `PC` by `4`; index word memory with `Address[...:2]` |
| Writing `x0` | Programs fail in strange ways | Ignore writes when `rd == 0`; make reads from register zero return `0` |
| Missing sign extension | Branches, negative immediates, and loads break | Build immediates with repeated `Instruction[31]` |
| Treating `SRA` as `SRL` | Signed right shifts are wrong | Use `$signed(Value) >>> ShiftAmount` |
| No default assignments | Latches or stale control signals | Assign safe defaults at the top of combinational blocks |
| Implementing too much first | Impossible debugging surface | Add one instruction group at a time |
| Assuming single-cycle memory | FPGA block RAM timing surprises | Consider a multi-cycle FSM with explicit fetch/wait states |

## Reading Existing Cores

When reading FemtoRV or another compact core, map its code back to the same conceptual blocks:

- PC and next-PC logic.
- Instruction register and opcode classification.
- Immediate generator.
- Register file reads and writes.
- ALU operation selection.
- Memory or I/O bus interface.
- FSM state transitions.
- Optional counters, CSR, traps, and interrupt support.

Compact cores often merge these areas to save lines or LUTs. For learning, it is fine to keep them separate first.

## Next Step: Reading biRISC-V

`ultraembedded/biriscv` is a good next reference after the beginner CPU works. It is not a minimal teaching core; it is a more serious 32-bit RISC-V CPU written in synthesizable Verilog 2001.

Important differences from the simple tutorial CPU:

| Area | Simple tutorial CPU | biRISC-V |
| --- | --- | --- |
| Issue width | One instruction at a time | Dual issue, up to two independent instructions per cycle |
| Pipeline | Single-cycle or small multi-cycle FSM | In-order 6 or 7 stage pipeline |
| ISA support | Start with RV32I subset | RV32IMZicsr |
| Fetch width | 32-bit instruction fetch is enough | 64-bit instruction fetch |
| Execution units | One ALU | Two integer ALUs, load/store unit, out-of-pipeline divider |
| Control flow | Resolve branch directly | Configurable branch prediction, BTB, BHT/GShare, and return address stack |
| Memory interface | Small instruction/data arrays | Caches, AXI interfaces, or tightly coupled memories |
| Verification | Directed testbench first | RISCV-DV random instruction sequences with cosimulation |

Use it as a code-reading exercise in layers:

1. Find the top-level core wrapper and identify instruction/data memory interfaces.
2. Trace the PC and fetch path before looking at dual issue.
3. Find decode and compare it with the simple `Opcode`, `Funct3`, `Funct7`, `rs1`, `rs2`, `rd` extraction.
4. Find the register file and result forwarding paths.
5. Follow one ALU instruction through issue, execute, and writeback.
6. Follow one load/store through the load-store unit.
7. Only then inspect branch prediction and MMU/cache configuration.

This keeps the large core readable. The same conceptual blocks are still present, but they are split across pipeline stages and surrounded by performance machinery.

## Related Notes

- [[_Verilog|Verilog]]
- [[Verilog Behavioral Modeling]]
- [[Verilog Data Types]]
- [[Verilog Operators]]
- [[Verilog Modules and Instantiation]]
- [[Verilog State Machines]]
- [[Verilog Testing and Testbenches]]
- [[Verilog Synthesis and Component Inference]]

## Sources

- RISC-V International, [RV32I Base Integer Instruction Set](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html)
- Bruno Levy, [From Blinker to RISC-V](https://github.com/BrunoLevy/learn-fpga/blob/master/FemtoRV/TUTORIALS/FROM_BLINKER_TO_RISCV/README.md)
- Bruno Levy, [learn-fpga / FemtoRV](https://github.com/BrunoLevy/learn-fpga)
- Bruno Levy, [FemtoRV README](https://github.com/BrunoLevy/learn-fpga/blob/master/FemtoRV/README.md)
- Bruno Levy, [FemtoRV32 Quark Verilog source](https://github.com/BrunoLevy/learn-fpga/blob/master/FemtoRV/RTL/PROCESSOR/femtorv32_quark.v)
- Bitspinner, [RV32I Decoder](https://www.bit-spinner.com/rv32i/rv32i-decoder)
- ultraembedded, [biRISC-V](https://github.com/ultraembedded/biriscv)
- YouTube, [RISC-V: Verilog Implementation (FemtoRV)](https://www.youtube.com/watch?v=8boamDdvD8s)
- YouTube, [DDCA Ch7 - Part 6b: RISC-V Single-Cycle Processor Verilog](https://www.youtube.com/watch?v=a8yewzP-kJc)
