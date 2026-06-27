---
title: CIC filter
---
**CIC filter** is a signal-processing method used in hardware-friendly algorithms for this role: Multirate filtering using only adders/delays. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A discrete filter forms $y[n]=\sum_k h[k]x[n-k]$ in one dimension or $Y[i,j]=\sum_u\sum_v K[u,v]X[i-u,j-v]$ for images; kernel choice controls smoothing, edges, or phase.

## Code Example
```verilog
always_ff @(posedge clk) begin
  integ0 <= integ0 + sample_in;
  integ1 <= integ1 + integ0;
  rate_count <= rate_count + 1'b1;

  if (rate_count == R - 1) begin
    rate_count <= '0;
    comb0 <= integ1 - comb_delay0;
    comb_delay0 <= integ1;
    comb1 <= comb0 - comb_delay1;
    comb_delay1 <= comb0;
    sample_out <= comb1;
  end
end
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[CORDIC]]
- [[FIR filter]]
- [[FFT]]
- [[Numerically controlled oscillator]]

## Sources
- [Wikipedia: CIC filter](https://en.wikipedia.org/wiki/Cascaded_integrator-comb_filter)
- [AMD Xilinx DSP IP](https://www.xilinx.com/products/intellectual-property.html#dsp)
- [Project F FPGA math](https://projectf.io/posts/fpga-sine-table/)
