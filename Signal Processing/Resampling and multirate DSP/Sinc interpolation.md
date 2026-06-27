---
title: Sinc Interpolation
---
**Sinc interpolation** reconstructs an ideal bandlimited signal from uniformly spaced samples.

The Whittaker-Shannon interpolation formula is

$$
x(t) = \sum_{n=-\infty}^{\infty} x[n]\operatorname{sinc}\left(\frac{t}{T} - n\right).
$$

The infinite sinc is not directly implementable, so practical resamplers window and truncate it. The result is accurate but introduces latency and finite-band error.

```csharp
static double SincInterpolate(ReadOnlySpan<double> samples, double t, int radius)
{
    var sum = 0.0;

    for (var n = (int)t - radius; n <= (int)t + radius; n++)
    {
        if ((uint)n >= samples.Length)
        {
            continue;
        }

        var x = t - n;
        sum += samples[n] * (x == 0.0 ? 1.0 : Math.Sin(Math.PI * x) / (Math.PI * x));
    }

    return sum;
}
```

## Related

- [[Sample-rate conversion]]
- [[Interpolation]]
- [[Fractional delay filter]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Whittaker-Shannon interpolation formula](https://en.wikipedia.org/wiki/Whittaker%E2%80%93Shannon_interpolation_formula)
- [Wikipedia: Sinc function](https://en.wikipedia.org/wiki/Sinc_function)

