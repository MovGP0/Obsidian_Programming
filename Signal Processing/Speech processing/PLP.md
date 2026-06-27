---
title: PLP
---
**PLP** is a signal-processing method used in speech processing for this role: Perceptual speech features. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
PLP estimates speech features after psychoacoustic warping. A typical pipeline maps the spectrum to Bark-spaced critical bands, applies an equal-loudness curve, compresses intensity by a cube root, and then fits an all-pole model.

## Code Example
```csharp
static double PlpCompressedBandEnergy(double barkBandEnergy, double equalLoudnessWeight)
{
    var weightedEnergy = Math.Max(barkBandEnergy * equalLoudnessWeight, 1.0e-12);
    return Math.Pow(weightedEnergy, 1.0 / 3.0);
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Voice activity detection]]
- [[Linear predictive coding]]
- [[MFCC extraction]]
- [[Pitch tracking]]

## Sources
- [Wikipedia: PLP](https://pubmed.ncbi.nlm.nih.gov/2341679/)
- [CMU Sphinx: Front-end feature extraction](https://cmusphinx.github.io/wiki/tutorialconcepts/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
