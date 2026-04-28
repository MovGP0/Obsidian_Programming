---
title: NuGet.config
---
`NuGet.config` controls package sources, credentials, package source mappings, fallback folders, cache behavior, and other NuGet settings.

A simple repository-level `NuGet.config`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
  </packageSources>
</configuration>
```

The `<clear />` is important in reproducible builds because it prevents user-level or machine-level feeds from silently participating.

A private feed example:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="company" value="https://pkgs.dev.azure.com/example/_packaging/company/nuget/v3/index.json" />
  </packageSources>
</configuration>
```

You can add a source from the CLI:

```sh
dotnet nuget add source "https://example.com/nuget/v3/index.json" \
  --name company
```

Microsoft warns that using multiple package sources can introduce dependency-confusion risk. ([Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-add-source?utm_source=chatgpt.com "dotnet nuget add source command - .NET CLI"))
