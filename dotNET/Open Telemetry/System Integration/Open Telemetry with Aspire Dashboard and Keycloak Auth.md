### Keycloak Server Setup (Docker)

Run Keycloak in development mode:

```powershell
docker rm -f keycloak
docker run --name keycloak`
    -p 8080:8080`
    -e KEYCLOAK_ADMIN=admin`
    -e KEYCLOAK_ADMIN_PASSWORD='************'`
    quay.io/keycloak/keycloak:latest start-dev
```

Open Keycloak admin UI:

- URL: http://localhost:8080
- Admin user: Admin
- Admin password: `************`

Create a realm and dashboard client:

1. Create realm `Aspire`.
2. Create client `Aspire-dashboard`.
3. Client type/access type: **Confidential**.
4. Enable **Standard flow**.
5. Set valid redirect URI: http://localhost:18888/signin-oidc.
6. Set valid post logout redirect URI: http://localhost:18888/signout-callback-oidc.
7. Set web origins: http://localhost:18888.
8. Copy the generated client secret.

> [!note]
> If Aspire Dashboard runs in Docker and Keycloak runs on the host machine,
> use http://host.docker.internal:8080/realms/aspire as OIDC authority.
> If both run on the same Docker network, use the Keycloak container DNS name instead.

### Run Aspire Dashboard (Docker) with Keycloak Auth

If you already have an old container, recreate it:

```powershell
docker rm -f aspire-dashboard
```

Start the OpenTelemetry dashboard container:

```powershell
docker run`
  --name aspire-dashboard `
  -p 18888:18888 `
  -p 4317:18889 `
  -p 4318:18890 `
  -e DASHBOARD__FRONTEND__AUTHMODE=OpenIdConnect `
  -e AUTHENTICATION__SCHEMES__OPENIDCONNECT__AUTHORITY=http://host.docker.internal:8080/realms/aspire `
  -e AUTHENTICATION__SCHEMES__OPENIDCONNECT__CLIENTID=aspire-dashboard `
  -e AUTHENTICATION__SCHEMES__OPENIDCONNECT__CLIENTSECRET=REPLACE_WITH_KEYCLOAK_CLIENT_SECRET `
  -e AUTHENTICATION__SCHEMES__OPENIDCONNECT__RESPONSETYPE=code `
  -e AUTHENTICATION__SCHEMES__OPENIDCONNECT__USEPKCE=true `
  -e DASHBOARD__OTLP__AUTHMODE=Unsecured `
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

> [!note]
> For current Aspire versions, `DASHBOARD__OTLP__AUTHMODE=None` is invalid. Use `Unsecured` or `ApiKey`.

Verify login flow:

- Open `http://localhost:18888`.
- You should be redirected to Keycloak login.
- After successful login, you should be redirected back to the dashboard.

If you run the dashboard behind a reverse proxy that terminates TLS, set:

```powershell
-e ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
```

You can get dashboard startup details from logs:

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

### References

- https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/dashboard/configuration
- https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/dashboard/configure
- https://learn.microsoft.com/en-us/dotnet/aspire/whats-new/dotnet-aspire-9
- https://devblogs.microsoft.com/dotnet/announcing-dotnet-aspire-9/
