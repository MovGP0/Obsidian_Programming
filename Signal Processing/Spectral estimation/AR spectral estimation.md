---
title: Autoregressive Spectral Estimation
---
**Autoregressive spectral estimation** models a signal as the output of an all-pole filter driven by white noise.

An AR($p$) model is

$$
x[n] + \sum_{k=1}^{p} a_k x[n-k] = e[n].
$$

If the driving-noise variance is $\sigma_e^2$, the power spectrum is

$$
S_{xx}(e^{j\omega}) = \frac{\sigma_e^2}{\left|1 + \sum_{k=1}^{p}a_ke^{-j\omega k}\right|^2}.
$$

```csharp
static double ArPower(double omega, double noiseVariance, double[] a)
{
    double real = 1;
    double imag = 0;

    for (int k = 0; k < a.Length; k++)
    {
        double phase = -omega * (k + 1);
        real += a[k] * Math.Cos(phase);
        imag += a[k] * Math.Sin(phase);
    }

    return noiseVariance / (real * real + imag * imag);
}
```

## Related

- [[Yule-Walker method]]
- [[Burg method]]
- [[Prony method]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Autoregressive model](https://en.wikipedia.org/wiki/Autoregressive_model)
- [DSPRelated: Spectral Audio Signal Processing](https://www.dsprelated.com/freebooks/sasp/)

