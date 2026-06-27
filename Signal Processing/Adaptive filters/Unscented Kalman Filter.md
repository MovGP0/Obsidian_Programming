---
title: Unscented Kalman Filter (UKF)
---
**Unscented Kalman Filter** (**UKF**) estimates nonlinear systems without explicitly computing Jacobians. Instead of linearizing the model with derivatives, it sends carefully chosen sample points through the nonlinear function and recombines the results.

Those sample points are called sigma points. They are chosen so that their mean and covariance match the current estimate. After passing through the nonlinear process or measurement model, they approximate how the distribution changes.

The UKF is often easier to implement than an [[Extended Kalman Filter]] when derivatives are hard to derive or error-prone.

## Mathematical description

For a state estimate $\hat{\mathbf{x}}$ with covariance $\mathbf{P}$, the UKF constructs sigma points $\chi_i$ around the estimate. Each sigma point is propagated through the nonlinear model:

$$
\chi_i^- = f(\chi_i).
$$

The predicted mean is the weighted sum

$$
\hat{\mathbf{x}}^- = \sum_i W_i^{(m)}\chi_i^-.
$$

The predicted covariance is

$$
\mathbf{P}^- = \sum_i W_i^{(c)}(\chi_i^- - \hat{\mathbf{x}}^-)(\chi_i^- - \hat{\mathbf{x}}^-)^T + \mathbf{Q}.
$$

The measurement update repeats the same idea through $h(\mathbf{x})$, then computes a Kalman-style gain from predicted measurement covariance and state-measurement cross covariance.

## C# example

This helper shows the UKF's central operation: propagate sigma points through a nonlinear model and recombine them into a mean.

```csharp
static double PropagateScalarSigmaPointMean(
    ReadOnlySpan<double> sigmaPoints,
    ReadOnlySpan<double> meanWeights,
    Func<double, double> nonlinearModel)
{
    var predictedMean = 0.0;

    for (var point = 0; point < sigmaPoints.Length; point++)
    {
        var propagatedPoint = nonlinearModel(sigmaPoints[point]);
        predictedMean += meanWeights[point] * propagatedPoint;
    }

    return predictedMean;
}
```

A full UKF also computes covariance from the propagated points and performs a measurement correction. This snippet isolates the part that distinguishes UKF from EKF: it samples the nonlinear function instead of differentiating it.

## Practical notes

The UKF is useful when the nonlinear functions are easy to evaluate but hard to differentiate. This often happens in sensor-fusion code, where a simulator or measurement model is available but deriving and maintaining Jacobians would be error-prone.

The sigma-point spread parameters control how far the filter samples around the current estimate. If the spread is too small, the UKF behaves almost like a local linear filter. If it is too large, it may sample unrealistic regions of the state space.

## Common mistakes

The UKF avoids Jacobians, but it does not avoid modeling. The process model, measurement model, and noise covariances still determine the result. Bad models produce confident but wrong estimates.

It is also easy to confuse sigma points with random particles. Sigma points are deterministic quadrature points chosen from the mean and covariance; they are not a Monte Carlo cloud.

Interpret the predicted mean as the center of the transformed sigma-point cloud. If the transformed points spread asymmetrically, the covariance update is often more informative than the mean alone.

## Related

- [[Kalman Filter]]
- [[Extended Kalman Filter]]
- [[Particle Filter]]
- [[Sensor Extended Kalman filter]]

## Sources

- [KalmanFilter.net](https://www.kalmanfilter.net/)
- [Kalman filter one-dimensional example](https://www.kalmanfilter.net/kalman1d.html)
