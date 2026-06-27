---
title: Goertzel Algorithm
---
**Goertzel Algorithm** evaluates one DFT bin or a small set of bins with a second-order recurrence. It is efficient for tone detection such as DTMF or narrowband monitoring.

## Mathematical description

For target bin $k$, use $s[n]=x[n]+2\cos(2\pi k/N)s[n-1]-s[n-2]$. The final bin power is $s_1^2+s_2^2-2\cos(2\pi k/N)s_1s_2$.

## C# example

```csharp
public static double GoertzelPower(ReadOnlySpan<double> samples, int bin)
{
    var omega = 2.0 * Math.PI * bin / samples.Length;
    var coeff = 2.0 * Math.Cos(omega);
    var s1 = 0.0;
    var s2 = 0.0;

    foreach (var sample in samples)
    {
        var s0 = sample + coeff * s1 - s2;
        s2 = s1;
        s1 = s0;
    }

    return s1 * s1 + s2 * s2 - coeff * s1 * s2;
}
```

## Related

- [[_Signal Processing]]
- [[Discrete Fourier Transform]]
- [[Fast Fourier Transform]]

## Sources

- [NumPy Fourier transform reference](https://numpy.org/doc/stable/reference/routines.fft.html)
- [SciPy FFT tutorial](https://docs.scipy.org/doc/scipy/tutorial/fft.html)
