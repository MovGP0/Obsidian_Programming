---
title: ESPRIT DOA
---
**ESPRIT DOA** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Direction-of-arrival estimation. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
ESPRIT uses paired sensor subarrays and solves a rotational-invariance eigenproblem, so phase shifts between subarrays yield directions or frequencies without an exhaustive angle scan.

## Code Example
```rust
fn esprit_angle(eigen_real: f64, eigen_imag: f64, wavelength: f64, spacing: f64) -> f64 {
    let phase = eigen_imag.atan2(eigen_real);
    (phase * wavelength / (2.0 * std::f64::consts::PI * spacing)).asin()
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]

## Sources
- [Wikipedia: ESPRIT DOA](https://en.wikipedia.org/wiki/Estimation_of_signal_parameters_via_rotational_invariance_techniques)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
