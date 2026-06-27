---
title: µ-law / A-law companding
---
**µ-law / A-law companding** is a signal-processing method used in compression and coding for this role: Speech amplitude compression. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Coding maps samples or transform coefficients to symbols. Quantization uses $\hat{x}=\Delta\operatorname{round}(x/\Delta)$, while entropy coding assigns shorter code words to more probable symbols.

## Code Example
```rust
fn mu_law_encode(sample: f32, mu: f32) -> u8 {
    let x = sample.clamp(-1.0, 1.0);
    let compressed = x.signum() * (1.0 + mu * x.abs()).ln() / (1.0 + mu).ln();
    (((compressed + 1.0) * 127.5).round() as i32).clamp(0, 255) as u8
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[PCM]]
- [[ADPCM]]
- [[Transform coding]]
- [[Entropy coding]]

## Sources
- [Wikipedia: µ-law / A-law companding](https://en.wikipedia.org/wiki/%CE%9C-law_algorithm)
- [Stanford: Data compression](https://web.stanford.edu/class/ee398a/handouts/lectures/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
