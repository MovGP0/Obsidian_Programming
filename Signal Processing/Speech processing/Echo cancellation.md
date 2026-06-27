---
title: Echo cancellation
---
**Echo cancellation** is a signal-processing method used in speech processing for this role: Remove acoustic echo. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
An adaptive echo canceller predicts the echo $\hat d[n] = \sum_{k=0}^{M-1} w_k[n]x[n-k]$ from a far-end reference $x[n]$ and subtracts it from the microphone signal $d[n]$. With normalized LMS, the update is $w_k[n+1] = w_k[n] + \mu e[n]x[n-k]/(\epsilon + \sum_k x^2[n-k])$, where $e[n]=d[n]-\hat d[n]$.

## Code Example
```csharp
static double NlmsEchoCancelSample(
    ReadOnlySpan<double> farEndDelayLine,
    double microphoneSample,
    Span<double> weights,
    double stepSize)
{
    var echoEstimate = 0.0;
    var referencePower = 1.0e-9;

    for (var i = 0; i < weights.Length; i++)
    {
        echoEstimate += weights[i] * farEndDelayLine[i];
        referencePower += farEndDelayLine[i] * farEndDelayLine[i];
    }

    var error = microphoneSample - echoEstimate;
    var normalizedStep = stepSize * error / referencePower;

    for (var i = 0; i < weights.Length; i++)
    {
        weights[i] += normalizedStep * farEndDelayLine[i];
    }

    return error;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Voice activity detection]]
- [[Linear predictive coding]]
- [[MFCC extraction]]
- [[Pitch tracking]]

## Sources
- [Wikipedia: Echo cancellation](https://en.wikipedia.org/wiki/Echo_suppression_and_cancellation)
- [CMU Sphinx: Front-end feature extraction](https://cmusphinx.github.io/wiki/tutorialconcepts/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
