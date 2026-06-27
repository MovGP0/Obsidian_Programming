---
title: Pipelined correlator
---
**Pipelined correlator** is a signal-processing method used in hardware-friendly algorithms for this role: Synchronization/detection. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Correlation compares a received signal with a template: $r_{xy}[\ell]=\sum_n x[n]y^*[n-\ell]$. A matched filter uses $h[n]=s^*[N-1-n]$ to maximize SNR for a known waveform in white noise.

## Code Example
```verilog
always_ff @(posedge clk) begin
  products[0] <= sample_in * reference[0];
  for (int i = 1; i < TAPS; i++) begin
    products[i] <= delay[i] * reference[i];
  end
  stage0 <= products[0] + products[1];
  stage1 <= products[2] + products[3];
  correlation <= stage0 + stage1;
end
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[CORDIC]]
- [[CIC filter]]
- [[FIR filter]]
- [[FFT]]

## Sources
- [Wikipedia: Pipelined correlator](https://en.wikipedia.org/wiki/Cross-correlation)
- [AMD Xilinx DSP IP](https://www.xilinx.com/products/intellectual-property.html#dsp)
- [Project F FPGA math](https://projectf.io/posts/fpga-sine-table/)
