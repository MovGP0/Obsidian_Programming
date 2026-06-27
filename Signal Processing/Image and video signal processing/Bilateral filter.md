---
title: Bilateral filter
---
**Bilateral filter** is a signal-processing method used in image and video signal processing for this role: Edge-preserving smoothing. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A bilateral filter averages nearby pixels with both spatial and intensity weights. For pixel $p$, $\hat I(p)=\sum_q G_s(||p-q||)G_r(|I(p)-I(q)|)I(q)/W_p$, so edges are preserved because pixels with very different intensities receive small range weights.

## Code Example
```csharp
static double BilateralAt(double[,] image, int row, int col, int radius, double sigmaSpace, double sigmaRange)
{
    var center = image[row, col];
    var sum = 0.0;
    var weightSum = 0.0;

    for (var y = -radius; y <= radius; y++)
    {
        for (var x = -radius; x <= radius; x++)
        {
            var neighbor = image[row + y, col + x];
            var spatial = Math.Exp(-(x * x + y * y) / (2.0 * sigmaSpace * sigmaSpace));
            var range = Math.Exp(-Math.Pow(center - neighbor, 2.0) / (2.0 * sigmaRange * sigmaRange));
            sum += neighbor * spatial * range;
            weightSum += spatial * range;
        }
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
- [Wikipedia: Bilateral filter](https://en.wikipedia.org/wiki/Bilateral_filter)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
