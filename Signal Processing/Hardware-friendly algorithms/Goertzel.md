---
title: Goertzel
---
**Goertzel** is a signal-processing method used in hardware-friendly algorithms for this role: Efficient tone detection. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The core computation is a discrete-time operator on samples, frames, or coefficients. It is usually analyzed by the mapping from input $x[n]$ to output $y[n]$ and by the error, energy, or likelihood criterion optimized by the algorithm.

## Code Example
```verilog
always_ff @(posedge clk) begin
  s0 <= sample_in + ((coeff * s1) >>> SCALE) - s2;
  s2 <= s1;
  s1 <= s0;

  if (block_done) begin
    power <= s1 * s1 + s2 * s2 - ((coeff * s1 * s2) >>> SCALE);
  end
end
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[CORDIC]]
- [[CIC filter]]
- [[FIR filter]]
- [[FFT]]

## Sources
- [Wikipedia: Goertzel](https://en.wikipedia.org/wiki/Goertzel_algorithm)
- [AMD Xilinx DSP IP](https://www.xilinx.com/products/intellectual-property.html#dsp)
- [Project F FPGA math](https://projectf.io/posts/fpga-sine-table/)
