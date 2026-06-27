---
title: Formant estimation
---
**Formant estimation** is a signal-processing method used in speech processing for this role: Vocal tract resonance analysis. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Formant estimation finds resonant peaks in a speech spectral envelope. In LPC-based formant tracking, the all-pole vocal-tract model $H(z)=G/(1+\sum_{k=1}^{p}a_k z^{-k})$ is analyzed by the roots of its denominator; roots near the unit circle give formant frequencies and bandwidths.

## Code Example
```csharp
static int PickFormantBin(ReadOnlySpan<double> spectralEnvelope, int minBin, int maxBin)
{
    var bestBin = minBin;
    var bestValue = double.NegativeInfinity;

    for (var bin = minBin + 1; bin < maxBin - 1; bin++)
    {
        var isLocalPeak = spectralEnvelope[bin] > spectralEnvelope[bin - 1]
            && spectralEnvelope[bin] >= spectralEnvelope[bin + 1];

        if (isLocalPeak && spectralEnvelope[bin] > bestValue)
        {
            bestValue = spectralEnvelope[bin];
            bestBin = bin;
        }
    }

    return bestBin;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Voice activity detection]]
- [[Linear predictive coding]]
- [[MFCC extraction]]
- [[Pitch tracking]]

## Sources
- [Wikipedia: Formant estimation](https://en.wikipedia.org/wiki/Formant)
- [CMU Sphinx: Front-end feature extraction](https://cmusphinx.github.io/wiki/tutorialconcepts/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
