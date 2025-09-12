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
