Create a custom exporter:
```csharp
public sealed class SseExporter : BaseExporter<Activity>
{
    private readonly Uri _endpoint;
    private readonly HttpClient _client = new();

    public SseExporter(string url) => _endpoint = new Uri(url);

    public override ExportResult Export(in Batch<Activity> batch)
    {
        foreach (var activity in batch)
        {
            var json = JsonSerializer.Serialize(new {
                traceId = activity.TraceId.ToString(),
                spanId = activity.SpanId.ToString(),
                name = activity.DisplayName,
                tags = activity.Tags
            });
            var content = new StringContent($"data: {json}\n\n", System.Text.Encoding.UTF8, "text/event-stream");
            _ = _client.PostAsync(_endpoint, content);
        }
        return ExportResult.Success;
    }
}
```

Register the exporter:
```csharp
var exporter = new SseExporter("http://localhost:5001/sse/receive");

using var tracerProvider = Sdk.CreateTracerProviderBuilder()
	.AddSource(Source.Name)
	.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("EmitterApp"))
	.AddProcessor(new SimpleSpanProcessor(exporter))
	.Build();
```

Create an HTTP/SSE endpoint
```csharp
// ReceiverApp/Program.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder();
var app = builder.Build();

app.MapPost("/sse/receive", async (HttpContext ctx) =>
{
    using var doc = await JsonDocument.ParseAsync(ctx.Request.Body);
    Console.WriteLine("Span received: " + doc.RootElement.GetProperty("name").GetString());
    Console.WriteLine("  tags:");
    foreach (var tag in doc.RootElement.GetProperty("tags").EnumerateArray())
    {
        Console.WriteLine($"    {tag.GetProperty("Key").GetString()}: {tag.GetProperty("Value").GetString()}");
    }
    ctx.Response.StatusCode = 204;
});

app.Run("http://localhost:5001");
```

Create a client that registers to the SSE events:
```csharp
ActivitySource Source = new("ListenerApp");

Activity.DefaultIdFormat = ActivityIdFormat.W3C;
Activity.ForceDefaultIdFormat = true;

ActivitySource.AddActivityListener(new ActivityListener
{
	ShouldListenTo = src => src.Name == "ListenerApp",
	Sample = (ref ActivityCreationOptions<ActivityContext> _) => ActivitySamplingResult.AllDataAndRecorded,
	ActivityStopped = activity => {
		Console.WriteLine($"SpanConsumer saw: {activity.OperationName}");
		foreach (var tag in activity.Tags)
		{
			Console.WriteLine($"  {tag.Key}: {tag.Value}");
		}
	},
});

Console.WriteLine("Connecting to SSE feed...");
using var client = new HttpClient();
using var response = await client.GetAsync("http://localhost:5001/sse/receive‑stream", HttpCompletionOption.ResponseHeadersRead);
using var stream = await response.Content.ReadAsStreamAsync();

using var reader = new System.IO.StreamReader(stream);
while (!reader.EndOfStream)
{
	var line = await reader.ReadLineAsync();
	if (line != null && line.StartsWith("data: "))
	{
		var json = line.Substring(6);
		var payload = JsonDocument.Parse(json).RootElement;
		using var activity = Source.StartActivity(payload.GetProperty("name").GetString(), ActivityKind.Internal);
		activity.SetTag("received", true);
		foreach (var tag in payload.GetProperty("tags").EnumerateArray())
		{
			activity.SetTag(tag.GetProperty("Key").GetString(), tag.GetProperty("Value").GetString());
		}
		activity.Stop();
	}
}
```
