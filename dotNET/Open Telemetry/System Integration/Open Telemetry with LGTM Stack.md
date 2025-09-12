- Open Telemetry Collector
- Prometheus Metrics Database
- Tempo Traces Database
- Loki Logs Database
- Grafana for Visualization

Predefined Docker image
- https://hub.docker.com/r/grafana/otel-lgtm

Run Telemetry Collector only:
```sh
docker pull otel/opentelemetry-collector-contrib
docker run -p 3000:3000 -p 4317:4317 -p 4318:4318 --rm -ti otel/opentelemetry-collector-contrib
```

Run Open Telemetry LGTM Stack
```sh
docker pull grafana/otel-lgtm
docker run -p 3000:3000 -p 4317:4317 -p 4318:4318 --rm -ti grafana/otel-lgtm
```

|  Port | Service                                     |
| -----:| ------------------------------------------- |
|  1888 | pprof extension (internal Profiling)        |
|  3000 | Grafana Dashboard                           |
|  8888 | Prometheus metrics exposed by the Collector |
|  8889 | Prometheus exporter metrics                 |
|  4317 | OTLP gRPC receiver                          |
|  4318 | OTLP HTTP receiver                          |
| 13133 | health_check extension                      |
| 55679 | zPages extension                            |

### zPages

| Endpoint                                | Description                                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| http://localhost:55679/debug/servicez   | **ServiceZ** gives an overview of the collector services                                        |
| http://localhost:55679/debug/pipelinez  | **PipelineZ** brings insight on the running pipelines running in the collector                  |
| http://localhost:55679/debug/extensionz | **ExtensionZ** shows the extensions that are active in the collector.                           |
| http://localhost:55679/debug/featurez   | **FeatureZ** lists the feature gates available along with their current status and description. |
| http://localhost:55679/debug/tracez     | **TraceZ** allows examination and bucketizing of spans by latency buckets.                      |
| http://localhost:55679/debug/expvarz    | **ExpvarZ** exposes the useful information about Go runtime, OTel components could leverage.    |
