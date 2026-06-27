---
title: Kalman Filter
---
**Kalman Filter** recursively estimates the state of a linear dynamic system from noisy measurements. It is a prediction-correction algorithm: first predict what the state should be, then correct that prediction using the newest measurement.

The key idea is uncertainty-aware averaging. If the prediction is more reliable than the measurement, the correction is small. If the measurement is more reliable, the correction is larger. The filter tracks both the state estimate and its uncertainty.

## Mathematical description

The linear system model is

$$
\mathbf{x}_k = \mathbf{F}\mathbf{x}_{k-1} + \mathbf{B}\mathbf{u}_k + \mathbf{w}_k,
$$

$$
\mathbf{z}_k = \mathbf{H}\mathbf{x}_k + \mathbf{v}_k.
$$

Here $\mathbf{x}_k$ is the hidden state, $\mathbf{z}_k$ is the measurement, $\mathbf{F}$ is the state-transition matrix, $\mathbf{H}$ maps state to measurement, $\mathbf{Q}$ is process-noise covariance, and $\mathbf{R}$ is measurement-noise covariance.

Prediction:

$$
\hat{\mathbf{x}}_{k|k-1} = \mathbf{F}\hat{\mathbf{x}}_{k-1|k-1},
$$

$$
\mathbf{P}_{k|k-1} = \mathbf{F}\mathbf{P}_{k-1|k-1}\mathbf{F}^T + \mathbf{Q}.
$$

Correction:

$$
\mathbf{K}_k = \mathbf{P}_{k|k-1}\mathbf{H}^T(\mathbf{H}\mathbf{P}_{k|k-1}\mathbf{H}^T + \mathbf{R})^{-1},
$$

$$
\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_k(\mathbf{z}_k - \mathbf{H}\hat{\mathbf{x}}_{k|k-1}).
$$

The term in parentheses is the innovation: the measurement surprise after predicting what the sensor should have seen.

## C# example

This scalar random-walk filter estimates one value, such as a slowly changing sensor bias. `StateEstimate` is $\hat{x}$ and `EstimateVariance` is $P$.

```csharp
public sealed class ScalarKalmanFilter
{
    public double StateEstimate { get; private set; }
    public double EstimateVariance { get; private set; } = 1.0;

    public double Update(double measurement, double processNoiseVariance, double measurementNoiseVariance)
    {
        EstimateVariance += processNoiseVariance;

        var innovation = measurement - StateEstimate;
        var innovationVariance = EstimateVariance + measurementNoiseVariance;
        var kalmanGain = EstimateVariance / innovationVariance;

        StateEstimate += kalmanGain * innovation;
        EstimateVariance *= 1.0 - kalmanGain;

        return StateEstimate;
    }
}
```

This is the one-dimensional special case where $\mathbf{F}=1$ and $\mathbf{H}=1$. The same predict-correct structure extends to vectors and matrices.

## Practical notes

The hardest part of using a Kalman filter is usually choosing the noise variances. Increasing process noise tells the filter that the system can change quickly, so it follows measurements more readily. Increasing measurement noise tells the filter that the sensor is less trustworthy, so it relies more on the model prediction.

The filter can look mathematically complex, but every update answers two concrete questions: what did the model predict, and how surprising was the measurement? The Kalman gain converts that surprise into a correction with the right scale.

## Common mistakes

Do not treat the Kalman filter as a smoothing formula with arbitrary gains. The gain comes from covariance propagation. If covariance is not updated consistently, the reported uncertainty stops meaning anything.

Another common mistake is using a linear Kalman filter for a strongly nonlinear sensor model. In that case, use an [[Extended Kalman Filter]], [[Unscented Kalman Filter]], or [[Particle Filter]] instead.

## Related

- [[Extended Kalman Filter]]
- [[Unscented Kalman Filter]]
- [[Particle Filter]]
- [[Sensor Kalman filter]]

## Sources

- [KalmanFilter.net](https://www.kalmanfilter.net/)
- [Kalman filter one-dimensional example](https://www.kalmanfilter.net/kalman1d.html)
