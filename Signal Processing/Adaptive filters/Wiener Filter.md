---
title: Wiener Filter
---
**Wiener Filter** estimates a desired signal from a noisy observation by minimizing mean squared error. Unlike LMS or RLS, the classical Wiener filter is usually described as the optimal fixed filter for known signal and noise statistics.

The filter appears in noise reduction, image restoration, deconvolution, and speech enhancement. It answers the question: given what we know about the signal spectrum and the noise spectrum, how much should each component of the observation be trusted?

## Mathematical description

In the frequency domain, a common scalar Wiener gain is

$$
G(f) = \frac{S_{xx}(f)}{S_{xx}(f) + S_{vv}(f)},
$$

where $S_{xx}(f)$ is the desired-signal power spectral density and $S_{vv}(f)$ is the noise power spectral density. The estimate is

$$
\hat{X}(f) = G(f)Y(f),
$$

where $Y(f)$ is the noisy observation spectrum.

For FIR filtering, the Wiener-Hopf equation is

$$
\mathbf{R}_{xx}\mathbf{w} = \mathbf{p}_{xd},
$$

where $\mathbf{R}_{xx}$ is the input autocorrelation matrix and $\mathbf{p}_{xd}$ is the cross-correlation vector between the input and the desired signal.

## C# example

This example computes a per-frequency-bin Wiener gain. A gain near `1` keeps the observed bin; a gain near `0` suppresses it.

```csharp
static double WienerGain(double estimatedSignalPower, double estimatedNoisePower)
{
    var totalPower = estimatedSignalPower + estimatedNoisePower;

    if (totalPower <= 0.0)
    {
        return 0.0;
    }

    return estimatedSignalPower / totalPower;
}

static double ApplyWienerGain(double noisyCoefficient, double estimatedSignalPower, double estimatedNoisePower)
{
    return WienerGain(estimatedSignalPower, estimatedNoisePower) * noisyCoefficient;
}
```

In a complete spectral noise reducer, the power estimates are updated for every FFT bin and the processed spectrum is transformed back to the time domain.

## Practical notes

The Wiener filter is only as good as the signal and noise power estimates. In speech enhancement, the noise spectrum is often estimated during non-speech intervals. In imaging, the noise-to-signal ratio may be estimated from calibration data or from flat regions of the image.

Unlike LMS and RLS, a Wiener filter does not automatically learn from an error signal in the basic formulation. It is an optimal filter for assumed statistics. If those assumptions are wrong or change over time, the power estimates must be updated or the filter will sound or look over-smoothed.

## Common mistakes

A Wiener gain is not a magic denoiser. If the noise estimate includes speech or image detail, the filter will suppress the desired signal too. If the noise estimate is too low, residual noise remains.

The filter also assumes a mean-square-error objective. That may not match perceptual quality, so audio and image systems often combine Wiener-style gains with floors, smoothing, or perceptual constraints.

Interpret the output as an estimate, not a recovered original. Frequencies with uncertain signal power are attenuated because the filter prefers a lower mean-square error over preserving every detail.

## Related

- [[Wiener speech enhancement]]
- [[Wiener deconvolution]]
- [[Least Mean Squares]]
- [[Recursive Least Squares]]

## Sources

- [Adaptive filter overview](https://en.wikipedia.org/wiki/Adaptive_filter)
- [Pyroomacoustics adaptive filtering documentation](https://pyroomacoustics.readthedocs.io/en/pypi-release/pyroomacoustics.adaptive.html)
