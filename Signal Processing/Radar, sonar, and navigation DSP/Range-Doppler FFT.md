---
title: Range-Doppler FFT
---
**Range-Doppler FFT** is a signal-processing method used in radar, sonar, and navigation dsp for this role: Radar range/velocity map. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The discrete Fourier transform is $X[k]=\sum_{n=0}^{N-1}x[n]e^{-j2\pi kn/N}$; FFT factorizations compute the same spectrum with $O(N\log N)$ operations.

## Code Example
```rust
fn range_doppler_cell(range_fft_by_pulse: &[Vec<f64>], range_bin: usize, doppler_bin: usize) -> f64 {
    let slow_time: Vec<f64> = range_fft_by_pulse.iter().map(|pulse| pulse[range_bin]).collect();
    doppler_bin_power(&slow_time, doppler_bin)
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Pulse compression]]
- [[Matched filtering]]
- [[CFAR detection]]
- [[Kalman tracking]]

## Sources
- [Wikipedia: Range-Doppler FFT](https://www.radartutorial.eu/10.processing/sp20.en.html)
- [Radartutorial: Radar signal processing](https://www.radartutorial.eu/10.processing/sp05.en.html)
- [MathWorks: Radar signal processing](https://en.wikipedia.org/wiki/Radar_signal_processing)
