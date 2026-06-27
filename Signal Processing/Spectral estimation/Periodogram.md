---
title: Periodogram
---
**Periodogram** estimates a signal's power spectral density by taking the squared magnitude of its discrete Fourier transform.

For samples $x[n]$, $0 \le n < N$, sampled at $f_s$, the periodogram at DFT bin $k$ is commonly written as

$$
\hat{S}_{xx}[k] = \frac{1}{N f_s}\left|\sum_{n=0}^{N-1} x[n] e^{-j 2\pi kn/N}\right|^2.
$$

Windowing replaces $x[n]$ with $w[n]x[n]$ and changes the normalization. The estimate is simple and high resolution, but its variance does not vanish as $N$ grows.

```csharp
static double[] Periodogram(double[] samples)
{
    int n = samples.Length;
    var psd = new double[n / 2 + 1];

    for (int k = 0; k < psd.Length; k++)
    {
        double real = 0;
        double imag = 0;

        for (int i = 0; i < n; i++)
        {
            double phase = -2.0 * Math.PI * k * i / n;
            real += samples[i] * Math.Cos(phase);
            imag += samples[i] * Math.Sin(phase);
        }

        psd[k] = (real * real + imag * imag) / n;
    }

    return psd;
}
```

## Related

- [[Welch method]]
- [[Bartlett method]]
- [[Multitaper method]]
- [[_Signal Processing]]

## Sources

- [SciPy periodogram documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.periodogram.html)
- [Wikipedia: Periodogram](https://en.wikipedia.org/wiki/Periodogram)

