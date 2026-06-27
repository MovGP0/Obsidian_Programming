---
title: Linear predictive coding
---
**Linear predictive coding** (**LPC**) is a signal-processing method used in speech processing for this role: Speech modeling/compression. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Prediction estimates $\hat{x}[n]=\sum_{k=1}^{p}a_k x[n-k]$ and stores or filters the residual $e[n]=x[n]-\hat{x}[n]$; coefficients usually minimize squared residual energy.

## Code Example
```csharp
static double LinearPredictiveCodingPredict(ReadOnlySpan<double> pastSamples, ReadOnlySpan<double> coefficients)
{
    var estimate = 0.0;
    for (var i = 0; i < coefficients.Length; i++)
    {
        estimate += coefficients[i] * pastSamples[i];
    }

    return estimate;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Voice activity detection]]
- [[MFCC extraction]]
- [[Pitch tracking]]
- [[Echo cancellation]]

## Sources
- [Wikipedia: Linear predictive coding](https://en.wikipedia.org/wiki/Linear_predictive_coding)
- [CMU Sphinx: Front-end feature extraction](https://cmusphinx.github.io/wiki/tutorialconcepts/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
