---
title: Farrow Structure
---
**Farrow structure** implements variable fractional-delay filtering by evaluating polynomial filter branches.

For fractional delay $\mu$, the output is

$$
y[n] = \sum_{p=0}^{P}\mu^p\sum_k c_p[k]x[n-k].
$$

The coefficients $c_p[k]$ are fixed, while $\mu$ changes at run time. This is useful for timing recovery and asynchronous sample-rate conversion.

```csharp
static double FarrowSample(double mu, double[][] branches, double[] delayLine)
{
    double y = 0;

    for (int p = branches.Length - 1; p >= 0; p--)
    {
        double branch = 0;
        for (int k = 0; k < delayLine.Length; k++)
        {
            branch += branches[p][k] * delayLine[k];
        }

        y = y * mu + branch;
    }

    return y;
}
```

## Related

- [[Fractional delay filter]]
- [[Sample-rate conversion]]
- [[Interpolation]]
- [[_Signal Processing]]

## Sources

- [AMD: Fractional Delay Farrow Filter](https://docs.amd.com/r/2024.1-English/Vitis-Tutorials-AI-Engine-Development/Fractional-Delay-Farrow-Filter)
- [DSPRelated: Fractional delay filters](https://www.dsprelated.com/freebooks/pasp/Fractional_Delay_Filtering_Linear.html)

