---
title: Gaussian blur
---
**Gaussian blur** is a signal-processing method used in image and video signal processing for this role: Smoothing. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A Gaussian blur convolves the image with $G(x,y)=\exp(-(x^2+y^2)/(2\sigma^2))/(2\pi\sigma^2)$. The kernel is separable, so a two-dimensional blur can be implemented as horizontal and vertical one-dimensional passes.

## Code Example
```csharp
static double GaussianBlurAt(ReadOnlySpan<double> row, int center, ReadOnlySpan<double> kernel)
{
    var radius = kernel.Length / 2;
    var sum = 0.0;

    for (var k = 0; k < kernel.Length; k++)
    {
        sum += row[center + k - radius] * kernel[k];
    }

    return sum;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Sobel filter]]
- [[Canny edge detector]]
- [[Optical flow]]

## Sources
- [Wikipedia: Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
