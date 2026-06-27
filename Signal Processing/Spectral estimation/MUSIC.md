---
title: Multiple Signal Classification (MUSIC)
---
**Multiple Signal Classification** (**MUSIC**) is a high-resolution estimator for sinusoidal frequencies or directions of arrival.

MUSIC forms a covariance matrix $R$, splits its eigenvectors into signal and noise subspaces, and scans steering vectors $a(\omega)$. The pseudospectrum is

$$
P_\text{MUSIC}(\omega) = \frac{1}{a^H(\omega)E_nE_n^Ha(\omega)}.
$$

Peaks occur where the steering vector is nearly orthogonal to the noise subspace. MUSIC needs a model order and works best with separated narrowband components.

```csharp
static double MusicScore(double[] steering, double[][] noiseVectors)
{
    double projection = 0;

    foreach (var vector in noiseVectors)
    {
        double dot = 0;
        for (int i = 0; i < steering.Length; i++)
        {
            dot += steering[i] * vector[i];
        }

        projection += dot * dot;
    }

    return 1.0 / Math.Max(projection, 1e-12);
}
```

## Related

- [[ESPRIT]]
- [[AR spectral estimation]]
- [[Prony method]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: MUSIC](https://en.wikipedia.org/wiki/MUSIC_%28algorithm%29)
- [Wikipedia: Direction finding](https://en.wikipedia.org/wiki/Direction_finding)

