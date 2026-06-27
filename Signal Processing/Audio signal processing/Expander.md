---
title: Expander
---
An **expander** increases dynamic range by reducing gain below a threshold or increasing contrast between low and high levels. It is the inverse idea of compression.

## Mathematical description

Below threshold $T$, a downward expander can use $L_{out}=T+R(L_{in}-T)$ with $R>1$, making low-level material even lower.

## Code example

```csharp
public static double[] Expand(double[] input, double coefficient)
{
    var output = new double[input.Length];
    for (var i = 0; i < input.Length; i++)
    {
        var level = Math.Abs(input[i]);
        var gain = level < coefficient ? level / Math.Max(coefficient, 1e-9) : 1.0;
        output[i] = input[i] * gain;
    }
    return output;
}
```

## Related

- [[Dynamic range compressor]]
- [[Noise gate]]
- [[Limiter]]

## Sources

- <https://en.wikipedia.org/wiki/Dynamic_range_compression#Expansion>
- <https://en.wikipedia.org/wiki/Noise_gate>
