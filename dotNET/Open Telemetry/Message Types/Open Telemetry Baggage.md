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
