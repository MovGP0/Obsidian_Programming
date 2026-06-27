---
title: Kalman tracking
---
**Kalman tracking** is a signal-processing method used in radar, sonar, and navigation dsp for this role: State tracking. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A linear tracking step predicts $x_k = F x_{k-1} + B u_k$ and $P_k = F P_{k-1} F^T + Q$, then corrects with $K_k = P_k H^T (H P_k H^T + R)^{-1}$ and $x_k = x_k + K_k(z_k - Hx_k)$.

## Code Example
```rust
fn kalman_track_update(position: &mut f64, velocity: &mut f64, covariance: &mut f64, measurement: f64, dt: f64, r: f64) {
    *position += *velocity * dt;
    *covariance += dt * dt;
    let gain = *covariance / (*covariance + r);
    let residual = measurement - *position;
    *position += gain * residual;
    *covariance *= 1.0 - gain;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]

## Sources
- [Wikipedia: Kalman tracking](https://en.wikipedia.org/wiki/Kalman_filter)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
