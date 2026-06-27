---
title: Numerically controlled oscillator
---
**Numerically controlled oscillator** is a signal-processing method used in hardware-friendly algorithms for this role: Digital sine/cosine generation. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The core computation is a discrete-time operator on samples, frames, or coefficients. It is usually analyzed by the mapping from input $x[n]$ to output $y[n]$ and by the error, energy, or likelihood criterion optimized by the algorithm.

## Code Example
```verilog
always_ff @(posedge clk) begin
  phase_acc <= phase_acc + tuning_word;
  sine_out <= sine_rom[phase_acc[31:24]];
  cosine_out <= sine_rom[phase_acc[31:24] + 8'd64];
end
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[CORDIC]]
- [[CIC filter]]
- [[FIR filter]]
- [[FFT]]

## Sources
- [Wikipedia: Numerically controlled oscillator](https://en.wikipedia.org/wiki/Numerically-controlled_oscillator)
- [AMD Xilinx DSP IP](https://www.xilinx.com/products/intellectual-property.html#dsp)
- [Project F FPGA math](https://projectf.io/posts/fpga-sine-table/)
