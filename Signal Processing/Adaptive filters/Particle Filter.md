---
title: Particle Filter
---
**Particle Filter** estimates a state distribution with many simulated samples called particles. It is useful when the system is nonlinear, non-Gaussian, multimodal, or otherwise poorly represented by the single mean and covariance used by Kalman-style filters.

Each particle is one possible state. The filter predicts particles forward, scores them against the measurement, normalizes their weights, and resamples so likely particles survive. This makes particle filters flexible, but they can require many particles to work well.

## Mathematical description

Particle filters approximate the posterior distribution by a weighted set:

$$
p(\mathbf{x}_k|\mathbf{z}_{1:k}) \approx \sum_{i=1}^{N} w_k^{(i)} \delta(\mathbf{x}_k - \mathbf{x}_k^{(i)}).
$$

The usual sequential importance resampling loop is:

1. Predict each particle with the process model:
   $$
   \mathbf{x}_k^{(i)} \sim p(\mathbf{x}_k|\mathbf{x}_{k-1}^{(i)}).
   $$
2. Weight each particle by measurement likelihood:
   $$
   w_k^{(i)} \propto p(\mathbf{z}_k|\mathbf{x}_k^{(i)}).
   $$
3. Normalize the weights so they sum to $1$.
4. Resample particles according to their weights.

## C# example

This example shows likelihood weighting and normalization for one measurement. The `measurementLikelihood` function encodes the sensor model.

```csharp
public readonly record struct Particle(double State, double Weight);

static void WeightParticles(
    Span<Particle> particles,
    double measurement,
    Func<double, double, double> measurementLikelihood)
{
    var totalWeight = 0.0;

    for (var i = 0; i < particles.Length; i++)
    {
        var likelihood = measurementLikelihood(measurement, particles[i].State);
        particles[i] = particles[i] with { Weight = particles[i].Weight * likelihood };
        totalWeight += particles[i].Weight;
    }

    for (var i = 0; i < particles.Length; i++)
    {
        particles[i] = particles[i] with
        {
            Weight = particles[i].Weight / Math.Max(totalWeight, 1.0e-12)
        };
    }
}
```

The next step would be resampling: draw a new particle set where high-weight particles appear more often and low-weight particles disappear.

## Practical notes

Particle filters are powerful because they can represent several competing hypotheses at once. For example, a tracking system can keep particles around multiple possible target positions until later measurements disambiguate them.

The main failure mode is particle degeneracy: after repeated weighting, almost all particles have near-zero weight. Resampling fixes the weights but can reduce diversity, so practical particle filters often add process noise, roughening, or smarter proposal distributions.

## Common mistakes

Do not use too few particles for a high-dimensional state. The required number of particles often grows quickly with dimension, which is why particle filters are popular for low-dimensional tracking but harder for large state vectors.

Another mistake is resampling at every step without checking degeneracy. Resampling too often can discard useful diversity; many implementations resample only when effective sample size falls below a threshold.

Interpret the result as a distribution, not only a single best state. The weighted particle cloud can express uncertainty, ambiguity, and multiple plausible states before a final estimate is chosen.

## Related

- [[Kalman Filter]]
- [[Extended Kalman Filter]]
- [[Unscented Kalman Filter]]
- [[Particle tracking]]

## Sources

- [KalmanFilter.net](https://www.kalmanfilter.net/)
- [Kalman filter one-dimensional example](https://www.kalmanfilter.net/kalman1d.html)
