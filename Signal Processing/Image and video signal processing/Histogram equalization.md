---
title: Histogram equalization
---
**Histogram equalization** is a signal-processing method used in image and video signal processing for this role: Contrast enhancement. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Histogram equalization remaps intensities through the cumulative distribution function. For an $L$-level image, $s_k=\lfloor(L-1)\sum_{j=0}^{k}p(r_j)
floor$, spreading frequent intensity ranges across more output levels.

## Code Example
```csharp
static byte EqualizePixel(byte value, ReadOnlySpan<int> cdf, int cdfMin, int pixelCount)
{
    var normalized = (cdf[value] - cdfMin) / (double)Math.Max(pixelCount - cdfMin, 1);
    return (byte)Math.Clamp((int)Math.Round(255.0 * normalized), 0, 255);
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Canny edge detector]]

## Sources
- [Wikipedia: Histogram equalization](https://en.wikipedia.org/wiki/Histogram_equalization)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
