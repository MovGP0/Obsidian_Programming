---
title: Comb Filter
---
**Comb Filter** creates regularly spaced notches or peaks by adding a delayed copy of a signal. It appears in echo effects, pitch coloration, and sample-rate structures.

## Mathematical description

A feed-forward comb uses $y[n]=x[n]+g x[n-D]$. Its frequency response is periodic because delay $D$ introduces phase rotations that repeat over frequency.

## C# example

```csharp
public sealed class FeedForwardComb
{
    private readonly double[] _delay;
    private readonly double _gain;
    private int _index;

    public FeedForwardComb(int delaySamples, double gain)
    {
        _delay = new double[delaySamples];
        _gain = gain;
    }

    public double Update(double sample)
    {
        var delayed = _delay[_index];
        _delay[_index] = sample;
        _index = (_index + 1) % _delay.Length;
        return sample + _gain * delayed;
    }
}
```

## Related

- [[_Signal Processing]]
- [[Notch Filter]]
- [[Cascaded Integrator-Comb Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)