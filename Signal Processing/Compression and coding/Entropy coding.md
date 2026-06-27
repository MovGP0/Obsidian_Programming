---
title: Entropy coding
---
**Entropy coding** is a signal-processing method used in compression and coding for this role: Huffman/arithmetic coding. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Coding maps samples or transform coefficients to symbols. Quantization uses $\hat{x}=\Delta\operatorname{round}(x/\Delta)$, while entropy coding assigns shorter code words to more probable symbols.

## Code Example
```rust
fn symbol_frequencies(symbols: &[u8]) -> [usize; 256] {
    let mut counts = [0usize; 256];

    for &symbol in symbols {
        counts[symbol as usize] += 1;
    }

    counts
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[PCM]]
- [[ADPCM]]
- [[Transform coding]]
- [[Vector quantization]]

## Sources
- [Wikipedia: Entropy coding](https://en.wikipedia.org/wiki/Entropy_coding)
- [Stanford: Data compression](https://web.stanford.edu/class/ee398a/handouts/lectures/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
