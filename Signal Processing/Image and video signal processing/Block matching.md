---
title: Block matching
---
**Block matching** is a signal-processing method used in image and video signal processing for this role: Video motion estimation. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
For each current block $B$, motion estimation searches candidate displacements $d$ and minimizes a cost such as $\operatorname{SAD}(d)=\sum_{p\in B}|I_t(p)-I_{t-1}(p+d)|$.

## Code Example
```csharp
static (int Dx, int Dy, double Sad) BestBlockMatch(Func<int, int, double> sadAtOffset, int searchRadius)
{
    var best = (Dx: 0, Dy: 0, Sad: double.PositiveInfinity);

    for (var dy = -searchRadius; dy <= searchRadius; dy++)
    {
        for (var dx = -searchRadius; dx <= searchRadius; dx++)
        {
            var sad = sadAtOffset(dx, dy);
            if (sad < best.Sad)
            {
                best = (dx, dy, sad);
            }
        }
    }

    return best;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Convolution filter]]
- [[Gaussian blur]]
- [[Sobel filter]]
- [[Canny edge detector]]

## Sources
- [Wikipedia: Block matching](https://en.wikipedia.org/wiki/Block-matching_algorithm)
- [OpenCV image filtering reference](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV image gradients reference](https://docs.opencv.org/4.x/d5/d0f/tutorial_py_gradients.html)
