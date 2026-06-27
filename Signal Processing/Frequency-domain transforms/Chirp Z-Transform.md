---
title: Chirp Z-Transform
---
**Chirp Z-Transform** evaluates the z-transform along a spiral or arc instead of only the DFT unit-circle grid. It is useful for spectral zooming around a narrow band.

## Mathematical description

The CZT samples $X(z_k)$ at $z_k = A W^{-k}$, giving $X[k]=\sum_{n=0}^{N-1}x[n]A^{-n}W^{nk}$. Bluestein-style implementations reduce it to convolution.

## C# example

```csharp
static (double Real, double Imag) ChirpZBin(
    ReadOnlySpan<double> samples,
    int k,
    double aAngle,
    double wAngle)
{
    var real = 0.0;
    var imag = 0.0;

    for (var n = 0; n < samples.Length; n++)
    {
        var angle = -aAngle * n + wAngle * n * k;
        real += samples[n] * Math.Cos(angle);
        imag += samples[n] * Math.Sin(angle);
    }

    return (real, imag);
}
```

## Related

- [[_Signal Processing]]
- [[Discrete Fourier Transform]]
- [[Goertzel Algorithm]]

## Sources

- [SciPy CZT reference](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.CZT.html)