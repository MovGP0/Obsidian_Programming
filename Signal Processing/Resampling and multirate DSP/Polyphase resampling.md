---
title: Polyphase Resampling
---
**Polyphase resampling** decomposes a resampling filter into phases so only the coefficients needed for each output sample are evaluated.

For interpolation by $L$, a filter can be decomposed as

$$
H(z) = \sum_{\ell=0}^{L-1} z^{-\ell}E_\ell(z^L).
$$

Each $E_\ell$ is a phase branch. This avoids computing samples that would be discarded later in a rational resampler.

```csharp
static double PolyphaseResamplerOutput(ReadOnlySpan<double> input, double[][] phases, int phase, int inputIndex)
{
    var taps = phases[phase];
    var sum = 0.0;

    for (var i = 0; i < taps.Length; i++)
    {
        var sample = inputIndex - i;
        if ((uint)sample < input.Length)
        {
            sum += input[sample] * taps[i];
        }
    }

    return sum;
}
```

## Related

- [[Rational resampling]]
- [[Sample-rate conversion]]
- [[Decimation]]
- [[_Signal Processing]]

## Sources

- [SciPy upfirdn documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.upfirdn.html)
- [Wikipedia: Polyphase matrix](https://en.wikipedia.org/wiki/Polyphase_matrix)

