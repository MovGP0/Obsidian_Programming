---
title: Non-local means
---
**Non-local means** is a signal-processing method used in image and video signal processing for this role: Denoising. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Non-local means denoises a pixel by averaging many pixels whose surrounding patches are similar, not only spatially close. A common weight is $w(p,q)=\exp(-||P_p-P_q||^2/h^2)$, normalized over the search window.

## Code Example
```csharp
static double NonLocalMeansEstimate(ReadOnlySpan<double> candidatePixels, ReadOnlySpan<double> patchDistances, double h)
{
    var sum = 0.0;
    var weightSum = 0.0;

    for (var i = 0; i < candidatePixels.Length; i++)
    {
        var weight = Math.Exp(-patchDistances[i] / (h * h));
        sum += weight * candidatePixels[i];
        weightSum += weight;
    }

    return sum / weightSum;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Canny edge detector]]

## Sources
- [Wikipedia: Non-local means](https://en.wikipedia.org/wiki/Non-local_means)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
