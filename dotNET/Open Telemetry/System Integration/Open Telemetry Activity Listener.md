For receiving and processing of OpenTelemetry Activities

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
