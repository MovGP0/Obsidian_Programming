## Create Emitter Application

```csharp
private static readonly ActivitySource Source = new("MyCompany.Events");

using var tracerProvider = Sdk.CreateTracerProviderBuilder()
	.AddSource(Source.Name)
	.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("EmitterApp"))
	.AddOtlpExporter(opts =>
	{
		opts.Endpoint = new Uri("https://your-backend.example.com:4317");
		opts.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.Grpc;
	})
	.Build();
```

## Create Listener Application

```csharp
using var tracerProvider = Sdk.CreateTracerProviderBuilder()
		.AddSource(Source.Name)
		.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("ListenerApp"))
		.AddOtlpExporter(opts =>
		{
			opts.Endpoint = new Uri("https://your-backend.example.com:4317");
			opts.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.Grpc;
		})
		.Build();

ActivitySource.AddActivityListener(new ActivityListener
{
	ShouldListenTo = src => src.Name == Source.Name,
	Sample = (ref ActivityCreationOptions<ActivityContext> _) => ActivitySamplingResult.AllDataAndRecorded,
	ActivityStopped = activity =>
	{
		Console.WriteLine($"Span processed: {activity.DisplayName}");
		foreach (var tag in activity.Tags)
		{
			Console.WriteLine($"  {tag.Key}: {tag.Value}");
		}
	}
});
```
