---
title: MIMO Detection
---
**MIMO detection** separates multiple simultaneously transmitted spatial streams from multiple receive antennas. It ranges from linear detectors to maximum-likelihood search.

## Mathematical description

A flat-fading model is $\mathbf{y}=\mathbf{H}\mathbf{x}+\mathbf{n}$. Zero-forcing detection uses $\hat{\mathbf{x}}=(\mathbf{H}^H\mathbf{H})^{-1}\mathbf{H}^H\mathbf{y}$ when the inverse is well conditioned.

## Code example

```csharp
static (double X0, double X1) ZeroForce2x2(double h00, double h01, double h10, double h11, double y0, double y1)
{
    var determinant = h00 * h11 - h01 * h10;
    return ((h11 * y0 - h01 * y1) / determinant, (-h10 * y0 + h00 * y1) / determinant);
}
```

## Related

- [[MMSE equalizer]]
- [[Channel estimation]]
- [[OFDM FFT and IFFT]]

## Sources

- <https://en.wikipedia.org/wiki/MIMO>
- <https://en.wikipedia.org/wiki/Space%E2%80%93time_code>
