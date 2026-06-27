---
title: Polyphase Filter
---
**Polyphase Filter** decomposes a filter into phases so only the coefficients needed for a particular output sample are evaluated. It is central to efficient resampling and filter banks.

## Mathematical description

A filter $H(z)$ can be split into $M$ branches as $H(z)=\sum_{m=0}^{M-1} z^{-m}E_m(z^M)$. Each branch $E_m$ processes one phase of the impulse response.

## C# example

```csharp
static double PolyphaseBranch(ReadOnlySpan<double> delayLine, double[][] phases, int phase)
{
    var taps = phases[phase];
    var sum = 0.0;

    for (var i = 0; i < taps.Length; i++)
    {
        sum += taps[i] * delayLine[i];
    }

    return sum;
}
```

## Related

- [[_Signal Processing]]
- [[Half-Band Filter]]
- [[Wavelet Transform]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)