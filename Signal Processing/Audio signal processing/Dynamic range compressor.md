---
title: Dynamic Range Compressor
---
A **dynamic range compressor** reduces gain when a signal exceeds a threshold. It makes quiet and loud sections sit closer together without hard clipping.

## Mathematical description

For level $L$ in dB, threshold $T$, and ratio $R$, the static curve above threshold is $G=L-(T+(L-T)/R)$. Attack and release filters smooth the gain envelope.

## Code example

```csharp
public static double[] Compress(double[] input, double coefficient)
{
    var output = new double[input.Length];
    for (var i = 0; i < input.Length; i++)
    {
        var level = Math.Abs(input[i]);
        var gain = level <= coefficient ? 1.0 : coefficient + (level - coefficient) / 4.0;
        output[i] = input[i] * gain / Math.Max(level, 1e-9);
    }
    return output;
}
```

## Related

- [[Limiter]]
- [[Expander]]
- [[Noise gate]]

## Sources

- <https://en.wikipedia.org/wiki/Dynamic_range_compression>
- <https://www.dsprelated.com/freebooks/filters/Dynamic_Range_Compression.html>
