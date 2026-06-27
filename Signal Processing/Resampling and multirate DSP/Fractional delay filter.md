---
title: Fractional Delay Filter
---
**Fractional delay filter** delays a discrete signal by a non-integer number of samples.

An ideal delay of $D$ samples has frequency response

$$
H(e^{j\omega}) = e^{-j\omega D}.
$$

For $D = m + \mu$, the integer part $m$ is a normal delay line and the fractional part $\mu$ is approximated with FIR, all-pass, Lagrange, or Farrow interpolation.

```csharp
static (double C0, double C1, double C2, double C3) LagrangeFractionalDelay(double mu)
{
    return (
        -mu * (mu - 1.0) * (mu - 2.0) / 6.0,
        (mu + 1.0) * (mu - 1.0) * (mu - 2.0) / 2.0,
        -(mu + 1.0) * mu * (mu - 2.0) / 2.0,
        (mu + 1.0) * mu * (mu - 1.0) / 6.0);
}
```

## Related

- [[Farrow structure]]
- [[Sinc interpolation]]
- [[Sample-rate conversion]]
- [[_Signal Processing]]

## Sources

- [DSPRelated: Fractional delay filters](https://www.dsprelated.com/freebooks/pasp/Fractional_Delay_Filtering_Linear.html)
- [Wikipedia: Digital filter](https://en.wikipedia.org/wiki/Digital_filter)

