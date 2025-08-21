- Divide spectrum into **sub-bands**.
- Track energy differences across frames.
- Hash encodes _relative changes_, robust to distortion.

## Advantages and Tradeoffs

- ✅ Smaller index.
- 🛑 Weaker discriminability than Shazam (more collisions).
- ⚖️ Works well for mid-sized catalogs (100k–1M tracks).

## Example

```csharp
public static class PhilipsFingerprint
{
    public static IEnumerable<int> GenerateFingerprints(Stream audioStream)
    {
        using var reader = new WaveFileReader(audioStream);

        int frameSize = 1024;
        var buffer = new float[frameSize];
        int read;

        while ((read = reader.ReadNextSampleFrame(buffer, 0, frameSize)) > 0)
        {
            var spectrum = buffer.Take(read).Select(s => new Complex32(s, 0)).ToArray();
            Fourier.Forward(spectrum, FourierOptions.Matlab);

            // split into bands (toy: 8)
            var bands = Enumerable.Range(0, 8)
                .Select(b => spectrum.Skip(b * spectrum.Length / 8).Take(spectrum.Length / 8)
                    .Sum(c => c.Magnitude))
                .ToArray();

            // compute relative differences
            int hash = 0;
            for (int i = 1; i < bands.Length; i++)
                if (bands[i] > bands[i - 1])
                    hash |= (1 << i);

            yield return hash;
        }
    }
}
```

## Storage / Lookup

- Fingerprints are **short hashes per frame**.
- **Matching:** Hamming distance between sequences.
- **Database**: PostgreSQL with `pg_trgm` or LSH buckets
	- e.g. MinHash-LSH index
- **Query:** compute sequence of hashes, slide over candidates.
- **Optimal DB**: DB with Hamming-aware index
	- Faiss with binary vectors,
	- or PostgreSQL + pgvector with `bit` type

```csharp
public class PhilipsMatcher
{
    private readonly Dictionary<string, List<int>> tracks = new();

    public void Insert(string trackId, IEnumerable<int> hashes)
        => tracks[trackId] = hashes.ToList();

    public string? Query(IEnumerable<int> queryHashes)
    {
        var querySeq = queryHashes.ToList();
        string? bestTrack = null;
        int bestScore = int.MinValue;

        foreach (var (trackId, seq) in tracks)
        {
            int score = SequenceSimilarity(seq, querySeq);
            if (score > bestScore)
            {
                bestScore = score;
                bestTrack = trackId;
            }
        }
        return bestTrack;
    }

    private static int SequenceSimilarity(List<int> a, List<int> b)
    {
        int minLen = Math.Min(a.Count, b.Count);
        int matches = 0;
        for (int i = 0; i < minLen; i++)
            if (HammingDistance(a[i], b[i]) < 2)
                matches++;
        return matches;
    }

    private static int HammingDistance(int x, int y)
        => Convert.ToString(x ^ y, 2).Count(c => c == '1');
}
```
