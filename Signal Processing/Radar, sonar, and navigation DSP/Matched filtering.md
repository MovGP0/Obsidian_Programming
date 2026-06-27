---
title: Matched filtering
---
**Matched filtering** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Detect reflected waveform. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Correlation compares a received signal with a template: $r_{xy}[\ell]=\sum_n x[n]y^*[n-\ell]$. A matched filter uses $h[n]=s^*[N-1-n]$ to maximize SNR for a known waveform in white noise.

## Code Example
```rust
fn matched_filter_response(rx: &[f64], template: &[f64]) -> Vec<f64> {
    (0..=rx.len() - template.len())
        .map(|offset| template.iter().enumerate().map(|(i, tap)| rx[offset + i] * template[template.len() - 1 - i]).sum())
        .collect()
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]
- [[Kalman tracking]]

## Sources
- [Wikipedia: Matched filtering](https://en.wikipedia.org/wiki/Matched_filter)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
