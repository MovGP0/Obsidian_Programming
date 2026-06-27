---
title: CIC Decimator/Interpolator
---
**Cascaded integrator-comb** (**CIC**) decimator/interpolator is a multiplier-free multirate filter built from accumulators and differentiators.

For decimation factor $R$, differential delay $M$, and order $N$, the magnitude response is

$$
|H(e^{j\omega})| = \left|\frac{\sin(\omega RM/2)}{\sin(\omega/2)}\right|^N.
$$

CIC filters are efficient in FPGA and ASIC designs, but their passband droop often needs compensation.

```verilog
always @(posedge clk) begin
  integrator <= integrator + sample_in;

  if (strobe_out) begin
    comb_delay <= integrator;
    sample_out <= integrator - comb_delay;
  end
end
```

## Related

- [[Decimation]]
- [[Interpolation]]
- [[Polyphase resampling]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Cascaded integrator-comb filter](https://en.wikipedia.org/wiki/Cascaded_integrator%E2%80%93comb_filter)
- [DSPRelated: CIC filters](https://www.dsprelated.com/showarticle/1337.php)

