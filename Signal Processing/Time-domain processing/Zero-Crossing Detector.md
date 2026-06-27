---
title: Zero-Crossing Detector
---
**Zero-Crossing Detector** detects sign changes in a waveform. It is a simple way to estimate frequency, phase, or event timing when the signal has a stable baseline.

## Mathematical description

A crossing occurs between $n-1$ and $n$ when $x[n-1]x[n] < 0$. Linear interpolation estimates the crossing time as $t_c = t_{n-1} + T_s \frac{|x[n-1]|}{|x[n-1]|+|x[n]|}$.

## C# example

```csharp
static bool TryFindZeroCrossing(
    double previous,
    double current,
    double samplePeriodSeconds,
    out double offsetSeconds)
{
    offsetSeconds = 0.0;

    if (previous == 0.0)
    {
        return true;
    }

    if (Math.Sign(previous) == Math.Sign(current))
    {
        return false;
    }

    var fraction = Math.Abs(previous) / (Math.Abs(previous) + Math.Abs(current));
    offsetSeconds = fraction * samplePeriodSeconds;
    return true;
}
```

## Related

- [[_Signal Processing]]
- [[Schmitt Trigger]]
- [[Peak Detector]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)