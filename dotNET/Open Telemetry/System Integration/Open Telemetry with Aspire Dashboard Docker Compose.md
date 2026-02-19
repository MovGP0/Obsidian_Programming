# Open Telemetry with Aspire Dashboard Docker Compose

Use this `docker-compose` setup to run:

- Keycloak (OIDC provider)
- Aspire Dashboard with OpenID Connect authentication
- Aspire MCP endpoint with API key authentication

## Docker Compose YAML

```yaml
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    container_name: keycloak
    command: ["start-dev", "--http-port=8080"]
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_ADMIN_PASSWORD:-change-me}
    ports:
      - "8080:8080"
    networks:
      - observability

  aspire-dashboard:
    image: mcr.microsoft.com/dotnet/aspire-dashboard:latest
    container_name: aspire-dashboard
    depends_on:
      - keycloak
    ports:
      - "18888:18888"
      - "4317:18889"
      - "4318:18890"
      - "18891:18891"
    environment:
      DASHBOARD__FRONTEND__AUTHMODE: OpenIdConnect
      AUTHENTICATION__SCHEMES__OPENIDCONNECT__AUTHORITY: http://keycloak:8080/realms/aspire
      AUTHENTICATION__SCHEMES__OPENIDCONNECT__CLIENTID: aspire-dashboard
      AUTHENTICATION__SCHEMES__OPENIDCONNECT__CLIENTSECRET: ${ASPIRE_DASHBOARD_CLIENT_SECRET:-replace-with-keycloak-client-secret}
      AUTHENTICATION__SCHEMES__OPENIDCONNECT__RESPONSETYPE: code
      AUTHENTICATION__SCHEMES__OPENIDCONNECT__USEPKCE: "true"
      DASHBOARD__OTLP__AUTHMODE: Unsecured
      DASHBOARD__MCP__ENDPOINTURL: http://+:18891
      DASHBOARD__MCP__AUTHMODE: ApiKey
      DASHBOARD__MCP__PRIMARYAPIKEY: ${ASPIRE_MCP_API_KEY:-aspire-local-mcp-key}
      DASHBOARD__TELEMETRYLIMITS__MAXLOGCOUNT: "1000"
      DASHBOARD__TELEMETRYLIMITS__MAXTRACECOUNT: "1000"
      DASHBOARD__TELEMETRYLIMITS__MAXMETRICSCOUNT: "1000"
    networks:
      - observability

networks:
  observability:
    name: observability-network
```

## Required Keycloak Client Setup

Create realm `aspire` and client `aspire-dashboard` in Keycloak with:

- Client authentication enabled (confidential client)
- Standard flow enabled
- Valid redirect URI: `http://localhost:18888/signin-oidc`
- Valid post logout redirect URI: `http://localhost:18888/signout-callback-oidc`
- Web origin: `http://localhost:18888`

Set `ASPIRE_DASHBOARD_CLIENT_SECRET` to the generated client secret.

## Start

```powershell
docker compose -f .\docker-compose.aspire-dashboard-keycloak-mcp.yml up -d
```
