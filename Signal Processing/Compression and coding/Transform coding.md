---
title: Transform coding
---
**Transform coding** is a signal-processing method used in compression and coding for this role: Compression via frequency domain. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Coding maps samples or transform coefficients to symbols. Quantization uses $\hat{x}=\Delta\operatorname{round}(x/\Delta)$, while entropy coding assigns shorter code words to more probable symbols.

## Code Example
```rust
fn transform_code_block(block: &[f32], basis: &[Vec<f32>], quantizers: &[f32]) -> Vec<i16> {
    basis.iter()
        .zip(quantizers)
        .map(|(vector, &q)| {
            let coefficient: f32 = block.iter().zip(vector).map(|(x, b)| x * b).sum();
            (coefficient / q).round() as i16
        })
        .collect()
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[PCM]]
- [[ADPCM]]
- [[Entropy coding]]
- [[Vector quantization]]

## Sources
- [Wikipedia: Transform coding](https://en.wikipedia.org/wiki/Transform_coding)
- [Stanford: Data compression](https://web.stanford.edu/class/ee398a/handouts/lectures/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
