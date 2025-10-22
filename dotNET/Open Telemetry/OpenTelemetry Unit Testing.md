## Capture Activities with `ActivityListener`

```csharp
using ActivityListener activityListener = new();  
activityListener.ShouldListenTo  = activitySource => true;  
activityListener.ActivityStarted = activity => logger.LogDebug("[START] {DisplayName}", activity.DisplayName);  
activityListener.ActivityStopped = activity => logger.LogDebug("[STOP]  {DisplayName} ({Duration})", activity.DisplayName, activity.Duration);  
ActivitySource.AddActivityListener(activityListener);
```

## Capture Activities

```sh
dotnet package add OpenTelemetry
dotnet package add OpenTelemetry.Exporter.InMemory
```

```csharp
var exported = new List<Activity>();
using var tracerProvider = Sdk.CreateTracerProviderBuilder()
    .AddSource("MyCompany.MyComponent")
    .AddInMemoryExporter(exported)
    .Build();

// Trace activities here

tracerProvider.ForceFlush();
```

## Capture Metrics
```sh
dotnet package add OpenTelemetry
dotnet package add OpenTelemetry.Exporter.InMemory
```

```csharp
var exported = new List<Metric>();
using var meterProvider = Sdk.CreateMeterProviderBuilder()
    .AddMeter("MyCompany.MyComponent")
    .AddInMemoryExporter(exported)
    .Build();

// capture metrics here

meterProvider.ForceFlush();

// Log or Assert list of exported metrics here
```

Log or Assert Metrics
```csharp
var metric = exported.Find(m => m.Name == name);
var points = metric.GetMetricPoints()

// read Counter data
points.TryGetSumLong(out var sum);

// read Tag value
points.TryGetTag("route", out var route);

// read Histogram data
points.TryGetHistogramSum(out var sum);
points.TryGetHistogramCount(out var count);
```

## Capture Logs

**Setup:** Create a `LoggerFactory` for use in the DI container:
```csharp
var exported = new List<LogRecord>();

using var loggerFactory = LoggerFactory.Create(builder =>
{
	builder.AddOpenTelemetry(ot =>
	{
		ot.AddInMemoryExporter(exported, opts => opts.ExportProcessorType = ExportProcessorType.Simple);
		ot.IncludeFormattedMessage = true;
		ot.ParseStateValues = true;
		ot.IncludeScopes = true;
	});
});
```

Log or Assert log records:
```csharp
foreach (var logRecord in exported)
{
	var severity = logRecord.SeverityText;
	var message = logRecord.FormattedMessage;
	foreach (var (key, val) in logRecord.Attributes)
	{
	    // ...
	}
}
```
