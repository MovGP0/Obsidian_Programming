---
title: Signal Processing
---
## Time-domain processing

|Algorithm|Purpose|
|---|---|
|Moving average filter|Simple smoothing / noise reduction|
|Exponential moving average|Low-cost smoothing with memory|
|Median filter|Removes impulse/spike noise|
|Savitzky–Golay filter|Smooths while preserving shape/derivatives|
|Differentiator|Estimates rate of change|
|Integrator|Accumulates signal over time|
|Zero-crossing detector|Detects sign changes, frequency, phase|
|Peak detector|Finds local maxima/minima|
|Envelope follower|Tracks signal amplitude over time|
|RMS estimator|Measures signal power/amplitude|
|Schmitt trigger|Robust threshold crossing with hysteresis|
## Frequency-domain transforms

|Algorithm|Purpose|
|---|---|
|DFT|Discrete frequency analysis|
|FFT|Fast computation of the DFT|
|IFFT|Reconstructs time-domain signal from spectrum|
|STFT|Time-frequency analysis|
|Goertzel algorithm|Efficient single-frequency/bin detection|
|Chirp Z-transform|Frequency analysis on arbitrary contours|
|Hartley transform|Real-valued alternative to Fourier transform|
|Cepstrum|Echo, pitch, and spectral envelope analysis|
|Hilbert transform|Analytic signal / envelope / instantaneous phase|
|Wavelet transform|Multi-resolution time-frequency analysis|
## Digital filters

|Algorithm|Purpose|
|---|---|
|FIR filter|Stable finite impulse response filtering|
|IIR filter|Efficient recursive filtering|
|Butterworth filter|Smooth passband, no ripple|
|Chebyshev Type I filter|Sharper cutoff, passband ripple|
|Chebyshev Type II filter|Sharper cutoff, stopband ripple|
|Elliptic filter|Steepest transition for given order|
|Bessel filter|Preserves waveform shape / group delay|
|Notch filter|Removes a narrow frequency band|
|Comb filter|Periodic notches or peaks|
|All-pass filter|Changes phase without changing magnitude|
|Polyphase filter|Efficient resampling/filter banks|
|CIC filter|Multirate filtering without multipliers|
|Half-band filter|Efficient 2× decimation/interpolation|
|Matched filter|Detects known signal in noise|
## Adaptive filters

|Algorithm|Purpose|
|---|---|
|LMS|Adaptive filtering / noise cancellation|
|NLMS|Normalized LMS, more stable step size|
|RLS|Fast-converging adaptive filter|
|Kalman filter|Optimal state estimation for linear systems|
|Extended Kalman filter|Nonlinear state estimation|
|Unscented Kalman filter|Nonlinear state estimation without explicit Jacobian|
|Particle filter|Nonlinear/non-Gaussian state estimation|
|Adaptive notch filter|Tracks and removes drifting tones|
|Wiener filter|Minimum mean-square-error filtering|
## Spectral estimation

|Algorithm|Purpose|
|---|---|
|Periodogram|Basic power spectral density estimate|
|Welch method|Averaged PSD estimate|
|Bartlett method|Averaged periodogram|
|Multitaper method|Low-variance spectral estimate|
|MUSIC|High-resolution frequency/direction estimation|
|ESPRIT|High-resolution sinusoid/DOA estimation|
|AR spectral estimation|Parametric spectrum estimation|
|Yule–Walker method|Autoregressive model estimation|
|Burg method|Stable AR spectral estimation|
|Prony method|Exponential/sinusoidal model fitting|
## Resampling and multirate DSP

|Algorithm|Purpose|
|---|---|
|Decimation|Reduce sample rate|
|Interpolation|Increase sample rate|
|Rational resampling|Convert by ratio `L/M`|
|Sample-rate conversion|General resampling|
|Farrow structure|Fractional-delay interpolation|
|Sinc interpolation|Idealized bandlimited interpolation|
|Polyphase resampling|Efficient multirate conversion|
|CIC decimator/interpolator|Hardware-friendly rate conversion|
|Fractional delay filter|Sub-sample timing adjustment|
## Detection and estimation

|Algorithm|Purpose|
|---|---|
|Threshold detector|Detect signal presence|
|Energy detector|Detect signal by power|
|Matched filter detector|Detect known waveform|
|Correlation detector|Detect similarity/time delay|
|Cross-correlation|Estimate delay or alignment|
|Autocorrelation|Estimate periodicity|
|Phase correlation|Image/audio alignment|
|Maximum likelihood estimation|Parameter estimation|
|Least squares estimation|Fit model to observations|
|Recursive least squares|Online least-squares estimation|
|CORDIC|Hardware-friendly sin/cos/atan/magnitude|
## Modulation and demodulation

|Algorithm|Purpose|
|---|---|
|AM demodulation|Extract amplitude-modulated signal|
|FM demodulation|Extract frequency-modulated signal|
|PM demodulation|Extract phase-modulated signal|
|IQ modulation/demodulation|Complex baseband processing|
|Quadrature mixing|Frequency translation|
|Digital downconversion|RF/IF to baseband conversion|
|Digital upconversion|Baseband to RF/IF conversion|
|PLL|Phase/frequency tracking|
|Costas loop|Carrier recovery for suppressed-carrier signals|
|Gardner timing recovery|Symbol timing recovery|
|Mueller and Müller recovery|Symbol timing recovery|
|Early-late gate|Timing synchronization|
## Communications DSP

|Algorithm|Purpose|
|---|---|
|Pulse shaping|Bandwidth-controlled symbol generation|
|Raised-cosine filter|Nyquist pulse shaping|
|Root-raised-cosine filter|Common TX/RX pulse shaping|
|Equalizer|Compensates channel distortion|
|Zero-forcing equalizer|Inverts channel response|
|MMSE equalizer|Noise-aware equalization|
|Decision feedback equalizer|Removes post-cursor ISI|
|Viterbi algorithm|Sequence decoding|
|BCJR algorithm|MAP sequence decoding|
|Turbo decoding|Iterative error correction|
|LDPC decoding|Modern error correction|
|OFDM FFT/IFFT|Multicarrier modulation|
|Channel estimation|Estimate communication channel|
|MIMO detection|Separate multiple spatial streams|
## Audio signal processing

|Algorithm|Purpose|
|---|---|
|Dynamic range compressor|Reduces amplitude range|
|Limiter|Prevents clipping|
|Expander|Increases dynamic range|
|Noise gate|Suppresses low-level noise|
|Equalizer|Tone shaping|
|Graphic EQ|Fixed-band equalization|
|Parametric EQ|Tunable equalization|
|Reverb|Simulates acoustic space|
|Delay / echo|Time-shifted repetitions|
|Chorus|Modulated delay thickening|
|Flanger|Short modulated delay effect|
|Phaser|Modulated all-pass filtering|
|Pitch detection|Estimate fundamental frequency|
|Pitch shifting|Change pitch without duration|
|Time stretching|Change duration without pitch|
|Vocoder|Spectral envelope transfer|
## Speech processing

|Algorithm|Purpose|
|---|---|
|Voice activity detection|Detect speech/non-speech|
|Linear predictive coding|Speech modeling/compression|
|MFCC extraction|Speech/audio features|
|PLP|Perceptual speech features|
|Formant estimation|Vocal tract resonance analysis|
|Pitch tracking|Fundamental frequency estimation|
|Spectral subtraction|Speech noise reduction|
|Wiener speech enhancement|Noise suppression|
|Echo cancellation|Remove acoustic echo|
|Beamforming|Spatial speech enhancement|
## Image and video signal processing

|Algorithm|Purpose|
|---|---|
|Convolution filter|General spatial filtering|
|Gaussian blur|Smoothing|
|Sobel filter|Edge detection|
|Prewitt filter|Edge detection|
|Laplacian filter|Edge detection/sharpening|
|Canny edge detector|Robust edge detection|
|Histogram equalization|Contrast enhancement|
|Bilateral filter|Edge-preserving smoothing|
|Non-local means|Denoising|
|Wiener deconvolution|Deblurring|
|Optical flow|Motion estimation|
|Block matching|Video motion estimation|
|DCT|Image/video compression|
|Wavelet compression|Multi-resolution compression|
## Radar, sonar, and navigation DSP

|Algorithm|Purpose|
|---|---|
|Pulse compression|Improve range resolution|
|Matched filtering|Detect reflected waveform|
|Doppler processing|Estimate velocity|
|Range-Doppler FFT|Radar range/velocity map|
|CFAR detection|Adaptive radar target detection|
|Beamforming|Directional sensing|
|MUSIC DOA|Direction-of-arrival estimation|
|ESPRIT DOA|Direction-of-arrival estimation|
|Synthetic aperture radar processing|High-resolution radar imaging|
|Track-before-detect|Weak target tracking|
|Alpha-beta filter|Simple tracking filter|
|Kalman tracking|State tracking|
|Particle tracking|Nonlinear target tracking|
## Control and sensor processing

|Algorithm|Purpose|
|---|---|
|Low-pass filtering|Sensor smoothing|
|Complementary filter|Sensor fusion|
|Kalman filter|Sensor/state estimation|
|Extended Kalman filter|Nonlinear sensor fusion|
|Madgwick filter|IMU orientation estimation|
|Mahony filter|IMU orientation estimation|
|Dead reckoning|Position integration|
|Sensor calibration|Bias/scale correction|
|Outlier rejection|Remove bad samples|
|Allan variance|Noise/stability characterization|
## Compression and coding

|Algorithm|Purpose|
|---|---|
|PCM|Raw sampled signal coding|
|Differential PCM|Encode sample differences|
|ADPCM|Adaptive differential coding|
|µ-law / A-law companding|Speech amplitude compression|
|Transform coding|Compression via frequency domain|
|DCT coding|JPEG/audio/video compression|
|Subband coding|Split signal into frequency bands|
|Predictive coding|Model-based compression|
|Entropy coding|Huffman/arithmetic coding|
|Vector quantization|Codebook-based compression|
## Hardware-friendly algorithms

|Algorithm|Why useful in Verilog/FPGA|
|---|---|
|CORDIC|Computes sin/cos/atan/magnitude without multipliers|
|CIC filter|Multirate filtering using only adders/delays|
|FIR filter|Maps well to DSP slices|
|FFT|Maps well to butterfly pipelines|
|Goertzel|Efficient tone detection|
|Polyphase filter|Efficient resampling|
|Numerically controlled oscillator|Digital sine/cosine generation|
|Direct digital synthesis|Frequency synthesis|
|Fixed-point LMS|Adaptive filtering in hardware|
|Pipelined correlator|Synchronization/detection|
