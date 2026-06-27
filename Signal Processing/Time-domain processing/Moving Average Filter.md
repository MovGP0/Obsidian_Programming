---
title: Moving Average Filter
---
**Moving Average Filter** smooths a discrete signal by replacing each sample with the arithmetic mean of a short recent window. It is useful when random noise should be reduced without assuming a detailed signal model.

## Mathematical description

For a window of $M$ samples, the causal output is $y[n] = \frac{1}{M}\sum_{k=0}^{M-1} x[n-k]$. It is an FIR filter with equal coefficients, linear phase in centered form, and a sinc-shaped frequency response.

## C# example

```csharp
public sealed class MovingAverage
{
    private readonly Queue<double> _window = new();
    private readonly int _length;
    private double _sum;

    public MovingAverage(int length)
    {
        _length = length;
    }

    public double Update(double sample)
    {
        _window.Enqueue(sample);
        _sum += sample;

        if (_window.Count > _length)
        {
            _sum -= _window.Dequeue();
        }

        return _sum / _window.Count;
    }
}
```

## Related

- [[_Signal Processing]]
- [[Exponential Moving Average]]
- [[Finite Impulse Response Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)