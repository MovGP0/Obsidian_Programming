---
title: Track-before-detect
---
**Track-before-detect** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Weak target tracking. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The core computation is a discrete-time operator on samples, frames, or coefficients. It is usually analyzed by the mapping from input $x[n]$ to output $y[n]$ and by the error, energy, or likelihood criterion optimized by the algorithm.

## Code Example
```rust
fn track_before_detect(previous_score: f64, cell_energy: f64, transition_penalty: f64) -> f64 {
    previous_score + cell_energy - transition_penalty
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]

## Sources
- [Wikipedia: Track-before-detect](https://en.wikipedia.org/wiki/Track-before-detect)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
