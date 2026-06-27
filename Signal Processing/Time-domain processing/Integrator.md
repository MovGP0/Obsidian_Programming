---
title: Integrator
---
**Integrator** accumulates a signal over time, converting a sampled rate into a running quantity such as distance, charge, or energy. Numerical integration must manage drift and bias.

## Mathematical description

A rectangular integrator uses $y[n] = y[n-1] + T_s x[n]$. A trapezoidal integrator uses $y[n] = y[n-1] + \frac{T_s}{2}(x[n]+x[n-1])$ for lower discretization error.

## C# example

```csharp
public sealed class TrapezoidalIntegrator
{
    private double? _previous;
    private double _area;

    public double Update(double sample, double samplePeriodSeconds)
    {
        if (_previous is not null)
        {
            _area += 0.5 * (_previous.Value + sample) * samplePeriodSeconds;
        }

        _previous = sample;
        return _area;
    }
}
```

## Related

- [[_Signal Processing]]
- [[Differentiator]]
- [[Kalman Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)