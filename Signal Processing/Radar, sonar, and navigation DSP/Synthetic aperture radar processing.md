---
title: Synthetic aperture radar processing
---
**Synthetic aperture radar processing** is a signal-processing method used in radar, sonar, and navigation dsp for this role: High-resolution radar imaging. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The core computation is a discrete-time operator on samples, frames, or coefficients. It is usually analyzed by the mapping from input $x[n]$ to output $y[n]$ and by the error, energy, or likelihood criterion optimized by the algorithm.

## Code Example
```rust
fn backproject_pixel(echoes: &[f64], ranges: &[usize], phases: &[f64]) -> f64 {
    echoes.iter().zip(ranges).zip(phases).map(|((echo, &range_bin), phase)| echo * range_bin as f64 * phase.cos()).sum()
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]

## Sources
- [Wikipedia: Synthetic aperture radar processing](https://en.wikipedia.org/wiki/Synthetic-aperture_radar)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
