---
title: Prewitt filter
---
**Prewitt filter** is a signal-processing method used in image and video signal processing for this role: Edge detection. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The Prewitt operator estimates horizontal and vertical image gradients with simple $3\times3$ masks. Its $x$ mask uses columns $[-1,0,1]$ with uniform vertical smoothing, making it a low-cost edge detector.

## Code Example
```csharp
static double PrewittX(double[,] image, int row, int col)
{
    return -image[row - 1, col - 1] + image[row - 1, col + 1]
        - image[row, col - 1] + image[row, col + 1]
        - image[row + 1, col - 1] + image[row + 1, col + 1];
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Canny edge detector]]

## Sources
- [Wikipedia: Prewitt filter](https://en.wikipedia.org/wiki/Prewitt_operator)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
