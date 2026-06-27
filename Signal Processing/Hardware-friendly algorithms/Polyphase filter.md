---
title: Polyphase filter
---
**Polyphase filter** is a signal-processing method used in hardware-friendly algorithms for this role: Efficient resampling. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A discrete filter forms $y[n]=\sum_k h[k]x[n-k]$ in one dimension or $Y[i,j]=\sum_u\sum_v K[u,v]X[i-u,j-v]$ for images; kernel choice controls smoothing, edges, or phase.

## Code Example
```verilog
always_comb begin
  acc = '0;
  for (int tap = 0; tap < TAPS_PER_PHASE; tap++) begin
    acc += delay[tap] * coeff[phase][tap];
  end
  y = acc >>> SCALE;
end
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[CORDIC]]
- [[CIC filter]]
- [[FIR filter]]
- [[FFT]]

## Sources
- [Wikipedia: Polyphase filter](https://en.wikipedia.org/wiki/Polyphase_matrix)
- [AMD Xilinx DSP IP](https://www.xilinx.com/products/intellectual-property.html#dsp)
- [Project F FPGA math](https://projectf.io/posts/fpga-sine-table/)
