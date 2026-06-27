---
title: Chebyshev Type II Filter
---
**Chebyshev Type II Filter** is an IIR design with monotonic passband behavior and equiripple stopband behavior. It is also called an inverse Chebyshev filter.

## Mathematical description

The stopband ripple is controlled by $\epsilon$ while the passband remains monotonic. Compared with Type I, ripple is moved from the passband to the stopband.

## C# example

```csharp
static double ChebyshevStopbandFactor(double stopbandAttenuationDb)
{
    return 1.0 / Math.Sqrt(Math.Pow(10.0, stopbandAttenuationDb / 10.0) - 1.0);
}
```

## Related

- [[_Signal Processing]]
- [[Chebyshev Type I Filter]]
- [[Elliptic Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)