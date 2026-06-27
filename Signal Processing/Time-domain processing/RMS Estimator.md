---
title: Root Mean Square Estimator (RMS)
---
**Root Mean Square Estimator (RMS)** estimates the effective amplitude or power of a signal over a window. RMS is meaningful for audio level, vibration, and AC measurements.

## Mathematical description

For a window of $M$ samples, $x_\mathrm{rms}[n] = \sqrt{\frac{1}{M}\sum_{k=0}^{M-1}x^2[n-k]}$. Exponential RMS variants smooth the squared signal before taking the square root.

## C# example

```csharp
public static double Rms(ReadOnlySpan<double> window)
{
    var sum = 0.0;

    foreach (var sample in window)
    {
        sum += sample * sample;
    }

    return Math.Sqrt(sum / window.Length);
}
```

## Related

- [[_Signal Processing]]
- [[Envelope Follower]]
- [[Moving Average Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)
