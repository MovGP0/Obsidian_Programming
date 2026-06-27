---
title: Elliptic Filter
---
**Elliptic Filter** is an IIR design with ripple in both passband and stopband. For a given order and ripple constraints, it gives the steepest transition among the classical analog-prototype families.

## Mathematical description

The response uses elliptic rational functions, giving equiripple behavior on both sides of the transition band. The design is specified by order, passband ripple, stopband attenuation, and cutoff.

## C# example

```csharp
static bool MeetsEllipticMask(double magnitudeDb, double passbandRippleDb, double stopbandAttenuationDb, bool inPassband)
{
    return inPassband
        ? magnitudeDb >= -passbandRippleDb
        : magnitudeDb <= -stopbandAttenuationDb;
}
```

## Related

- [[_Signal Processing]]
- [[Chebyshev Type I Filter]]
- [[Chebyshev Type II Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)