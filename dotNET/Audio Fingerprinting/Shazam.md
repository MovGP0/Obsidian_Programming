Classic fingerprinting algorithm.

## Advantages and Tradeoffs

- 🔥 Extremely fast (hash lookup $O(1)$).
- 🛑 Index size grows fast (TBs for big catalogs).
- ✅ Perfect for truncation (offset clustering).

## Example

```csharp
using NAudio.Wave;
using MathNet.Numerics.IntegralTransforms;

public static class ShazamFingerprint
{
    public static IEnumerable<(int Hash, double Time)> GenerateFingerprints(Stream audioStream)
    {
        using var reader = new WaveFileReader(audioStream); // assume PCM16
        var buffer = new float[reader.WaveFormat.SampleRate / 2]; // ~0.5s frames
        int read;
        double time = 0;

        while ((read = reader.ReadNextSampleFrame(buffer, 0, buffer.Length)) > 0)
        {
            // FFT
            Complex32[] spectrum = buffer.Take(read).Select(s => new Complex32(s, 0)).ToArray();
            Fourier.Forward(spectrum, FourierOptions.Matlab);

            // peak picking: local maxima in log-freq scale
            var peaks = PickSpectralPeaks(spectrum);

            // make pairs
            foreach (var (f1, t1) in peaks)
            foreach (var (f2, t2) in peaks.Where(p => p.t > t1 && p.t - t1 < 5.0))
            {
                var hash = HashTriple(f1, f2, (int)(t2 - t1));
                yield return (hash, time + t1);
            }

            time += buffer.Length / (double)reader.WaveFormat.SampleRate;
        }
    }

    private static IEnumerable<(int f, double t)> PickSpectralPeaks(Complex32[] spectrum)
    {
        // toy: just take top-N bins
        return spectrum
            .Select((c, i) => (i, c.Magnitude))
            .OrderByDescending(p => p.Magnitude)
            .Take(5)
            .Select(p => (p.i, 0.0));
    }

    private static int HashTriple(int f1, int f2, int deltaT)
        => HashCode.Combine(f1, f2, deltaT);
}
```

## Storage / Lookup

- **Database**: Inverted index keyed by hash.
    - Each entry: `{ trackId, timeInTrack }`.
    - Optimally stored in **SQL (indexed columns)** or **key-value store (RocksDB, Redis)**.
- **Query**: Look up each hash, compute offset alignment votes.
- **Optimal DB**: In-memory or Redis for fast hash lookups. Works at massive scale.

```csharp
public class ShazamDb
{
    private readonly Dictionary<int, List<(string TrackId, double Time)>> index = new();

    public void Insert(string trackId, IEnumerable<(int Hash, double Time)> fingerprints)
    {
        foreach (var (hash, time) in fingerprints)
        {
            if (!index.TryGetValue(hash, out var list))
                index[hash] = list = new();
            list.Add((trackId, time));
        }
    }

    public string? Query(IEnumerable<(int Hash, double Time)> queryFingerprints)
    {
        var votes = new Dictionary<string, Dictionary<int, int>>();

        foreach (var (hash, queryTime) in queryFingerprints)
        {
            if (!index.TryGetValue(hash, out var matches)) continue;
            foreach (var (trackId, dbTime) in matches)
            {
                int offset = (int)(dbTime - queryTime);
                if (!votes.TryGetValue(trackId, out var offsets))
                    votes[trackId] = offsets = new();
                offsets.TryAdd(offset, 0);
                offsets[offset]++;
            }
        }

        // winner = track with strongest offset cluster
        return votes
            .Select(kv => (kv.Key, MaxVotes: kv.Value.Values.Max()))
            .OrderByDescending(v => v.MaxVotes)
            .FirstOrDefault().Key;
    }
}
```
