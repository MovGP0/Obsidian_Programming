---
title: Vector quantization
---
**Vector quantization** is a signal-processing method used in compression and coding for this role: Codebook-based compression. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Coding maps samples or transform coefficients to symbols. Quantization uses $\hat{x}=\Delta\operatorname{round}(x/\Delta)$, while entropy coding assigns shorter code words to more probable symbols.

## Code Example
```rust
fn nearest_codeword(vector: &[f32], codebook: &[Vec<f32>]) -> usize {
    let mut best = 0;
    let mut best_distance = f32::INFINITY;

    for (index, codeword) in codebook.iter().enumerate() {
        let distance: f32 = vector.iter().zip(codeword).map(|(x, c)| (x - c).powi(2)).sum();
        if distance < best_distance {
            best_distance = distance;
            best = index;
        }
    }

    best
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[PCM]]
- [[ADPCM]]
- [[Transform coding]]
- [[Entropy coding]]

## Sources
- [Wikipedia: Vector quantization](https://en.wikipedia.org/wiki/Vector_quantization)
- [Stanford: Data compression](https://web.stanford.edu/class/ee398a/handouts/lectures/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
