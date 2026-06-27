---
title: Wiener deconvolution
---
**Wiener deconvolution** is a signal-processing method used in image and video signal processing for this role: Deblurring. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Wiener deconvolution reverses blur while limiting noise amplification. In the frequency domain, $\hat X(f)=H^*(f)Y(f)/( |H(f)|^2 + K )$, where $H$ is the blur transfer function and $K$ approximates the noise-to-signal power ratio.

## Code Example
```csharp
static (double Real, double Imaginary) WienerDeconvolutionBin(
    double observedReal,
    double observedImaginary,
    double blurReal,
    double blurImaginary,
    double noiseToSignal)
{
    var denominator = blurReal * blurReal + blurImaginary * blurImaginary + noiseToSignal;
    var real = (observedReal * blurReal + observedImaginary * blurImaginary) / denominator;
    var imaginary = (observedImaginary * blurReal - observedReal * blurImaginary) / denominator;
    return (real, imaginary);
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Canny edge detector]]

## Sources
- [Wikipedia: Wiener deconvolution](https://en.wikipedia.org/wiki/Wiener_deconvolution)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
