---
title: Matched Filter
---
**Matched Filter** maximizes signal-to-noise ratio for detecting a known waveform in additive white noise. It is used in radar, sonar, and digital communications.

## Mathematical description

For known signal $s[n]$, the matched filter impulse response is $h[n]=s^*[N-1-n]$. The output is a correlation peak when the received signal aligns with the template.

## C# example

```csharp
static double MatchedFilterScore(ReadOnlySpan<double> samples, ReadOnlySpan<double> template)
{
    var score = 0.0;

    for (var i = 0; i < template.Length; i++)
    {
        score += samples[i] * template[template.Length - 1 - i];
    }

    return score;
}
```

## Related

- [[_Signal Processing]]
- [[Finite Impulse Response Filter]]
- [[Wiener Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)
