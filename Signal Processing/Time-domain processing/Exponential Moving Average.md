---
title: Exponential Moving Average (EMA)
---
**Exponential Moving Average (EMA)** is a first-order smoother that gives the newest sample the largest weight and decays older samples exponentially. It is common in streaming telemetry because it stores only one state value.

## Mathematical description

The recurrence is $y[n] = \alpha x[n] + (1-\alpha)y[n-1]$, with $0 < \alpha \le 1$. Smaller $\alpha$ increases smoothing and lag; larger $\alpha$ follows faster changes.

## C# example

```csharp
public sealed class ExponentialMovingAverage
{
    private readonly double _alpha;
    private double? _state;

    public ExponentialMovingAverage(double alpha)
    {
        _alpha = alpha;
    }

    public double Update(double sample)
    {
        _state = _state is null
            ? sample
            : _alpha * sample + (1.0 - _alpha) * _state.Value;

        return _state.Value;
    }
}
```

## Related

- [[_Signal Processing]]
- [[Moving Average Filter]]
- [[Infinite Impulse Response Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)