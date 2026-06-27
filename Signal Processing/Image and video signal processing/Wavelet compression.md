---
title: Wavelet compression
---
**Wavelet compression** is a signal-processing method used in image and video signal processing for this role: Multi-resolution compression. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Wavelet compression transforms image samples into approximation and detail coefficients, quantizes small detail coefficients, and entropy-codes the result. A one-level Haar transform forms averages $a_i=(x_{2i}+x_{2i+1})/\sqrt2$ and details $d_i=(x_{2i}-x_{2i+1})/\sqrt2$.

## Code Example
```csharp
static void ThresholdHaarDetails(Span<double> details, double threshold)
{
    for (var i = 0; i < details.Length; i++)
    {
        if (Math.Abs(details[i]) < threshold)
        {
            details[i] = 0.0;
        }
    }
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Canny edge detector]]

## Sources
- [Wikipedia: Wavelet compression](https://en.wikipedia.org/wiki/Wavelet_transform)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
