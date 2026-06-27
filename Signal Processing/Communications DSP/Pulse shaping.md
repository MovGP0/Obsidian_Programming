---
title: Pulse Shaping
---
**Pulse shaping** maps symbols to a smooth transmit waveform with controlled bandwidth and intersymbol interference. It is normally paired with a matched receive filter.

## Mathematical description

The transmitted waveform is $x(t)=\sum_k a_k p(t-kT)$, where $a_k$ are symbols and $p(t)$ is the pulse. Nyquist pulses satisfy $p(nT)=0$ for nonzero integer $n$.

## Code example

```csharp
static double PulseShapeSample(ReadOnlySpan<double> symbols, ReadOnlySpan<double> pulse, int samplesPerSymbol, int outputIndex)
{
    var sum = 0.0;

    for (var symbol = 0; symbol < symbols.Length; symbol++)
    {
        var tap = outputIndex - symbol * samplesPerSymbol;
        if ((uint)tap < pulse.Length)
        {
            sum += symbols[symbol] * pulse[tap];
        }
    }

    return sum;
}
```

## Related

- [[Raised-cosine filter]]
- [[Root-raised-cosine filter]]
- [[Gardner timing recovery]]

## Sources

- <https://en.wikipedia.org/wiki/Pulse_shaping>
- <https://en.wikipedia.org/wiki/Nyquist_ISI_criterion>
- <https://ccrma.stanford.edu/~jos/>
- <https://www.dsprelated.com/freebooks/>
