---
title: Communications Equalizer
---
A **communications equalizer** compensates channel distortion so that received symbols better match the transmitted constellation. Equalizers can be linear, adaptive, or decision-directed.

## Mathematical description

For channel $h[n]$ and equalizer $w[n]$, the target is often $(h*w)[n]\approx\delta[n-d]$. Adaptive equalizers minimize $E\{|a_k-\hat{a}_k|^2\}$ or a related error criterion.

## Code example

```csharp
public static double[] LinearEqualize(double[] input, double coefficient)
{
    var output = new double[input.Length];
    for (var n = 1; n + 1 < input.Length; n++)
    {
        output[n] = (coefficient * input[n - 1]) + input[n] + (coefficient * input[n + 1]);
    }
    return output;
}
```

## Related

- [[Zero-forcing equalizer]]
- [[MMSE equalizer]]
- [[Decision feedback equalizer]]

## Sources

- <https://en.wikipedia.org/wiki/Equalization_(communications%29)>
- <https://en.wikipedia.org/wiki/Adaptive_equalizer>
- <https://ccrma.stanford.edu/~jos/>
- <https://www.dsprelated.com/freebooks/>
