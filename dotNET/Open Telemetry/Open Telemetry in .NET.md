```sh
dotnet add package OpenTelemetry.Api
dotnet add package OpenTelemetry.Exporter.Console
dotnet add package OpenTelemetry.Extensions.Hosting
dotnet add package OpenTelemetry.Instrumentation.AspNetCore
```

```csharp
using Microsoft.Extensions.DependencyInjection;
using OpenTelemetry;
using OpenTelemetry.Trace;
using OpenTelemetry.Instrumentation.GrpcNetClient;
```

## Event Types

| Type                                                               | Description                                                              |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [Traces](https://opentelemetry.io/docs/concepts/signals/traces/)   | The path of a request through your application                           |
| [Metrics](https://opentelemetry.io/docs/concepts/signals/metrics/) | A measurement captured at runtime<br>- Counter<br>- Gauge<br>- Histogram |
| [Logs](https://opentelemetry.io/docs/concepts/signals/logs/)       | A recording of an event                                                  |
| [Baggage](https://opentelemetry.io/docs/concepts/signals/baggage/) | Propagation of context information across service boundaries             |

## Setup OpenTelemetry Tracing

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

## OpenTelemetry Tracing

Register Tracing:
```csharp
builder.Services.AddOpenTelemetryTracing(b =>
{
    b.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("OrderService"))
    .AddSource("OrderActivitySource")
    .AddAspNetCoreInstrumentation()
    .AddHttpClientInstrumentation()
    .AddOtlpExporter();
});
```

Emit Traces:
```csharp
private static readonly ActivitySource OrderActivitySource = new ActivitySource("OrderActivitySource");
```

```csharp
using var activity = OrderActivitySource.StartActivity("ProcessOrder", ActivityKind.Internal);
activity.SetTag("order.id", orderId);
try
{
    activity.AddEvent(new ActivityEvent("OrderProcessingEvent"));
    // process order
    activity.AddEvent(new ActivityEvent("OrderProcessedEvent"));
}
catch (Exception ex)
{
    activity.SetStatus(ActivityStatusCode.Error, ex.Message);
    throw;
}
```

## OpenTelemetry Metrics

Register metrics:
```csharp
builder.Services.AddOpenTelemetryMetrics(m =>
{
  m.SetResourceBuilder(resource)
   .AddMeter("OrderMetrics")
   .AddPrometheusExporter();
});
```

Emit Metrics:
```csharp
var meter = new Meter("OrderMetrics", "1.0");
var orderCounter = meter.CreateCounter<long>("orders.count");
var orderLatency = meter.CreateHistogram<double>("orders.latency.ms");

orderCounter.Add(1, new KeyValuePair<string, object>("status", "created"));
orderLatency.Record(latencyMs, new KeyValuePair<string, object>("order.type", type));
```

## OpenTelemetry Logging

Register OpenTelemetry for logging:
```csharp
builder.Services.AddOpenTelemetry(); // includes logs, traces, metrics
```

Logging is done via the `ILogger` interface:

```csharp
logger.LogInformation("Order {OrderId} processed in {Duration}ms", orderId, durationMs);
```

## OpenTelemetry Baggage

```csharp
// set baggage
Baggage.Current.SetBaggage("clientId", clientId);

// within an Activity-based operation:
using var activity = MyActivitySource.StartActivity("HandleRequest", ActivityKind.Server);

// optionally copy baggage into span attributes:
activity.SetTag("clientId", Baggage.Current.GetBaggage("clientId"));

// when making HTTP call
Propagator.Inject(new PropagationContext(activity.Context, Baggage.Current), headers, InjectIntoHeaders);
```

Receive Baggage
```csharp
var ctx = Propagator.Extract(default, incomingHeaders, ExtractFromHeader);
using var activity = MyActivitySource.StartActivity("CallServiceB", ActivityKind.Client, ctx.ActivityContext);
```

- Baggage is propagated via HTTP headers across services when the propagator is in place
- It’s a key‑value context store separate from span attributes and must be explicitly copied if desired

## Receive and Process OpenTelemetry Activities

```csharp
Activity.DefaultIdFormat = ActivityIdFormat.W3C;
Activity.ForceDefaultIdFormat = true;

ActivitySource.AddActivityListener(new ActivityListener
{
	ShouldListenTo = source => source.Name == "MyCompany.Events",
	Sample = (ref ActivityCreationOptions<ActivityContext> opts) => ActivitySamplingResult.AllDataAndRecorded,
	ActivityStarted = activity => { },
	ActivityStopped = activity =>
	{
		Console.WriteLine($"Activity received: {activity.OperationName}");
		foreach (var tag in activity.Tags)
		{
			Console.WriteLine($"  {tag.Key}: {tag.Value}");
		}
	}
});
```

## Example

```csharp
services.AddOpenTelemetry()  
    .ConfigureResource(rb =>  
    {  
        rb.AddService(  
            serviceName: "Some.App.Name",
            serviceVersion: "1.0.0");  
  
        if (Debugger.IsAttached)  
        {
	        rb.AddTelemetrySdk();  
        }
    })
    .WithLogging(l =>  
    {  
        l.AddOtlpExporter();  
    })
    .WithMetrics(mb =>  
    {  
        // mb.AddMeter("MyMeter");  
        mb.AddRuntimeInstrumentation();  
        mb.AddProcessInstrumentation();  
        mb.AddOtlpExporter();  
    })
    .WithTracing(tb =>  
    {  
        if (Debugger.IsAttached)  
        {
	        tb.SetSampler(new AlwaysOnSampler());  
        }  
        // tb.AddSource("MySource");
        tb.AddOtlpExporter();  
    }) ;
```

## References

- [The OpenTelemetry .NET Client](https://github.com/open-telemetry/opentelemetry-dotnet)
