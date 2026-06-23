---
title: Keywords
---
Common Verilog keywords:

| Keyword | Description | Article |
| --- | --- | --- |
| `always` | Starts a procedural block that runs whenever its event control triggers. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `and` | Primitive gate keyword for structural gate-level modeling. | [[Verilog Modules and Instantiation\|Modules and Instantiation]] |
| `assign` | Declares a continuous assignment to a net. | [[Verilog Modules and Instantiation\|Modules and Instantiation]] |
| `begin` | Starts a procedural statement block. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `case` | Starts a multi-way procedural selection statement. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `default` | Fallback branch in a `case` statement. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `else` | Alternate branch of an `if` statement. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `end` | Ends a procedural statement block. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `endcase` | Ends a `case` statement. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `endmodule` | Ends a module declaration. | [[Verilog Modules and Instantiation\|Modules and Instantiation]] |
| `for` | Starts a procedural loop. Static loops are often synthesizable. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `function` | Declares a reusable procedural expression helper with one return value. | [[Verilog Functions\|Functions]] |
| `if` | Starts a conditional procedural statement. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `initial` | Starts a procedural block that runs once at simulation start. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `input` | Declares a module input port. | [[Verilog Data Types\|Data Types]] |
| `inout` | Declares a bidirectional module port. | [[Verilog Data Types\|Data Types]] |
| `module` | Starts a design-unit declaration. | [[Verilog Modules and Instantiation\|Modules and Instantiation]] |
| `negedge` | Event-control qualifier for a falling edge. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `or` | Primitive gate keyword and event-control separator. | [[Verilog Modules and Instantiation\|Modules and Instantiation]] |
| `output` | Declares a module output port. | [[Verilog Data Types\|Data Types]] |
| `parameter` | Declares an overridable module constant. | [[Verilog Data Types\|Data Types]] |
| `posedge` | Event-control qualifier for a rising edge. | [[Verilog Behavioral Modeling\|Behavioral Modeling]] |
| `reg` | Procedural variable assigned inside procedural blocks. | [[Verilog Data Types\|Data Types]] |
| `task` | Declares reusable procedural code called as a statement. | [[Verilog Tasks\|Tasks]] |
| `wire` | Net type driven by continuous assignment, gate output, or module output. | [[Verilog Data Types\|Data Types]] |

> [!warning]
> Do not use keywords as signal or module names.
