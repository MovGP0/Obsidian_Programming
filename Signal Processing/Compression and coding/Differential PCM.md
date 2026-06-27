---
title: Differential PCM
---
**Differential PCM** is a signal-processing method used in compression and coding for this role: Encode sample differences. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Coding maps samples or transform coefficients to symbols. Quantization uses $\hat{x}=\Delta\operatorname{round}(x/\Delta)$, while entropy coding assigns shorter code words to more probable symbols.

## Code Example
```rust
fn differential_pcm(samples: &[i16]) -> Vec<i16> {
    let mut previous = 0i16;
    let mut residuals = Vec::with_capacity(samples.len());

    for &sample in samples {
        let residual = sample.wrapping_sub(previous);
        residuals.push(residual);
        previous = previous.wrapping_add(residual);
    }

    residuals
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[PCM]]
- [[ADPCM]]
- [[Transform coding]]
- [[Entropy coding]]

## Sources
- [Wikipedia: Differential PCM](https://en.wikipedia.org/wiki/Differential_pulse-code_modulation)
- [Stanford: Data compression](https://web.stanford.edu/class/ee398a/handouts/lectures/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
