### Run Aspire Dashboard (Docker) with MCP

If you already have an old container, recreate it:

```powershell
docker rm -f aspire-dashboard
```

Start the OpenTelemetry + MCP dashboard container:

```powershell
docker run`
  --name aspire-dashboard `
  -p 18888:18888 `
  -p 4317:18889 `
  -p 4318:18890 `
  -p 18891:18891 `
  -e DASHBOARD__OTLP__AUTHMODE=Unsecured `
  -e DASHBOARD__MCP__ENDPOINTURL=http://+:18891 `
  -e DASHBOARD__MCP__AUTHMODE=ApiKey `
  -e DASHBOARD__MCP__PRIMARYAPIKEY=aspire-local-mcp-key `
  -e DASHBOARD__TELEMETRYLIMITS__MAXLOGCOUNT=1000 `
  -e DASHBOARD__TELEMETRYLIMITS__MAXTRACECOUNT=1000 `
  -e DASHBOARD__TELEMETRYLIMITS__MAXMETRICSCOUNT=1000 `
  mcr.microsoft.com/dotnet/aspire-dashboard:latest
```

> [!important]
> Put all `-e` flags before the image name (`mcr.microsoft.com/...`).  
> If `-e` is placed after the image, Docker treats it as container args and ignores your env vars.

> [!note]
> Port mapping:
> `18888` UI
> `18889` OTLP gRPC
> `18890` OTLP HTTP
> `18891` MCP.

> [!note]
> For current Aspire versions, `DASHBOARD__OTLP__AUTHMODE=None` is invalid. Use `Unsecured` or `ApiKey`.

You can get the dashboard login link/token from logs:

```powershell
docker logs aspire-dashboard --tail 100
```

### App OTLP Exporter Configuration

```ini
OTEL_EXPORTER_OTLP_ENDPOINT = "http://localhost:4318/"
OTEL_EXPORTER_OTLP_METRICS_ENDPOINT = "http://localhost:4318/v1/metrics"
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = "http://localhost:4318/v1/traces"
OTEL_EXPORTER_OTLP_LOGS_ENDPOINT = "http://localhost:4318/v1/logs"
OTEL_EXPORTER_OTLP_PROTOCOL = "http/protobuf"
OTEL_METRIC_EXPORT_INTERVAL = 10000
```

### MCP Client Configuration (Codex)

Set an environment variable with your API key:

```powershell
setx ASPIRE_MCP_API_KEY "aspire-local-mcp-key"
```

`config.toml`:

```toml
[mcp_servers.aspire_dashboard]
url = "http://localhost:18891/mcp"
http_headers = { "x-mcp-api-key" = "${ASPIRE_MCP_API_KEY}" }
startup_timeout_sec = 20
tool_timeout_sec = 60
```

### MCP Endpoint Test

Create `mcp-init.json`:

```json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"manual-test","version":"1.0"}}}
```

Test without API key (expected `401 Unauthorized`):

```powershell
curl.exe -i -X POST http://localhost:18891/mcp `
  -H "Content-Type: application/json" `
  -H "Accept: application/json, text/event-stream" `
  --data-binary "@mcp-init.json"
```

Test with API key (expected `200 OK`, `Content-Type: text/event-stream`, `Mcp-Session-Id` header):

```powershell
curl.exe -i -X POST http://localhost:18891/mcp `
  -H "Content-Type: application/json" `
  -H "Accept: application/json, text/event-stream" `
  -H "x-mcp-api-key: aspire-local-mcp-key" `
  --data-binary "@mcp-init.json"
```

MCP-native tool listing test:

```powershell
npx -y @modelcontextprotocol/inspector `
  --cli http://localhost:18891/mcp `
  --transport http `
  --header "x-mcp-api-key: aspire-local-mcp-key" `
  --method tools/list
```

Expected result: JSON with tools like `list_traces`, `list_trace_structured_logs`, `list_structured_logs`.

### References

- https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/dashboard/configuration
- https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/dashboard/configure
- https://learn.microsoft.com/en-us/dotnet/aspire/whats-new/dotnet-aspire-9
- https://devblogs.microsoft.com/dotnet/announcing-dotnet-aspire-9/
