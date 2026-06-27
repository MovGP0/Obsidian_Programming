---
title: Interpolation
---
**Interpolation** increases a discrete signal's sample rate by inserting new samples between existing samples.

For integer interpolation by $L$, zero-stuffing creates $u[n]$:

$$
u[n] =
\begin{cases}
x[n/L], & n \equiv 0 \pmod L \\
0, & \text{otherwise}
\end{cases}
$$

A low-pass interpolation filter then reconstructs smooth intermediate values and removes imaging components.

```csharp
static double InterpolatedFirOutput(ReadOnlySpan<double> input, ReadOnlySpan<double> taps, int factor, int outputIndex)
{
    var sum = 0.0;

    for (var tap = 0; tap < taps.Length; tap++)
    {
        var upsampledIndex = outputIndex - tap;
        if (upsampledIndex % factor == 0)
        {
            var sample = upsampledIndex / factor;
            if ((uint)sample < input.Length)
            {
                sum += input[sample] * taps[tap];
            }
        }
    }

    return sum;
}
```

## Related

- [[Decimation]]
- [[Sinc interpolation]]
- [[Fractional delay filter]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Upsampling](https://en.wikipedia.org/wiki/Upsampling)
- [SciPy upfirdn documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.upfirdn.html)

