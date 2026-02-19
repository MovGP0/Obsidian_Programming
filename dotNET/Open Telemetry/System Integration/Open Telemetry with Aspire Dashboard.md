
Start the OpenTelemetry logging dashboard container with the following command:
```powershell
docker run `
    -p 18888:18888 `
    -p 4317:18889 `
    -p 4318:18890 `
    -p 18891:18891 `
    -it -d `
    --name aspire-dashboard mcr.microsoft.com/dotnet/aspire-dashboard:latest `
    -e DASHBOARD__OTLP__AUTHMODE=None `
    -e DASHBOARD__TELEMETRYLIMITS__MAXLOGCOUNT='1000' `
    -e DASHBOARD__TELEMETRYLIMITS__MAXTRACECOUNT='1000' `
    -e DASHBOARD__TELEMETRYLIMITS__MAXMETRICSCOUNT='1000' `
    -e ASPIRE_DASHBOARD_MCP_ENDPOINT_URL="http://0.0.0.0:18891" `
    -e ASPIRE_DASHBOARD_UNSECURED_ALLOW_ANONYMOUS=true;
```
> [!important]
> You will get a login token in the container logs. You need it to login into the dashboard at http://localhost:18888

> [!note]
> Port 18888 is the UI
> Port 18889 is used for OTLP gRPC (grpc)
> Port 18890 for OTLP HTTP (http/protobuf)
> Port 18891 is for MCP

Set the following environment variables in the startup configuration:
```ini
OTEL_EXPORTER_OTLP_ENDPOINT = "http://localhost:4318/"
OTEL_EXPORTER_OTLP_METRICS_ENDPOINT = "http://localhost:4318/v1/metrics"
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = "http://localhost:4318/v1/traces"
OTEL_EXPORTER_OTLP_LOGS_ENDPOINT = "http://localhost:4318/v1/logs"
OTEL_EXPORTER_OTLP_PROTOCOL = "http/protobuf"
OTEL_METRIC_EXPORT_INTERVAL = 10000
```

#### MCP Configuration

```powershell
setx ASPIRE_MCP_API_KEY "paste-the-key-from-the-dashboard-mcp-dialog"
```

**config.toml**
```toml
[mcp_servers.aspire_dashboard]
url = "http://localhost:18891/mcp"
env_http_headers = { "x-mcp-api-key" = "ASPIRE_MCP_API_KEY" }
startup_timeout_sec = 20
tool_timeout_sec = 60
```

#### See also

- [Aspire Dashboard configuration](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/dashboard/configuration)
