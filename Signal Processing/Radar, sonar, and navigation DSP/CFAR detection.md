---
title: CFAR detection
---
**CFAR detection** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Adaptive radar target detection. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
CFAR estimates local clutter power from reference cells and declares a target when the cell under test satisfies $x_{CUT} > \alpha\hat{\sigma}$ for a chosen false-alarm probability.

## Code Example
```rust
fn cfardetection_detect(cut: f32, reference_cells: &[f32], scale: f32) -> bool {
    let noise = reference_cells.iter().sum::<f32>() / reference_cells.len() as f32;
    cut > scale * noise
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[Kalman tracking]]

## Sources
- [Wikipedia: CFAR detection](https://en.wikipedia.org/wiki/Constant_false_alarm_rate)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
