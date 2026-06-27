---
title: Limiter
---
A **limiter** is a high-ratio compressor used to keep peaks below a ceiling. Audio limiters are often the final dynamics stage before output or encoding.

## Mathematical description

The simplest hard limiter is $y[n]=\min(C,\max(-C,x[n]))$. Practical limiters use lookahead and smoothed gain to reduce distortion.

## Code example

```csharp
public static double[] Limit(double[] input, double coefficient)
{
    var output = new double[input.Length];
    for (var i = 0; i < input.Length; i++)
    {
        output[i] = Math.Clamp(input[i], -coefficient, coefficient);
    }
    return output;
}
```

## Related

- [[Dynamic range compressor]]
- [[Noise gate]]
- [[Expander]]

## Sources

- <https://en.wikipedia.org/wiki/Limiter>
- <https://en.wikipedia.org/wiki/Dynamic_range_compression>
