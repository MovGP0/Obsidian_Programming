---
title: Audio Fingerprinting
---
## Stages

1. Signal preprocessing
	- The incoming audio (e.g. from a microphone) is converted to mono and downsampled (Shazam uses ~8 kHz).
	- This reduces data while preserving perceptual information.
2. Time–frequency transformation
	- The audio is split into overlapping frames (e.g. 2048 samples, 50% overlap).
	- A **short-time Fourier transform (STFT)** is applied → produces a spectrogram: magnitude of frequency bins over time.
3. Spectrogram peak picking ("constellation map")
	- In the spectrogram, Shazam looks for **local maxima** in frequency–time space, i.e. "peaks" where energy is strong relative to neighbors.
	- These peaks are robust under distortion: if you compress or re-record the track, the loudest partials (peaks) remain.
	- The result is a **constellation map**: a sparse set of (time, frequency) points.
4. Landmark pairs
	- To make fingerprints discriminative, peaks are not used in isolation.
	- Instead, Shazam forms **pairs of peaks**: Take an anchor peak (at time `t1`, frequency `f1`) and link it to another peak (at `t2`, `f2`) within a target zone (a few seconds forward).
	- Each pair encodes: `(f1, f2, Δt)` where `Δt = t2 – t1`.
	  This triple is robust (timing is relative, so small shifts don’t break it) and very distinctive.
5. Hashing
	- The triple `(f1, f2, Δt)` is converted into a **compact hash value** (e.g. 32–64 bits).
	- Each hash is associated with the absolute time offset `t1` in the track.
	- A single track yields thousands of such hashes.
6. Database storage
	- The database stores mappings: `hash → { track_id, time_in_track }`
	- Essentially, it’s an inverted index: given a hash, retrieve all places it occurs in the catalog.
7. Query matching
	- For a query clip, fingerprints are computed the same way.
	- Each query hash is looked up in the database.
	- For each matching hash, compute the offset:
	  `offset = db_time_in_track – query_time`
	- If the query truly comes from a track, **many hashes align to the same offset** → a strong vote.
	- Other matches (coincidental or noise) scatter randomly.
8. Identification
	- Find the track ID with the highest number of consistent offset matches.
	- Report that as the match, with a confidence score.

## Algorithms

| Algorithm                                           | Method                                                                                 | Feature type       | Match method              | Index size<br>(per track) | Query speed | Catalog size support |
| --------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------ | ------------------------- | ------------------------- | ----------- | -------------------- |
| [[Shazam]]                                          | constellation maps + peak-pair hashes                                                  | Sparse hashes      | Offset clustering         | ~3–5k hashes/min          | $O(N)$      | 100M+ tracks         |
| [[Philips Robust Hashing]]                          | based on spectral energy bands;<br>sub-band energy differences                         | Band-energy hashes | Hamming distance sequence | ~3k hashes/min            | $O(N)$      | 1M–10M tracks        |
| [[Chromaprint]] ([AcoustID](https://acoustid.org/)) | chroma vector binarization.;<br>uses MFCC-like features and compresses to fingerprints | Chroma bitstrings  | Hamming distance          | ~5–10k hashes/min         | $O(N)$      | 1M–10M tracks        |
| [[Deep Learning Embedding]]                         | embeddings from neural nets;<br>replaces handcrafted hashes                            | Dense embeddings   | Cosine similarity         | ~12 vectors/min           | $O(\log N)$ | 10M–50M tracks       |
