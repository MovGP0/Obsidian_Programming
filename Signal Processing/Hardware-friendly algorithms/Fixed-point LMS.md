---
title: Fixed-point LMS
---
**Fixed-point LMS** is a signal-processing method used in hardware-friendly algorithms for this role: Adaptive filtering in hardware. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Adaptive cancellation updates filter taps with $w_{k+1}=w_k+\mu e_k x_k$, where $e_k=d_k-w_k^T x_k$ is the residual echo or modeling error.

## Code Example
```verilog
always_ff @(posedge clk) begin
  y <= (w0 * x0 + w1 * x1) >>> SCALE;
  e <= desired - y;
  w0 <= w0 + ((mu * e * x0) >>> SCALE);
  w1 <= w1 + ((mu * e * x1) >>> SCALE);
end
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[CORDIC]]
- [[CIC filter]]
- [[FIR filter]]
- [[FFT]]

## Sources
- [Wikipedia: Fixed-point LMS](https://en.wikipedia.org/wiki/Least_mean_squares_filter)
- [AMD Xilinx DSP IP](https://www.xilinx.com/products/intellectual-property.html#dsp)
- [Project F FPGA math](https://projectf.io/posts/fpga-sine-table/)
