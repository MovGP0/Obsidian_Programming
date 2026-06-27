---
title: Optical flow
---
**Optical flow** is a signal-processing method used in image and video signal processing for this role: Motion estimation. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Brightness constancy gives $I_x u + I_y v + I_t = 0$; practical solvers add smoothness or local least-squares constraints to estimate the motion field $(u,v)$.

## Code Example
```csharp
static (double U, double V) LucasKanade(double ix2, double iy2, double ixiy, double ixit, double iyit)
{
    var determinant = ix2 * iy2 - ixiy * ixiy;
    return ((ixiy * iyit - iy2 * ixit) / determinant, (ixiy * ixit - ix2 * iyit) / determinant);
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Canny edge detector]]

## Sources
- [Wikipedia: Optical flow](https://en.wikipedia.org/wiki/Optical_flow)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
