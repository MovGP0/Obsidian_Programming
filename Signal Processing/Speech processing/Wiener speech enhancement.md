---
title: Wiener speech enhancement
---
**Wiener speech enhancement** is a signal-processing method used in speech processing for this role: Noise suppression. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Wiener speech enhancement applies a frequency-dependent gain that minimizes mean-square error under speech and noise power estimates. For a bin with speech power $S_k$ and noise power $N_k$, the gain is $G_k=S_k/(S_k+N_k)$ and $\hat X_k=G_kY_k$.

## Code Example
```csharp
static double WienerGain(double noisyPower, double noisePower)
{
    var speechPower = Math.Max(noisyPower - noisePower, 0.0);
    return speechPower / Math.Max(speechPower + noisePower, 1.0e-12);
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Voice activity detection]]
- [[Linear predictive coding]]
- [[MFCC extraction]]
- [[Pitch tracking]]

## Sources
- [Wikipedia: Wiener speech enhancement](https://en.wikipedia.org/wiki/Wiener_filter)
- [CMU Sphinx: Front-end feature extraction](https://cmusphinx.github.io/wiki/tutorialconcepts/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
