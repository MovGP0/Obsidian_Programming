For applications without app builder:
```csharp
using var tracerProvider = Sdk.CreateTracerProviderBuilder()
	.AddSource("Orders")
	.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("OrderService"))
	.AddConsoleExporter()
	.Build();
```

With app builder:
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddOpenTelemetry()
        .WithTracing(builder => builder
        	.AddGrpcClientInstrumentation(opt => { /**/ })
			.AddHttpClientInstrumentation(opt => { /**/ })
			.AddSqlClientInstrumentation(opt => { /**/ })
            .AddAspNetCoreInstrumentation(opt => { /**/ })
            .AddConsoleExporter(opt => { /**/ }))  
        .WithMetrics(builder => builder
            .AddAspNetCoreInstrumentation(opt => { /**/ })
            .AddHttpClientInstrumentation(opt => { /**/ })
            .AddConsoleExporter(opt => { /**/ }));
}
```

Instantiate the providers to ensure they are created
```cs
var loggerProvider = Locator.Current.GetService<LoggerProvider>();  
var tracerProvider = Locator.Current.GetService<TracerProvider>();  
var meterProvider = Locator.Current.GetService<MeterProvider>();
```

### Environment Variables

Those variables are used for configuring the Open Telemetry endpoint when using `.AddOtelExporter()`

| Environment Variable                  | Example                            | Description                                |
| ------------------------------------- | ---------------------------------- | ------------------------------------------ |
| `OTEL_EXPORTER_OTLP_ENDPOINT`         | `http://localhost:4317/`           | Base address of the OpenTelemetry Endpoint |
| `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` | `http://localhost:4317/v1/metrics` | Metrics Endpoint                           |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`  | `http://localhost:4317/v1/traces`  | Traces Endpoint                            |
| `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`    | `http://localhost:4317/v1/logs`    | Logs Endpoint                              |
| `OTEL_EXPORTER_OTLP_PROTOCOL`         | `http/protobuf`                    | use gRPC / Protobuf transport              |
| `OTEL_METRIC_EXPORT_INTERVAL`         | `10000`                            | export metrics all n milli-seconds         |
| `OTEL_EXPORTER_OTLP_HEADERS`          | `x-otlp-api-key=MY_APIKEY`         | Additional HTTP headers for authentication |
