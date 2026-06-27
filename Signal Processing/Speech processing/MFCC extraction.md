---
title: MFCC extraction
---
**MFCC extraction** is a signal-processing method used in speech processing for this role: Speech/audio features. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
MFCC extraction maps a short-time magnitude spectrum to mel filter-bank energies, applies a logarithm, and decorrelates the result with a DCT. A coefficient is $c_m = \sum_{k=0}^{K-1}\log(E_k)\cos(\pi m(k+1/2)/K)$, where $E_k$ is the energy in mel band $k$.

## Code Example
```csharp
static double MfccCoefficient(ReadOnlySpan<double> melEnergies, int coefficient)
{
    var sum = 0.0;
    var bandCount = melEnergies.Length;

    for (var band = 0; band < bandCount; band++)
    {
        var logEnergy = Math.Log(Math.Max(melEnergies[band], 1.0e-12));
        sum += logEnergy * Math.Cos(Math.PI * coefficient * (band + 0.5) / bandCount);
    }

    return sum;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Voice activity detection]]
- [[Linear predictive coding]]
- [[Pitch tracking]]
- [[Echo cancellation]]

## Sources
- [Wikipedia: MFCC extraction](https://en.wikipedia.org/wiki/Mel-frequency_cepstrum)
- [CMU Sphinx: Front-end feature extraction](https://cmusphinx.github.io/wiki/tutorialconcepts/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
