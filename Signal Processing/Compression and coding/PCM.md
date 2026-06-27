---
title: PCM
---
**PCM** is a signal-processing method used in compression and coding for this role: Raw sampled signal coding. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Coding maps samples or transform coefficients to symbols. Quantization uses $\hat{x}=\Delta\operatorname{round}(x/\Delta)$, while entropy coding assigns shorter code words to more probable symbols.

## Code Example
```rust
fn pcm16_le(samples: &[f32]) -> Vec<u8> {
    let mut bytes = Vec::with_capacity(samples.len() * 2);

    for &sample in samples {
        let scaled = (sample.clamp(-1.0, 1.0) * i16::MAX as f32).round() as i16;
        bytes.extend_from_slice(&scaled.to_le_bytes());
    }

    bytes
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[ADPCM]]
- [[Transform coding]]
- [[Entropy coding]]
- [[Vector quantization]]

## Sources
- [Wikipedia: PCM](https://en.wikipedia.org/wiki/Pulse-code_modulation)
- [Stanford: Data compression](https://web.stanford.edu/class/ee398a/handouts/lectures/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
