---
title: AM Demodulation
---
**AM demodulation** recovers a baseband message from an amplitude-modulated carrier by estimating the signal envelope or by coherently mixing with a synchronized carrier.

## Mathematical description

For a carrier $s(t)=A_c(1+k_a m(t))\cos(\omega_c t)$, envelope detection estimates $|A_c(1+k_a m(t))|$ and removes the DC carrier term. Coherent detection multiplies by $2\cos(\omega_c t)$ and low-pass filters: $\operatorname{LPF}\{2s(t)\cos(\omega_c t)\}=A_c(1+k_a m(t))$.

## Code example

```csharp
static double CoherentAmDemodulate(double rfSample, double carrierPhase, ref double envelope, double alpha)
{
    var baseband = 2.0 * rfSample * Math.Cos(carrierPhase);
    envelope += alpha * (baseband - envelope);
    return envelope;
}
```

## Related

- [[FM demodulation]]
- [[IQ modulation and demodulation]]
- [[Quadrature mixing]]

## Sources

- <https://en.wikipedia.org/wiki/Amplitude_modulation>
- <https://en.wikipedia.org/wiki/Envelope_detector>
- <https://ccrma.stanford.edu/~jos/>
- <https://www.dsprelated.com/freebooks/>
