---
title: Predictive coding
---
**Predictive coding** is a signal-processing method used in compression and coding for this role: Model-based compression. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Prediction estimates $\hat{x}[n]=\sum_{k=1}^{p}a_k x[n-k]$ and stores or filters the residual $e[n]=x[n]-\hat{x}[n]$; coefficients usually minimize squared residual energy.

## Code Example
```rust
fn predictive_residuals(samples: &[i16]) -> Vec<i16> {
    let mut previous = 0i16;
    let mut residuals = Vec::with_capacity(samples.len());

    for &sample in samples {
        let prediction = previous;
        let residual = sample - prediction;
        residuals.push(residual);
        previous = prediction + residual;
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
- [Wikipedia: Predictive coding](https://en.wikipedia.org/wiki/Predictive_coding)
- [Stanford: Data compression](https://web.stanford.edu/class/ee398a/handouts/lectures/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
