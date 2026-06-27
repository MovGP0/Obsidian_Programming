---
title: Hilbert Transform
---
**Hilbert Transform** phase-shifts positive and negative frequency components to build an analytic signal. It supports envelope and instantaneous phase estimation.

## Mathematical description

The continuous Hilbert transform is $\hat{x}(t)=\frac{1}{\pi}\operatorname{p.v.}\int_{-\infty}^{\infty}\frac{x(\tau)}{t-\tau}d\tau$. The analytic signal is $z(t)=x(t)+j\hat{x}(t)$.

## C# example

```csharp
static void KeepAnalyticSignalBins(Span<(double Real, double Imag)> fftBins)
{
    var n = fftBins.Length;

    for (var k = 1; k < n; k++)
    {
        if (k < n / 2)
        {
            fftBins[k] = (2.0 * fftBins[k].Real, 2.0 * fftBins[k].Imag);
        }
        else if (k > n / 2)
        {
            fftBins[k] = (0.0, 0.0);
        }
    }
}
```

## Related

- [[_Signal Processing]]
- [[Envelope Follower]]
- [[Discrete Fourier Transform]]

## Sources

- [NumPy Fourier transform reference](https://numpy.org/doc/stable/reference/routines.fft.html)
- [SciPy FFT tutorial](https://docs.scipy.org/doc/scipy/tutorial/fft.html)