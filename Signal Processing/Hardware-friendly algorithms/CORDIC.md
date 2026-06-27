---
title: CORDIC
---
**CORDIC** is a signal-processing method used in hardware-friendly algorithms for this role: Computes sin/cos/atan/magnitude without multipliers. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
CORDIC iteratively rotates a vector with shift-add steps: $x_{i+1}=x_i-d_i y_i2^{-i}$, $y_{i+1}=y_i+d_i x_i2^{-i}$, and $z_{i+1}=z_i-d_i\arctan(2^{-i})$.

## Code Example
```verilog
always_ff @(posedge clk) begin
  direction <= z[WIDTH-1] ? -1 : 1;
  x_next <= x - direction * (y >>> stage);
  y_next <= y + direction * (x >>> stage);
  z_next <= z - direction * atan_table[stage];
end
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[CIC filter]]
- [[FIR filter]]
- [[FFT]]
- [[Numerically controlled oscillator]]

## Sources
- [Wikipedia: CORDIC](https://en.wikipedia.org/wiki/CORDIC)
- [AMD Xilinx DSP IP](https://www.xilinx.com/products/intellectual-property.html#dsp)
- [Project F FPGA math](https://projectf.io/posts/fpga-sine-table/)
