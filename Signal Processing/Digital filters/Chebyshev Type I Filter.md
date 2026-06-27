---
title: Chebyshev Type I Filter
---
**Chebyshev Type I Filter** is an IIR design with equiripple passband behavior and a monotonic stopband. It reaches a sharper cutoff than Butterworth for the same order.

## Mathematical description

The low-pass magnitude squared response is $|H(j\Omega)|^2=\frac{1}{1+\epsilon^2T_N^2(\Omega/\Omega_c)}$, where $T_N$ is a Chebyshev polynomial and $\epsilon$ controls passband ripple.

## C# example

```csharp
static double ChebyshevRippleFactor(double rippleDb)
{
    return Math.Sqrt(Math.Pow(10.0, rippleDb / 10.0) - 1.0);
}
```

## Related

- [[_Signal Processing]]
- [[Butterworth Filter]]
- [[Chebyshev Type II Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)