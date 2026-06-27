---
title: OFDM FFT and IFFT
---
**OFDM FFT and IFFT** processing maps symbols onto many orthogonal subcarriers. The IFFT creates the time-domain transmit block and the FFT recovers subcarrier symbols at the receiver.

## Mathematical description

An OFDM symbol is $x[n]=\frac{1}{N}\sum_{k=0}^{N-1}X[k]e^{j2\pi kn/N}$. Orthogonality lets each subcarrier be equalized independently after the receive FFT.

## Code example

```csharp
static (double Real, double Imag)[] AddCyclicPrefix(ReadOnlySpan<(double Real, double Imag)> timeDomain, int prefixLength)
{
    var output = new (double Real, double Imag)[timeDomain.Length + prefixLength];
    timeDomain[^prefixLength..].CopyTo(output);
    timeDomain.CopyTo(output.AsSpan(prefixLength));
    return output;
}
```

## Related

- [[Channel estimation]]
- [[MIMO detection]]
- [[MMSE equalizer]]

## Sources

- <https://en.wikipedia.org/wiki/Orthogonal_frequency-division_multiplexing>
- <https://en.wikipedia.org/wiki/Fast_Fourier_transform>
