---
title: Direct digital synthesis
---
**Direct digital synthesis** is a signal-processing method used in hardware-friendly algorithms for this role: Frequency synthesis. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A phase accumulator updates $\phi_{k+1}=\phi_k+\Delta\phi\pmod{2^N}$ and indexes a sine table or phase-to-amplitude converter to synthesize a programmable frequency.

## Code Example
```verilog
always_ff @(posedge clk) begin
  phase_acc <= phase_acc + tuning_word;
  rom_addr <= phase_acc[31:20] + phase_offset;
  sample_out <= sine_rom[rom_addr];
end
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[CORDIC]]
- [[CIC filter]]
- [[FIR filter]]
- [[FFT]]

## Sources
- [Wikipedia: Direct digital synthesis](https://en.wikipedia.org/wiki/Direct_digital_synthesis)
- [AMD Xilinx DSP IP](https://www.xilinx.com/products/intellectual-property.html#dsp)
- [Project F FPGA math](https://projectf.io/posts/fpga-sine-table/)
