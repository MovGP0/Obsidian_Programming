---
title: Spectral subtraction
---
**Spectral subtraction** is a signal-processing method used in speech processing for this role: Speech noise reduction. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Spectral subtraction estimates a clean-speech magnitude spectrum by removing a noise magnitude estimate from each short-time spectral bin. A common rule is $|\hat S_k|=\max(|Y_k|-lpha|\hat N_k|,eta|Y_k|)$, preserving phase from the noisy signal.

## Code Example
```csharp
static double SpectralSubtractionMagnitude(double noisyMagnitude, double noiseMagnitude)
{
    const double overSubtraction = 1.2;
    const double spectralFloor = 0.02;

    var cleaned = noisyMagnitude - overSubtraction * noiseMagnitude;
    return Math.Max(cleaned, spectralFloor * noisyMagnitude);
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Voice activity detection]]
- [[Linear predictive coding]]
- [[MFCC extraction]]
- [[Pitch tracking]]

## Sources
- [Wikipedia: Spectral subtraction](https://en.wikipedia.org/wiki/Spectral_subtraction)
- [CMU Sphinx: Front-end feature extraction](https://cmusphinx.github.io/wiki/tutorialconcepts/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
