---
title: FFT
---
**FFT** is a signal-processing method used in hardware-friendly algorithms for this role: Maps well to butterfly pipelines. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The discrete Fourier transform is $X[k]=\sum_{n=0}^{N-1}x[n]e^{-j2\pi kn/N}$; FFT factorizations compute the same spectrum with $O(N\log N)$ operations.

## Code Example
```verilog
always_comb begin
  t_re = (w_re * b_re - w_im * b_im) >>> SCALE;
  t_im = (w_re * b_im + w_im * b_re) >>> SCALE;
  y0_re = a_re + t_re;
  y0_im = a_im + t_im;
  y1_re = a_re - t_re;
  y1_im = a_im - t_im;
end
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[CORDIC]]
- [[CIC filter]]
- [[FIR filter]]
- [[Numerically controlled oscillator]]

## Sources
- [Wikipedia: FFT](https://en.wikipedia.org/wiki/Fast_Fourier_transform)
- [AMD Xilinx DSP IP](https://www.xilinx.com/products/intellectual-property.html#dsp)
- [Project F FPGA math](https://projectf.io/posts/fpga-sine-table/)
