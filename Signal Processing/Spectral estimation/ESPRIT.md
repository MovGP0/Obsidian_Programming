---
title: Estimation of Signal Parameters via Rotational Invariance Techniques (ESPRIT)
---
**Estimation of Signal Parameters via Rotational Invariance Techniques** (**ESPRIT**) estimates sinusoidal frequencies or directions from shift-invariant sensor or sample subspaces.

After estimating the signal subspace $S$, ESPRIT partitions it into shifted views $S_1$ and $S_2$ and solves

$$
S_2 \approx S_1\Phi.
$$

The eigenvalues of $\Phi$ encode phase shifts; for temporal sinusoids, $\omega_i = \arg(\lambda_i)$. ESPRIT avoids the search grid used by [[MUSIC]].

```csharp
static double EspritFrequencyFromEigenvalue(double real, double imaginary, double sampleRate)
{
    var phase = Math.Atan2(imaginary, real);
    return phase * sampleRate / (2.0 * Math.PI);
}
```

## Related

- [[MUSIC]]
- [[Prony method]]
- [[AR spectral estimation]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: ESPRIT](https://en.wikipedia.org/wiki/Estimation_of_signal_parameters_via_rotational_invariance_techniques)
- [Wikipedia: Direction finding](https://en.wikipedia.org/wiki/Direction_finding)

