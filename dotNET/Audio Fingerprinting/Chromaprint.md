- Extract **chroma features** (energy per pitch class).
- Compress with quantization → fingerprint.

## Advantages and Tradeoffs

- ✅ Works well with existing databases.
- 🛑 Sliding window alignment is costly at scale.
- ⚖️ Practical for **open-source deployments**.

## Example

```csharp
public static class ChromaprintFingerprint
{
    public static IEnumerable<int> GenerateFingerprints(Stream audioStream)
    {
        using var reader = new WaveFileReader(audioStream);
        int frameSize = 2048;
        var buffer = new float[frameSize];

        while (reader.ReadNextSampleFrame(buffer, 0, frameSize) > 0)
        {
            var spectrum = buffer.Select(s => new Complex32(s, 0)).ToArray();
            Fourier.Forward(spectrum, FourierOptions.Matlab);

            // project onto 12 chroma bins
            var chroma = new double[12];
            for (int i = 0; i < spectrum.Length; i++)
            {
                int pitchClass = i % 12;
                chroma[pitchClass] += spectrum[i].Magnitude;
            }

            // quantize to bits
            int hash = 0;
            double mean = chroma.Average();
            for (int i = 0; i < 12; i++)
                if (chroma[i] > mean)
                    hash |= (1 << i);

            yield return hash;
        }
    }
}
```

## Storage / Lookup

- Each track → 32–64 bit hashes (sequence).
- **Matching:** Use **Hamming distance** or **subsequence matching**.
- **Database**: Classical RDBMS with B-tree on 64-bit ints, or **pgvector (binary mode)**.
- **Query:** nearest-neighbor search.
- **Optimal DB**: Binary vector DB
	- Weaviate
	- Qdrant with Hamming metric

```csharp
public class ChromaprintDb
{
    private readonly Dictionary<string, List<int>> tracks = new();

    public void Insert(string trackId, IEnumerable<int> chromaHashes)
        => tracks[trackId] = chromaHashes.ToList();

    public string? Query(IEnumerable<int> queryHashes)
    {
        string? best = null;
        int bestDistance = int.MaxValue;

        foreach (var (trackId, seq) in tracks)
        {
            int distance = SequenceDistance(seq, queryHashes.ToList());
            if (distance < bestDistance)
            {
                bestDistance = distance;
                best = trackId;
            }
        }
        return best;
    }

    private static int SequenceDistance(List<int> a, List<int> b)
    {
        int minLen = Math.Min(a.Count, b.Count);
        int total = 0;
        for (int i = 0; i < minLen; i++)
            total += HammingDistance(a[i], b[i]);
        return total;
    }

    private static int HammingDistance(int x, int y)
        => Convert.ToString(x ^ y, 2).Count(c => c == '1');
}
```
