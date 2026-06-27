---
title: Convolution filter
---
**Convolution filter** is a signal-processing method used in image and video signal processing for this role: General spatial filtering. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A discrete filter forms $y[n]=\sum_k h[k]x[n-k]$ in one dimension or $Y[i,j]=\sum_u\sum_v K[u,v]X[i-u,j-v]$ for images; kernel choice controls smoothing, edges, or phase.

## Code Example
```csharp
static double ConvolutionFilterAt(double[,] image, double[,] kernel, int row, int col)
{
    var sum = 0.0;
    for (var y = 0; y < kernel.GetLength(0); y++)
    {
        for (var x = 0; x < kernel.GetLength(1); x++)
        {
            sum += image[row + y - 1, col + x - 1] * kernel[y, x];
        }
    }

    return sum;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Canny edge detector]]
- [[Optical flow]]

## Sources
- [Wikipedia: Convolution filter](https://en.wikipedia.org/wiki/Kernel_(image_processing%29))
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
