---
title: ADPCM
---
**ADPCM** is a signal-processing method used in compression and coding for this role: Adaptive differential coding. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Coding maps samples or transform coefficients to symbols. Quantization uses $\hat{x}=\Delta\operatorname{round}(x/\Delta)$, while entropy coding assigns shorter code words to more probable symbols.

## Code Example
```rust
fn adpcm_encode_step(sample: i16, predicted: &mut i16, step: &mut i16) -> i8 {
    let error = sample - *predicted;
    let code = (error / *step).clamp(-8, 7) as i8;
    *predicted = predicted.saturating_add(code as i16 * *step);
    *step = ((*step as i32 + (code.abs() as i32 * 4) - 1).clamp(1, 2048)) as i16;
    code
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[PCM]]
- [[Transform coding]]
- [[Entropy coding]]
- [[Vector quantization]]

## Sources
- [Wikipedia: ADPCM](https://en.wikipedia.org/wiki/Adaptive_differential_pulse-code_modulation)
- [Stanford: Data compression](https://web.stanford.edu/class/ee398a/handouts/lectures/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
