setRegister Tracing:
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

> [!Note]
> When setting custom tags, consider using existing tags as defined in the [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/)
