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
