---
title: DCT coding
---
**DCT coding** is a signal-processing method used in compression and coding for this role: JPEG/audio/video compression. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
For block samples $x_n$, a DCT-II coefficient is $X_k = \alpha_k \sum_{n=0}^{N-1} x_n \cos(\pi(n+1/2)k/N)$, concentrating smooth signal energy into low-frequency terms.

## Code Example
```rust
fn quantized_dct_coefficient(block: &[f32], k: usize, quantizer: f32) -> i16 {
    let n = block.len() as f32;
    let mut sum = 0.0;

    for (i, &sample) in block.iter().enumerate() {
        sum += sample * (std::f32::consts::PI * (i as f32 + 0.5) * k as f32 / n).cos();
    }

    (sum / quantizer).round() as i16
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[PCM]]
- [[ADPCM]]
- [[Transform coding]]
- [[Entropy coding]]

## Sources
- [Wikipedia: DCT coding](https://en.wikipedia.org/wiki/Discrete_cosine_transform)
- [Stanford: Data compression](https://web.stanford.edu/class/ee398a/handouts/lectures/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
