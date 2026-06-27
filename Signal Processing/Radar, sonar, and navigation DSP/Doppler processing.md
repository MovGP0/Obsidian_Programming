---
title: Doppler processing
---
**Doppler processing** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Estimate velocity. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The core computation is a discrete-time operator on samples, frames, or coefficients. It is usually analyzed by the mapping from input $x[n]$ to output $y[n]$ and by the error, energy, or likelihood criterion optimized by the algorithm.

## Code Example
```rust
fn doppler_bin_power(pulses: &[f64], bin: usize) -> f64 {
    let n = pulses.len() as f64;
    let mut real = 0.0;
    let mut imag = 0.0;
    for (i, &x) in pulses.iter().enumerate() {
        let angle = -2.0 * std::f64::consts::PI * bin as f64 * i as f64 / n;
        real += x * angle.cos();
        imag += x * angle.sin();
    }
    real * real + imag * imag
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]

## Sources
- [Wikipedia: Doppler processing](https://en.wikipedia.org/wiki/Doppler_effect)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
