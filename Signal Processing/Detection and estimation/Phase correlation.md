---
title: Phase Correlation
---
**Phase correlation** estimates translation between two signals or images by using only the phase of their cross-power spectrum.

For Fourier transforms $F_1$ and $F_2$, compute

$$
R = \mathcal{F}^{-1}\left(\frac{F_1F_2^*}{|F_1F_2^*|}\right).
$$

The peak location of $R$ gives the relative shift. Normalizing the magnitude makes the method less sensitive to gain changes.

```csharp
static (double Real, double Imag) NormalizeCrossPower((double Real, double Imag) a, (double Real, double Imag) b)
{
    var real = a.Real * b.Real + a.Imag * b.Imag;
    var imag = a.Imag * b.Real - a.Real * b.Imag;
    var magnitude = Math.Sqrt(real * real + imag * imag);
    return (real / Math.Max(magnitude, 1.0e-12), imag / Math.Max(magnitude, 1.0e-12));
}
```

## Related

- [[Cross-correlation]]
- [[Correlation detector]]
- [[Sample-rate conversion]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Phase correlation](https://en.wikipedia.org/wiki/Phase_correlation)
- [Wikipedia: Cross-correlation](https://en.wikipedia.org/wiki/Cross-correlation)

