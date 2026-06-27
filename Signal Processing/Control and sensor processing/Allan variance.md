---
title: Allan variance
---
**Allan variance** is a signal-processing method used in control and sensor processing for this role: Noise/stability characterization. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Allan variance groups samples into averaging time $\tau$ and computes $\sigma_y^2(\tau)=\frac{1}{2}\langle(\bar{y}_{i+1}-\bar{y}_i)^2\rangle$ to separate noise processes.

## Code Example
```csharp
static double AllanVariance(ReadOnlySpan<double> samples, int clusterSize)
{
    var clusterCount = samples.Length / clusterSize;
    var sum = 0.0;

    for (var cluster = 0; cluster < clusterCount - 1; cluster++)
    {
        var meanA = samples.Slice(cluster * clusterSize, clusterSize).ToArray().Average();
        var meanB = samples.Slice((cluster + 1) * clusterSize, clusterSize).ToArray().Average();
        sum += Math.Pow(meanB - meanA, 2.0);
    }

    return 0.5 * sum / Math.Max(clusterCount - 1, 1);
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Low-pass filtering]]
- [[Complementary filter]]
- [[Sensor Kalman filter]]
- [[Dead reckoning]]

## Sources
- [Wikipedia: Allan variance](https://en.wikipedia.org/wiki/Allan_variance)
- [VectorNav: Inertial navigation primer](https://www.vectornav.com/resources/inertial-navigation-primer)
- [AHRS documentation](https://ahrs.readthedocs.io/en/latest/)
