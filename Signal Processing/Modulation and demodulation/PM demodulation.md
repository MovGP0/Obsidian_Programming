---
title: PM Demodulation
---
**PM demodulation** recovers a message represented directly as carrier phase variation. It is closely related to FM demodulation because frequency is the derivative of phase.

## Mathematical description

A phase-modulated carrier has $s(t)=A_c\cos(\omega_c t+k_p m(t))$. After mixing to complex baseband, the phase detector estimates $y[n]=\operatorname{unwrap}(\arg z[n])$, then removes carrier and phase offsets.

## Code example

```csharp
static double PhaseDemodulate((double I, double Q) sample, double carrierPhase, double sensitivity)
{
    var phase = Math.Atan2(sample.Q, sample.I);
    return (phase - carrierPhase) / sensitivity;
}
```

## Related

- [[FM demodulation]]
- [[IQ modulation and demodulation]]
- [[Costas loop]]

## Sources

- <https://en.wikipedia.org/wiki/Phase_modulation>
- <https://en.wikipedia.org/wiki/Phase_detector>
- <https://ccrma.stanford.edu/~jos/>
- <https://www.dsprelated.com/freebooks/>
