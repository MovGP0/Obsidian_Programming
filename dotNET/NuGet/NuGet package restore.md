---
title: restore NuGet packages
---
## Restore

Basic restore:

```sh
dotnet restore
```

Restore a solution:

```sh
dotnet restore MySolution.sln
```

Restore one project:

```sh
dotnet restore src/MyProject/MyProject.csproj
```

Use a specific package source:

```sh
dotnet restore --source https://api.nuget.org/v3/index.json
```

Disable implicit restore during build:

```sh
dotnet build --no-restore
dotnet test --no-restore
dotnet publish --no-restore
```

This is common in CI:

```sh
dotnet restore MySolution.sln
dotnet build MySolution.sln --configuration Release --no-restore
dotnet test MySolution.sln --configuration Release --no-build
```

NuGet needs feeds to restore dependencies, and feeds are usually supplied via `nuget.config`. Microsoft documents this for `dotnet restore`. ([Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-restore?utm_source=chatgpt.com "dotnet restore command - .NET CLI"))

## Diagnostics

### Show detailed restore logs

```sh
dotnet restore --verbosity detailed
```

Or even:

```sh
dotnet restore --verbosity diagnostic
```

### Generate MSBuild binary log

```sh
dotnet restore /bl:restore.binlog
```

Then inspect with MSBuild Structured Log Viewer.

### Common NuGet errors

|Error / symptom|Likely cause|
|---|---|
|`NU1101`|Package not found on configured feeds|
|`NU1102`|Version not found|
|`NU1605`|Package downgrade detected|
|`NU1608`|Version outside dependency constraint|
|`NU1701`|Package restored using fallback target framework|
|`NU1004`|Lock file inconsistent with project dependencies|
|Restore uses wrong feed|Missing package source mapping or polluted user-level config|
|Package exists but restore fails|Credentials, feed URL, proxy, or source mapping issue|
|Build works locally but not in CI|Missing `NuGet.config`, credentials, SDK mismatch, or uncommitted lock file|
