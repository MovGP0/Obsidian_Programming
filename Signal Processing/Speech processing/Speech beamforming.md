---
title: Beamforming
---
**Beamforming** is a signal-processing method used in speech processing for this role: Spatial speech enhancement. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A delay-and-sum beamformer combines microphone channels after steering delays: $y[n]=\sum_{m=0}^{M-1}w_m x_m[n-	au_m]$. Choosing $	au_m$ from array geometry reinforces sound from the target direction and attenuates other directions.

## Code Example
```csharp
static double DelayAndSumSample(
    IReadOnlyList<ReadOnlyMemory<double>> microphones,
    ReadOnlySpan<int> delays,
    int sampleIndex)
{
    var sum = 0.0;

    for (var mic = 0; mic < microphones.Count; mic++)
    {
        var samples = microphones[mic].Span;
        sum += samples[sampleIndex - delays[mic]];
    }

    return sum / microphones.Count;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Voice activity detection]]
- [[Linear predictive coding]]
- [[MFCC extraction]]
- [[Pitch tracking]]

## Sources
- [Wikipedia: Beamforming](https://en.wikipedia.org/wiki/Beamforming)
- [CMU Sphinx: Front-end feature extraction](https://cmusphinx.github.io/wiki/tutorialconcepts/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
