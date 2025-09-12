Spans can be used for representing a hierarchical relationship between traces.

```json
{
  "name": "/v1/sys/health",
  "context": {
    "trace_id": "7bba9f33312b3dbb8b2c2c62bb7abe2d",
    "span_id": "086e83747d0e381e"
  },
  "parent_id": "",
  "start_time": "2021-10-22 16:04:01.209458162 +0000 UTC",
  "end_time": "2021-10-22 16:04:01.209514132 +0000 UTC",
  "status_code": "STATUS_CODE_OK",
  "status_message": "",
  "attributes": {
    "net.transport": "IP.TCP",
    "net.peer.ip": "172.17.0.1",
    "net.peer.port": "51820",
    "net.host.ip": "10.177.2.152",
    "net.host.port": "26040",
    "http.method": "GET",
    "http.target": "/v1/sys/health",
    "http.server_name": "mortar-gateway",
    "http.route": "/v1/sys/health",
    "http.user_agent": "Consul Health Check",
    "http.scheme": "http",
    "http.host": "10.177.2.152:26040",
    "http.flavor": "1.1"
  },
  "events": [
    {
      "name": "",
      "message": "OK",
      "timestamp": "2021-10-22 16:04:01.209512872 +0000 UTC"
    }
  ]
}
```

| Property                    | Description                                                    |
| --------------------------- | -------------------------------------------------------------- |
| `parent_id`                 | The ID of the parent span/trace (empty for root spans)         |
| `name`                      | The name of the event                                          |
| `context.trace_id`          | The Trace ID representing the trace that the span is a part of |
| `context.span_id`           | The span’s Span ID                                             |
| `start_time` and `end_time` | Start and End Timestamps                                       |
| `attributes`                | Custom attributes                                              |

## Create a Span

Automatic spans:
```cs
// Root span (no parent in context)
using var root = MySource.StartActivity("JobRun", ActivityKind.Internal);

// Child span (started while 'root' is current)
using var child = MySource.StartActivity("DoWork", ActivityKind.Internal);
```

Create a span using an `ActivityContext`
```cs
// Define your ActivitySource once per component
var activitySource = new ActivitySource("ExampleService");

// Imagine we received a remote parent context (from headers)
ActivityContext remoteContext = ActivityContext.Parse(
    "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01", // traceparent
    null); // tracestate, optional

// Start a child Activity with that parent
using var span = activitySource.StartActivity(
    "ProcessRequest",
    ActivityKind.Server,
    remoteContext);
```

Create a span using `ActivityCreationOptions`
```cs
using var child = activitySource.StartActivity(
    "ChildOperation",
    ActivityKind.Internal,
    parentContext: parentActivity.Context);  // explicit parent
```

**Alternative:** Use links to other activities instead of strict parenting
```cs
var links = new[]
{
    new ActivityLink(parentActivity1.Context),
    new ActivityLink(parentActivity2.Context)
};

using var aggregate = activitySource.StartActivity(
    "ProcessBatch",
    ActivityKind.Consumer,
    default,
    links: links);
```
