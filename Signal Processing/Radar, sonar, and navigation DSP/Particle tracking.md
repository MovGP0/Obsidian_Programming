---
title: Particle tracking
---
**Particle tracking** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Nonlinear target tracking. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Particles approximate the posterior as $p(x_k|z_{1:k}) \approx \sum_i w_k^{(i)}\delta(x_k-x_k^{(i)})$, with propagation, likelihood weighting, normalization, and resampling.

## Code Example
```rust
fn normalize_particle_weights(weights: &mut [f64]) {
    let total: f64 = weights.iter().sum();
    for weight in weights {
        *weight /= total.max(1.0e-12);
    }
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]

## Sources
- [Wikipedia: Particle tracking](https://en.wikipedia.org/wiki/Particle_filter)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
