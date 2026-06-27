---
title: Envelope Follower
---
**Envelope Follower** tracks the slowly varying amplitude of a faster signal. Audio meters, compressors, and demodulators use envelope followers to separate amplitude from carrier detail.

## Mathematical description

A common form rectifies the input and applies asymmetric smoothing: $e[n] = \alpha_a |x[n]| + (1-\alpha_a)e[n-1]$ when rising, and $\alpha_r$ when falling.

## C# example

```csharp
public sealed class EnvelopeFollower
{
    private readonly double _attack;
    private readonly double _release;
    private double _envelope;

    public EnvelopeFollower(double attack, double release)
    {
        _attack = attack;
        _release = release;
    }

    public double Update(double sample)
    {
        var target = Math.Abs(sample);
        var alpha = target > _envelope ? _attack : _release;
        _envelope = alpha * target + (1.0 - alpha) * _envelope;
        return _envelope;
    }
}
```

## Related

- [[_Signal Processing]]
- [[RMS Estimator]]
- [[Hilbert Transform]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)