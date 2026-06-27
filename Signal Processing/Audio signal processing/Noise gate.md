---
title: Noise Gate
---
A **noise gate** attenuates or mutes audio below a threshold. It is useful for reducing bleed, hum, and room noise during pauses.

## Mathematical description

A hard gate applies $y[n]=x[n]$ when $|x[n]| \ge T$ and $y[n]=0$ otherwise. Attack, hold, and release stages avoid chattering around the threshold.

## Code example

```csharp
public static double[] Gate(double[] input, double coefficient)
{
    var output = new double[input.Length];
    for (var i = 0; i < input.Length; i++)
    {
        output[i] = Math.Abs(input[i]) >= coefficient ? input[i] : 0.0;
    }
    return output;
}
```

## Related

- [[Expander]]
- [[Dynamic range compressor]]
- [[Limiter]]

## Sources

- <https://en.wikipedia.org/wiki/Noise_gate>
- <https://en.wikipedia.org/wiki/Dynamic_range_compression>
