---
title: Beamforming
---
**Beamforming** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Directional sensing. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A delay-and-sum beamformer combines sensor samples as $y[n]=\sum_{m=0}^{M-1} w_m x_m[n-\tau_m]$, steering the main lobe by choosing delays or complex phase weights.

## Code Example
```rust
fn beamform(elements: &[f64], phases: &[f64]) -> f64 {
    elements.iter().zip(phases).map(|(x, phase)| x * phase.cos()).sum()
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]

## Sources
- [Wikipedia: Beamforming](https://en.wikipedia.org/wiki/Beamforming)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
