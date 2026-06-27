---
title: Channel Estimation
---
**Channel estimation** measures the communication channel response from pilots, training symbols, or decision-directed updates. Receivers use it for equalization, detection, and link adaptation.

## Mathematical description

For known pilot $x_k$ and received value $y_k$, a simple least-squares estimate is $\hat{H}_k=y_k/x_k$. Interpolation estimates the response between pilot tones or pilot symbols.

## Code example

```csharp
static (double Real, double Imag)[] EstimatePilotChannels(
    ReadOnlySpan<(double Real, double Imag)> receivedPilots,
    ReadOnlySpan<(double Real, double Imag)> transmittedPilots)
{
    var channel = new (double Real, double Imag)[receivedPilots.Length];

    for (var k = 0; k < channel.Length; k++)
    {
        var x = transmittedPilots[k];
        var y = receivedPilots[k];
        var denominator = x.Real * x.Real + x.Imag * x.Imag;
        channel[k] = ((y.Real * x.Real + y.Imag * x.Imag) / denominator,
            (y.Imag * x.Real - y.Real * x.Imag) / denominator);
    }

    return channel;
}
```

## Related

- [[Zero-forcing equalizer]]
- [[MMSE equalizer]]
- [[OFDM FFT and IFFT]]

## Sources

- <https://en.wikipedia.org/wiki/Channel_estimation>
- <https://en.wikipedia.org/wiki/Pilot_signal>
