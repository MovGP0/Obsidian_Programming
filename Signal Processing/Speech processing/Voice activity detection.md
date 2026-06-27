---
title: Voice activity detection
---
**Voice activity detection** (**VAD**) is a signal-processing method used in speech processing for this role: Detect speech/non-speech. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Voice activity detection classifies a frame as speech or non-speech from features such as short-time energy, zero-crossing rate, spectral flux, or model likelihoods. A simple energy detector compares $E=\sum_n x^2[n]/N$ with an adaptive noise-floor threshold.

## Code Example
```csharp
static bool IsSpeechFrame(ReadOnlySpan<double> frame, double noiseFloor, double margin)
{
    var energy = 0.0;

    foreach (var sample in frame)
    {
        energy += sample * sample;
    }

    var meanEnergy = energy / frame.Length;
    return meanEnergy > noiseFloor * margin;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Linear predictive coding]]
- [[MFCC extraction]]
- [[Pitch tracking]]
- [[Echo cancellation]]

## Sources
- [Wikipedia: Voice activity detection](https://en.wikipedia.org/wiki/Voice_activity_detection)
- [CMU Sphinx: Front-end feature extraction](https://cmusphinx.github.io/wiki/tutorialconcepts/)
- [The Scientist and Engineer's Guide to DSP](https://www.dspguide.com/)
