---
title: Finite Impulse Response Filter (FIR)
---
**Finite Impulse Response Filter (FIR)** computes each output from a finite weighted sum of input samples. FIR filters are always BIBO stable and can be designed with exact linear phase.

## Mathematical description

The difference equation is $y[n]=\sum_{k=0}^{M}b_k x[n-k]$. The impulse response is exactly the coefficient sequence $b_k$ and becomes zero after $M$ delays.

## C# example

```csharp
static double SymmetricFir(ReadOnlySpan<double> delayLine, ReadOnlySpan<double> taps)
{
    var sum = 0.0;
    var last = taps.Length - 1;

    for (var i = 0; i < taps.Length / 2; i++)
    {
        sum += taps[i] * (delayLine[i] + delayLine[last - i]);
    }

    if (taps.Length % 2 == 1)
    {
        sum += taps[taps.Length / 2] * delayLine[taps.Length / 2];
    }

    return sum;
}
```

## Related

- [[_Signal Processing]]
- [[Moving Average Filter]]
- [[Half-Band Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)