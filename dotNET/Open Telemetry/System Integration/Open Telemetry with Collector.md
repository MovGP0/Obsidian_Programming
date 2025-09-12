## Create a Collector using Docker

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: "0.0.0.0:4317"
      http:
        endpoint: "0.0.0.0:4318"
exporters:
  logging:
    logLevel: debug
service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [logging]
```

Start the container:
```sh
docker run -v $(pwd)/config.yaml:/etc/otelcol/config.yaml \
  -p 4317:4317 -p 4318:4318 \
  otel/opentelemetry-collector-contrib
```

## Connect to the collector

```csharp
private static readonly ActivitySource Source = new("MyCompany.Events");

using var tracerProvider = Sdk.CreateTracerProviderBuilder()
	.AddSource(Source.Name)
	.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("EmitterApp"))
	.AddOtlpExporter(opts => {
		// choose HTTP or gRPC
		opts.Endpoint = new Uri("http://localhost:4318"); // HTTP
		// opts.Endpoint = new Uri("http://localhost:4317"); // gRPC
		// optionally for HTTP: opts.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.HttpProtobuf;
	})
	.Build();
```

- HTTP default endpoint is `http://localhost:4318/v1/traces`
- gRPC default endpoint is `http://localhost:4317`

## Pull Events from the Collector

```csharp
private static readonly ActivitySource Source = new("ListenerApp");

using var tracerProvider = Sdk.CreateTracerProviderBuilder()
            .AddSource(Source.Name)
            .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("ListenerApp"))
            .AddOtlpExporter(opts =>
            {
                opts.Endpoint = new Uri("http://localhost:4318");  // same collector
                // opts.Endpoint = new Uri("http://localhost:4317"); // or gRPC
                opts.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.HttpProtobuf;
            })
            .Build();

ActivitySource.AddActivityListener(new ActivityListener
{
	ShouldListenTo = src => src.Name == Source.Name,
	Sample = (ref ActivityCreationOptions<ActivityContext> _) => ActivitySamplingResult.AllDataAndRecorded,
	ActivityStopped = activity =>
	{
		Console.WriteLine($"Listener received: {activity.DisplayName}");
		foreach (var tag in activity.Tags)
		{
			Console.WriteLine($"  {tag.Key}: {tag.Value}");
		}
	}
});
```
