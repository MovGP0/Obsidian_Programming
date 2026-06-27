---
title: FM Demodulation
---
**FM demodulation** extracts the message encoded as instantaneous frequency deviation. It is common in radio receivers and complex-baseband software-defined radio pipelines.

## Mathematical description

An FM signal can be written $x(t)=A\cos(\omega_c t+k_f\int m(\tau)d\tau)$. In complex baseband, the demodulated value is proportional to the phase difference $y[n]=\arg(x[n]x^*[n-1])$, which estimates instantaneous angular frequency.

## Code example

```csharp
static double FmDiscriminator((double I, double Q) current, (double I, double Q) previous)
{
    var cross = previous.I * current.Q - previous.Q * current.I;
    var dot = previous.I * current.I + previous.Q * current.Q;
    return Math.Atan2(cross, dot);
}
```

## Related

- [[AM demodulation]]
- [[PM demodulation]]
- [[PLL]]

## Sources

- <https://en.wikipedia.org/wiki/Frequency_modulation>
- <https://en.wikipedia.org/wiki/Frequency_modulation#Demodulation>
- <https://ccrma.stanford.edu/~jos/>
- <https://www.dsprelated.com/freebooks/>
