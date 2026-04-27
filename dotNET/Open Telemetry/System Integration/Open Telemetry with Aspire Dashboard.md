
Start the OpenTelemetry logging dashboard container with the following command:
```powershell
docker rm -f aspire-dashboard;
docker run `
    -p 18888:18888 `
    -p 4317:18889 `
    -p 4318:18890 `
    -p 18891:18891 `
    -it -d `
    --name aspire-dashboard `
    -e DASHBOARD__OTLP__AUTHMODE=ApiKey `
    -e DASHBOARD__TELEMETRYLIMITS__MAXLOGCOUNT='1000' `
    -e DASHBOARD__TELEMETRYLIMITS__MAXTRACECOUNT='1000' `
    -e DASHBOARD__TELEMETRYLIMITS__MAXMETRICSCOUNT='1000' `

    # Enable MCP Endpoint
    -e ASPIRE_DASHBOARD_MCP_ENDPOINT_URL="http://0.0.0.0:18891" `
    -e ASPIRE_DASHBOARD_UNSECURED_ALLOW_ANONYMOUS=true `

    # Enable API for Aspire CLI
    -e DASHBOARD__API__ENABLED=true `
    -e DASHBOARD__API__AUTHMODE=Unsecured `
    mcr.microsoft.com/dotnet/aspire-dashboard:latest;
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

#### Aspire CLI Configuration  
  
Install the Aspire CLI  
```powershell  
irm https://aspire.dev/install.ps1 | iex  
```  

> [!important]  
> This requires Aspire CLI 13.3.0 or later.  
> For a newer version of the Aspire CLI, you can specify the quality channel to install from:  
> ```powershell  
> iex "& { $(irm https://aspire.dev/install.ps1) } -Quality dev"  
> iex "& { $(irm https://aspire.dev/install.ps1) } -Quality staging"  
> ```

Analyze Open Telemetry (OTEL) data with the Aspire CLI:  
```powershell  
aspire otel traces --dashboard-url http://localhost:18888  
aspire otel spans --dashboard-url http://localhost:18888  
aspire otel logs --dashboard-url http://localhost:18888  
```

## Troubleshooting

- **Ports already in use:** Change host ports in the -p mappings, e.g., `-p 18888:18888` to -p `28888:18888` and update your URLs accordingly.
- **No login token visible:** Ensure the container is running (`docker ps`) and re-check logs with docker logs aspire-dashboard --since 1h.
- **Telemetry not appearing:** Confirm environment variables are set in the same context where your app runs (CI agent, service wrapper, or IDE run configuration). Ensure protocol is http/protobuf and endpoint paths match.
- **Firewall/Proxy:** Allow outbound connections to localhost ports `4318/18888` (and `18891` for MCP). Corporate proxies may require additional configuration.
```powershell
# install utilities
winget install curl
winget install grpcurl

# Test network connectivity
Test-NetConnection localhost -Port 18888 # UI
Test-NetConnection localhost -Port 4317 # OTLP/gRPC
Test-NetConnection localhost -Port 4318 # OTLP/HTTP
Test-NetConnection localhost -Port 18891 # MCP

# Test HTTP connection to UI-Endpoint
curl.exe -I http://localhost:18888

# Test listening endpoints
curl.exe -i -X POST http://localhost:4318/v1/traces
curl.exe -i -X POST http://localhost:4318/v1/metrics
curl.exe -i -X POST http://localhost:4318/v1/logs

# Test OTLP/gRPC endpoint
grpcurl -plaintext localhost:4317 list
```
> [!info]
> When Aspire is installed on an remote server, replace `localhost` with the server name. 
## See also

- [Aspire Dashboard configuration](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/dashboard/configuration)
