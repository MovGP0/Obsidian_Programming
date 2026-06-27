---
title: Laplacian filter
---
**Laplacian filter** is a signal-processing method used in image and video signal processing for this role: Edge detection/sharpening. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The Laplacian filter estimates the second spatial derivative, $
abla^2 I = I_{xx}+I_{yy}$. Discrete kernels such as $egin{bmatrix}0&1&0\\1&-4&1\\0&1&0\end{bmatrix}$ highlight rapid intensity changes and can be used for edge detection or sharpening.

## Code Example
```csharp
static double FourNeighborLaplacian(double[,] image, int row, int col)
{
    return image[row - 1, col]
        + image[row + 1, col]
        + image[row, col - 1]
        + image[row, col + 1]
        - 4.0 * image[row, col];
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Canny edge detector]]

## Sources
- [Wikipedia: Laplacian filter](https://en.wikipedia.org/wiki/Discrete_Laplace_operator)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
