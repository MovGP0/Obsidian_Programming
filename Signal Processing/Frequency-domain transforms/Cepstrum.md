---
title: Cepstrum
---
**Cepstrum** analyzes periodic structure in a spectrum by transforming the logarithm of spectral magnitude. It is useful for pitch, echo spacing, and spectral envelope separation.

## Mathematical description

The real cepstrum is $c[n]=\mathcal{F}^{-1}\{\log |X[k]|\}$. Peaks in quefrency correspond to repeated structure in the original signal spectrum.

## C# example

```csharp
static double[] RealCepstrum(ReadOnlySpan<(double Real, double Imag)> spectrum)
{
    var logMagnitude = new (double Real, double Imag)[spectrum.Length];

    for (var k = 0; k < spectrum.Length; k++)
    {
        var magnitude = Math.Sqrt(spectrum[k].Real * spectrum[k].Real + spectrum[k].Imag * spectrum[k].Imag);
        logMagnitude[k] = (Math.Log(Math.Max(magnitude, 1.0e-12)), 0.0);
    }

    InverseFftViaConjugate(logMagnitude);
    return logMagnitude.Select(bin => bin.Real).ToArray();
}
```

## Related

- [[_Signal Processing]]
- [[Discrete Fourier Transform]]
- [[Short-Time Fourier Transform]]

## Sources

- [NumPy Fourier transform reference](https://numpy.org/doc/stable/reference/routines.fft.html)
- [SciPy FFT tutorial](https://docs.scipy.org/doc/scipy/tutorial/fft.html)
