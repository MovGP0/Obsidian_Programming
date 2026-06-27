---
title: FIR filter
---
**FIR filter** is a signal-processing method used in hardware-friendly algorithms for this role: Maps well to DSP slices. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A discrete filter forms $y[n]=\sum_k h[k]x[n-k]$ in one dimension or $Y[i,j]=\sum_u\sum_v K[u,v]X[i-u,j-v]$ for images; kernel choice controls smoothing, edges, or phase.

## Code Example
```verilog
always_ff @(posedge clk) begin
  shift[0] <= sample_in;
  for (int i = 1; i < TAPS; i++) begin
    shift[i] <= shift[i - 1];
  end

  acc = '0;
  for (int i = 0; i < TAPS; i++) begin
    acc += shift[i] * coeff[i];
  end
  sample_out <= acc >>> SCALE;
end
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[CORDIC]]
- [[CIC filter]]
- [[FFT]]
- [[Numerically controlled oscillator]]

## Sources
- [Wikipedia: FIR filter](https://en.wikipedia.org/wiki/Finite_impulse_response)
- [AMD Xilinx DSP IP](https://www.xilinx.com/products/intellectual-property.html#dsp)
- [Project F FPGA math](https://projectf.io/posts/fpga-sine-table/)
