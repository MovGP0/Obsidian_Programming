---
title: Half-Band Filter
---
**Half-Band Filter** is a low-pass FIR filter optimized for factor-of-two interpolation or decimation. Nearly every other coefficient is zero, reducing computation.

## Mathematical description

For an ideal half-band low-pass, the cutoff is one quarter of the sample rate and $H(e^{j\omega}) + H(e^{j(\pi-\omega)}) = 1$. Linear-phase FIR designs exploit zero-valued odd taps except the center tap.

## C# example

```csharp
static double HalfBandFir(ReadOnlySpan<double> delayLine, ReadOnlySpan<double> evenTaps, double centerTap)
{
    var sum = centerTap * delayLine[delayLine.Length / 2];

    for (var i = 0; i < evenTaps.Length; i++)
    {
        var left = 2 * i;
        var right = delayLine.Length - 1 - left;
        sum += evenTaps[i] * (delayLine[left] + delayLine[right]);
    }

    return sum;
}
```

## Related

- [[_Signal Processing]]
- [[Finite Impulse Response Filter]]
- [[Polyphase filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)