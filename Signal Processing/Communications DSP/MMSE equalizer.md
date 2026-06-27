---
title: MMSE Equalizer
---
An **MMSE equalizer** balances channel inversion against noise amplification. It is preferred over zero forcing when the noise level is significant.

## Mathematical description

For channel response $H(f)$ and noise-to-signal ratio $\lambda$, the scalar frequency-domain form is $W(f)=H^*(f)/(|H(f)|^2+\lambda)$.

## Code example

```csharp
static (double Real, double Imag) MmseBin((double Real, double Imag) y, (double Real, double Imag) h, double noiseVariance)
{
    var denominator = h.Real * h.Real + h.Imag * h.Imag + noiseVariance;
    return ((y.Real * h.Real + y.Imag * h.Imag) / denominator,
        (y.Imag * h.Real - y.Real * h.Imag) / denominator);
}
```

## Related

- [[Zero-forcing equalizer]]
- [[Decision feedback equalizer]]
- [[MIMO detection]]

## Sources

- <https://en.wikipedia.org/wiki/Minimum_mean_square_error>
- <https://en.wikipedia.org/wiki/Equalization_(communications%29)>
