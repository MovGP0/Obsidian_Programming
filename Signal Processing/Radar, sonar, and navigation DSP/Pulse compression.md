---
title: Pulse compression
---
**Pulse compression** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Improve range resolution. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Correlation compares a received signal with a template: $r_{xy}[\ell]=\sum_n x[n]y^*[n-\ell]$. A matched filter uses $h[n]=s^*[N-1-n]$ to maximize SNR for a known waveform in white noise.

## Code Example
```rust
fn pulse_compress(rx: &[f64], transmit_chirp: &[f64]) -> Vec<f64> {
    matched_filter_response(rx, transmit_chirp)
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Matched filtering]]
- [[Range-Doppler FFT]]
- [[CFAR detection]]
- [[Kalman tracking]]

## Sources
- [Wikipedia: Pulse compression](https://en.wikipedia.org/wiki/Pulse_compression)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
