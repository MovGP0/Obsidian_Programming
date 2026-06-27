---
title: Subband coding
---
**Subband coding** is a signal-processing method used in compression and coding for this role: Split signal into frequency bands. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Coding maps samples or transform coefficients to symbols. Quantization uses $\hat{x}=\Delta\operatorname{round}(x/\Delta)$, while entropy coding assigns shorter code words to more probable symbols.

## Code Example
```rust
fn two_band_subband(samples: &[f32]) -> (Vec<f32>, Vec<f32>) {
    let mut low = Vec::new();
    let mut high = Vec::new();

    for pair in samples.chunks_exact(2) {
        low.push((pair[0] + pair[1]) * 0.5);
        high.push((pair[0] - pair[1]) * 0.5);
    }

    (low, high)
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[PCM]]
- [[ADPCM]]
- [[Transform coding]]
- [[Entropy coding]]

## Sources
- [Wikipedia: Subband coding](https://en.wikipedia.org/wiki/Sub-band_coding)
- [Stanford: Data compression](https://web.stanford.edu/class/ee398a/handouts/lectures/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
