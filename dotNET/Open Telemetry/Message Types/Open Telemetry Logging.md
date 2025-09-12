Register OpenTelemetry for logging:
```csharp
builder.Services.AddOpenTelemetry(); // includes logs, traces, metrics
```

Logging is done via the `ILogger` interface:

```csharp
logger.LogInformation("Order {OrderId} processed in {Duration}ms", orderId, durationMs);
```
