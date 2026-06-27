---
title: Alpha-beta filter
---
**Alpha-beta filter** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Simple tracking filter. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A discrete filter forms $y[n]=\sum_k h[k]x[n-k]$ in one dimension or $Y[i,j]=\sum_u\sum_v K[u,v]X[i-u,j-v]$ for images; kernel choice controls smoothing, edges, or phase.

## Code Example
```rust
fn alpha_beta_update(position: &mut f64, velocity: &mut f64, measurement: f64, dt: f64, alpha: f64, beta: f64) {
    *position += *velocity * dt;
    let residual = measurement - *position;
    *position += alpha * residual;
    *velocity += beta * residual / dt;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]

## Sources
- [Wikipedia: Alpha-beta filter](https://en.wikipedia.org/wiki/Alpha_beta_filter)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
