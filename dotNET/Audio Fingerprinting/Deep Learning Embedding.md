- **Shazam**: peak constellation, pair hashes.
- **Philips**: sub-band energy differences.
- **Chromaprint**: chroma vector binarization.
- **Deep learning**: embeddings from models like Wav2Vec2, HuBERT, or CLAP.

E.g. using the **ONNX Runtime** or HuggingFace’s Inference API to run a pretrained embedding model.  

## Advantages and Tradeoffs

- ✅ Semantic robustness (works across versions, covers noisy queries).
- ✅ ANN search is sublinear, handles millions of vectors.
- 🛑 Storage heavy (billions of vectors → 100s of GB).
- 🛑 Needs GPU/optimized servers.

## Models

- [Wav2Vec2](https://huggingface.co/docs/transformers/en/model_doc/wav2vec2)
- [HuBERT](https://huggingface.co/docs/transformers/model_doc/hubert)
- [Contrastive Language-Audio Pretraining (CLAP)](https://huggingface.co/docs/transformers/en/model_doc/clap)

## Example

Example using [facebook/wav2vec2-base-960h](https://huggingface.co/facebook/wav2vec2-base-960h).

```csharp
using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;

public static class DeepLearningFingerprint
{
    private static readonly InferenceSession session = new InferenceSession("wav2vec2.onnx");

    public static float[] GenerateEmbedding(Stream audioStream)
    {
        // Convert to float tensor (e.g., 16kHz PCM mono)
        var samples = ConvertToPcm16k(audioStream);
        var tensor = new DenseTensor<float>(samples, new[] { 1, samples.Length });

        // Run ONNX model
        var inputs = new List<NamedOnnxValue>
        {
            NamedOnnxValue.CreateFromTensor("input", tensor)
        };

        using var results = session.Run(inputs);
        var embedding = results.First().AsEnumerable<float>().ToArray();

        return embedding; // vector fingerprint
    }

    private static float[] ConvertToPcm16k(Stream s)
    {
        // Use NAudio resampler to mono 16kHz
        using var reader = new WaveFileReader(s);
        using var resampler = new MediaFoundationResampler(reader, 16000);
        var floats = new List<float>();
        var buf = new float[1024];

        int read;
        while ((read = resampler.Read(buf, 0, buf.Length)) > 0)
        {
            floats.AddRange(buf.Take(read));
        }

        return floats.ToArray();
    }
}
```

## Storage / Lookup

- Embedding = 128–1024 float vector.
- **Matching:** use **cosine similarity** or **Euclidean distance**.
- **Database**: Vector DB
	- Qdrant
	- Pinecone
	- Weaviate
	- Milvus
	- FAISS
- **Query:** ANN (approximate nearest neighbor).
- **Optimal DB**: Vector DB

```csharp
using Qdrant.Client;
using Qdrant.Client.Grpc;

public class DlEmbeddingDb
{
    private readonly QdrantClient client = new("localhost", 6333);
    private const string Collection = "audio_embeddings";

    public async Task InsertAsync(string trackId, float[] embedding)
    {
        await client.UpsertAsync(Collection, new[]
        {
            new PointStruct
            {
                Id = trackId,
                Vectors = embedding.ToArray()
            }
        });
    }

    public async Task<string?> QueryAsync(float[] queryEmbedding)
    {
        var res = await client.SearchAsync(Collection, queryEmbedding, limit: 1);
        return res.FirstOrDefault()?.Id?.ToString();
    }
}
```
