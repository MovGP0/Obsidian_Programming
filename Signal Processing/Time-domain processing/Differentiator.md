---
title: Differentiator
---
**Differentiator** estimates the rate of change of a sampled signal. It highlights transitions and slopes, but also amplifies high-frequency noise.

## Mathematical description

The simplest backward difference is $y[n] = \frac{x[n]-x[n-1]}{T_s}$. Higher-order differentiators choose FIR coefficients that approximate $j\omega$ over a useful bandwidth.

## C# example

```csharp
public static double Differentiate(double previous, double current, double samplePeriodSeconds)
{
    return (current - previous) / samplePeriodSeconds;
}
```

## Related

- [[_Signal Processing]]
- [[Integrator]]
- [[Savitzky-Golay Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)