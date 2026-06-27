---
title: Pitch tracking
---
**Pitch tracking** is a signal-processing method used in speech processing for this role: Fundamental frequency estimation. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Pitch tracking estimates the fundamental period of voiced speech. Autocorrelation-based trackers compute $r[\ell]=\sum_n x[n]x[n-\ell]$ over plausible pitch lags and choose the strongest normalized peak as the period estimate.

## Code Example
```csharp
static int EstimatePitchLag(ReadOnlySpan<double> frame, int minLag, int maxLag)
{
    var bestLag = minLag;
    var bestCorrelation = double.NegativeInfinity;

    for (var lag = minLag; lag <= maxLag; lag++)
    {
        var correlation = 0.0;

        for (var n = lag; n < frame.Length; n++)
        {
            correlation += frame[n] * frame[n - lag];
        }

        if (correlation > bestCorrelation)
        {
            bestCorrelation = correlation;
            bestLag = lag;
        }
    }

    return bestLag;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Voice activity detection]]
- [[Linear predictive coding]]
- [[MFCC extraction]]
- [[Echo cancellation]]

## Sources
- [Wikipedia: Pitch tracking](https://en.wikipedia.org/wiki/Pitch_detection_algorithm)
- [CMU Sphinx: Front-end feature extraction](https://cmusphinx.github.io/wiki/tutorialconcepts/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
