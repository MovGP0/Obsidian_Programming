---
title: package source mapping
---
If you use both public and private feeds, package source mapping is highly recommended. It tells NuGet exactly which package IDs may come from which feed.

**Example**

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="company" value="https://pkgs.dev.azure.com/example/_packaging/company/nuget/v3/index.json" />
  </packageSources>

  <packageSourceMapping>
    <packageSource key="nuget.org">
      <package pattern="Microsoft.*" />
      <package pattern="System.*" />
      <package pattern="Newtonsoft.Json" />
      <package pattern="Serilog.*" />
    </packageSource>

    <packageSource key="company">
      <package pattern="Company.*" />
    </packageSource>
  </packageSourceMapping>
</configuration>
```

This reduces ambiguity and helps prevent restoring an internal package name from a public source. Microsoft documents that package source mappings are declared in `nuget.config`, after package source declarations, with one `packageSource` mapping per source. ([Microsoft Learn](https://learn.microsoft.com/en-us/nuget/consume-packages/package-source-mapping?utm_source=chatgpt.com "Package Source Mapping"))
