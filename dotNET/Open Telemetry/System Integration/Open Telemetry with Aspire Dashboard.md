Run the dashboard without authentication (DEV environment)
```sh
docker run -p 18888:18888 -p 4317:18889 --rm -it -d `
    --name aspire-dashboard mcr.microsoft.com/dotnet/aspire-dashboard:latest `
    -e DOTNET_DASHBOARD_UNSECURED_ALLOW_ANONYMOUS="true"
```

| Port  | Service              |
| ----- | -------------------- |
| 4317  | OTLP gRPC receiver   |
| 18888 | Aspire Dashboard GUI |
