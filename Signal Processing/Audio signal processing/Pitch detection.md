---
title: Pitch Detection
---
**Pitch detection** estimates the fundamental frequency of a periodic sound. It is used in tuners, transcription, speech analysis, and pitch-correction systems.

## Mathematical description

Autocorrelation estimates pitch by finding a lag $\tau$ that maximizes $R[\tau]=\sum_n x[n]x[n-\tau]$. The frequency estimate is $\hat{f}_0=f_s/\hat{\tau}$.

## Code example

```csharp
static double DetectPitchHz(ReadOnlySpan<double> frame, double sampleRate, double minHz, double maxHz)
{
    var minLag = (int)(sampleRate / maxHz);
    var maxLag = (int)(sampleRate / minHz);
    var bestLag = minLag;
    var best = double.NegativeInfinity;

    for (var lag = minLag; lag <= maxLag; lag++)
    {
        var sum = 0.0;
        for (var n = lag; n < frame.Length; n++)
        {
            sum += frame[n] * frame[n - lag];
        }

        if (sum > best)
        {
            best = sum;
            bestLag = lag;
        }
    }

    return sampleRate / bestLag;
}
```

## Related

- [[Pitch shifting]]
- [[Time stretching]]
- [[Vocoder]]

## Sources

- <https://en.wikipedia.org/wiki/Pitch_detection_algorithm>
- <https://www.dsprelated.com/freebooks/sasp/Pitch_Detection.html>
