---
title: Delay and Echo
---
**Delay and echo** effects mix a signal with one or more delayed copies. Short delays create coloration; longer delays are perceived as distinct repeats.

## Mathematical description

A feedforward delay is $y[n]=x[n]+g x[n-D]$. A feedback echo is $y[n]=x[n]+g y[n-D]$, producing repeated decays when $|g|<1$.

## Code example

```csharp
public static double[] Echo(double[] input, double coefficient)
{
    var output = new double[input.Length];
    var delay = Math.Max(1, (int)coefficient);
    for (var i = 0; i < input.Length; i++)
    {
        output[i] = input[i] + (i >= delay ? 0.4 * output[i - delay] : 0.0);
    }
    return output;
}
```

## Related

- [[Reverb]]
- [[Chorus]]
- [[Flanger]]

## Sources

- <https://en.wikipedia.org/wiki/Delay_(audio_effect%29)>
- <https://www.dsprelated.com/freebooks/pasp/Delay_Lines.html>
