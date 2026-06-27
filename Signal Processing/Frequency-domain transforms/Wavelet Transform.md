---
title: Wavelet Transform
---
**Wavelet Transform** represents a signal with shifted and scaled wavelets. It gives high time resolution at high frequencies and broader windows at low frequencies.

## Mathematical description

A continuous wavelet coefficient is $W_x(a,b)=\frac{1}{\sqrt{|a|}}\int x(t)\psi^*((t-b)/a)dt$. Discrete wavelets use filter banks and decimation.

## C# example

```csharp
static (double[] Approximation, double[] Detail) HaarDwt(ReadOnlySpan<double> samples)
{
    var count = samples.Length / 2;
    var approximation = new double[count];
    var detail = new double[count];
    const double scale = 0.7071067811865476;

    for (var i = 0; i < count; i++)
    {
        approximation[i] = (samples[2 * i] + samples[2 * i + 1]) * scale;
        detail[i] = (samples[2 * i] - samples[2 * i + 1]) * scale;
    }

    return (approximation, detail);
}
```

## Related

- [[_Signal Processing]]
- [[Short-Time Fourier Transform]]
- [[Polyphase filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)