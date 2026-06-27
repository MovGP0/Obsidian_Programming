---
title: Burg Method
---
**Burg method** estimates autoregressive coefficients by minimizing forward and backward prediction errors.

At order $m$, Burg chooses a reflection coefficient $k_m$ that reduces

$$
E_m = \sum_n |f_m[n]|^2 + |b_m[n]|^2,
$$

where $f_m$ and $b_m$ are forward and backward prediction errors. The recursion tends to produce stable all-pole models because reflection coefficients remain inside the unit circle.

```csharp
static double ReflectionCoefficient(double[] forward, double[] backward)
{
    double numerator = 0;
    double denominator = 0;

    for (int i = 1; i < forward.Length; i++)
    {
        numerator += forward[i] * backward[i - 1];
        denominator += forward[i] * forward[i] + backward[i - 1] * backward[i - 1];
    }

    return -2.0 * numerator / Math.Max(denominator, 1e-12);
}
```

## Related

- [[AR spectral estimation]]
- [[Yule-Walker method]]
- [[Prony method]]
- [[_Signal Processing]]

## Sources

- [Spectrum: Parametric methods](https://pyspectrum.readthedocs.io/en/latest/ref_param.html)
- [DSPRelated: Spectral Audio Signal Processing](https://www.dsprelated.com/freebooks/sasp/)

