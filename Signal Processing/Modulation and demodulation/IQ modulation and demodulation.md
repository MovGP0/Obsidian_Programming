---
title: IQ Modulation and Demodulation
---
**IQ modulation and demodulation** represent a passband signal as in-phase and quadrature baseband components. This complex representation makes filtering, synchronization, and constellation processing practical.

## Mathematical description

The passband signal is $s(t)=I(t)\cos(\omega_c t)-Q(t)\sin(\omega_c t)$. Demodulation multiplies by cosine and negative sine, low-pass filters each branch, and forms $z(t)=I(t)+jQ(t)$.

## Code example

```csharp
static (double I, double Q) DemodulateIq(double passbandSample, double carrierPhase, ref double iLp, ref double qLp, double alpha)
{
    var mixedI = 2.0 * passbandSample * Math.Cos(carrierPhase);
    var mixedQ = -2.0 * passbandSample * Math.Sin(carrierPhase);
    iLp += alpha * (mixedI - iLp);
    qLp += alpha * (mixedQ - qLp);
    return (iLp, qLp);
}
```

## Related

- [[Quadrature mixing]]
- [[Digital downconversion]]
- [[OFDM FFT and IFFT]]

## Sources

- <https://en.wikipedia.org/wiki/In-phase_and_quadrature_components>
- <https://pysdr.org/content/sampling.html#quadrature-sampling>
- <https://ccrma.stanford.edu/~jos/>
- <https://www.dsprelated.com/freebooks/>
