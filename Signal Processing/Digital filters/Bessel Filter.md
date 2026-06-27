---
title: Bessel Filter
---
**Bessel Filter** prioritizes nearly constant group delay over a sharp magnitude cutoff. It is chosen when waveform shape and transient response matter.

## Mathematical description

The analog prototype denominator is based on reverse Bessel polynomials. Digital versions approximate the delay behavior after transformation, usually with less steep attenuation than Butterworth or Chebyshev designs.

## C# example

```csharp
static double ApplyBesselSection(double x, ref double z1, ref double z2)
{
    const double b0 = 0.067455;
    const double b1 = 0.134911;
    const double b2 = 0.067455;
    const double a1 = -1.14298;
    const double a2 = 0.412802;

    var y = b0 * x + z1;
    z1 = b1 * x - a1 * y + z2;
    z2 = b2 * x - a2 * y;
    return y;
}
```

## Related

- [[_Signal Processing]]
- [[Butterworth Filter]]
- [[All-Pass Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)