---
title: Sobel filter
---
**Sobel filter** is a signal-processing method used in image and video signal processing for this role: Edge detection. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The Sobel operator estimates gradients with derivative masks that also smooth in the perpendicular direction. The $x$ kernel $egin{bmatrix}-1&0&1\\-2&0&2\\-1&0&1\end{bmatrix}$ emphasizes vertical edges while reducing sensitivity to isolated noise.

## Code Example
```csharp
static double SobelX(double[,] image, int row, int col)
{
    return -image[row - 1, col - 1] + image[row - 1, col + 1]
        - 2.0 * image[row, col - 1] + 2.0 * image[row, col + 1]
        - image[row + 1, col - 1] + image[row + 1, col + 1];
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Canny edge detector]]
- [[Optical flow]]

## Sources
- [Wikipedia: Sobel filter](https://en.wikipedia.org/wiki/Sobel_operator)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
