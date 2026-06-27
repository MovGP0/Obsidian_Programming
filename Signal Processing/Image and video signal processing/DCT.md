---
title: DCT
---
**DCT** is a signal-processing method used in image and video signal processing for this role: Image/video compression. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
For block samples $x_n$, a DCT-II coefficient is $X_k = \alpha_k \sum_{n=0}^{N-1} x_n \cos(\pi(n+1/2)k/N)$, concentrating smooth signal energy into low-frequency terms.

## Code Example
```csharp
static double Dct2Coefficient(double[,] block, int u, int v)
{
    var sum = 0.0;

    for (var y = 0; y < 8; y++)
    {
        for (var x = 0; x < 8; x++)
        {
            sum += block[y, x] * Math.Cos((2 * x + 1) * u * Math.PI / 16.0) * Math.Cos((2 * y + 1) * v * Math.PI / 16.0);
        }
    }

    return 0.25 * sum;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Canny edge detector]]

## Sources
- [Wikipedia: DCT](https://en.wikipedia.org/wiki/Discrete_cosine_transform)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
