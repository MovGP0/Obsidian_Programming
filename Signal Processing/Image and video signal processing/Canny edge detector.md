---
title: Canny edge detector
---
**Canny edge detector** is a signal-processing method used in image and video signal processing for this role: Robust edge detection. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
The Canny detector smooths the image, computes gradient magnitude and direction, suppresses non-maximal gradient responses, and links remaining pixels with two thresholds. Hysteresis keeps weak edge pixels only when connected to strong edges.

## Code Example
```csharp
static bool KeepByCannyHysteresis(bool strong, bool weak, bool touchesStrong)
{
    return strong || (weak && touchesStrong);
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Optical flow]]

## Sources
- [Wikipedia: Canny edge detector](https://en.wikipedia.org/wiki/Canny_edge_detector)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
