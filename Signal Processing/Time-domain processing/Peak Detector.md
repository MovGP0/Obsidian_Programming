---
title: Peak Detector
---
**Peak Detector** finds local maxima or minima in a sampled signal. Practical detectors usually combine local comparisons with thresholds, minimum spacing, and hysteresis.

## Mathematical description

A local maximum at $n$ satisfies $x[n] > x[n-1]$ and $x[n] \ge x[n+1]$. For noisy signals, the condition is often applied after smoothing or with a prominence threshold.

## C# example

```csharp
static (int Index, double Value)? FindPeak(
    ReadOnlySpan<double> samples,
    double threshold,
    double minProminence,
    int minimumDistanceSamples)
{
    var lastPeak = -minimumDistanceSamples;

    for (var i = 1; i < samples.Length - 1; i++)
    {
        var isLocalMaximum = samples[i] > samples[i - 1] && samples[i] >= samples[i + 1];
        var prominence = samples[i] - Math.Max(samples[i - 1], samples[i + 1]);

        if (isLocalMaximum
            && samples[i] >= threshold
            && prominence >= minProminence
            && i - lastPeak >= minimumDistanceSamples)
        {
            return (i, samples[i]);
        }
    }

    return null;
}
```

## Related

- [[_Signal Processing]]
- [[Envelope Follower]]
- [[Median Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)