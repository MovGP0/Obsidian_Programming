---
title: MUSIC DOA
---
**MUSIC DOA** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Direction-of-arrival estimation. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
MUSIC decomposes the covariance matrix into signal and noise subspaces and scans $P(\theta)=1/(a^H(\theta)E_nE_n^Ha(\theta))$ for steering vectors nearly orthogonal to noise.

## Code Example
```rust
fn music_spectrum_value(steering: &[f64], noise_projection: &[f64]) -> f64 {
    let denominator: f64 = steering.iter().zip(noise_projection).map(|(a, p)| a * p).sum();
    1.0 / denominator.abs().max(1.0e-12)
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]

## Sources
- [Wikipedia: MUSIC DOA](https://en.wikipedia.org/wiki/MUSIC_(algorithm%29))
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
