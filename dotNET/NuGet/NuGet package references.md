---
title: <PackageReference> vs. packages.config
---
Modern projects use `PackageReference`:

```xml
<PackageReference Include="Dapper" Version="2.1.66" />
```

Older .NET Framework projects may still use `packages.config`:

```xml
<packages>
  <package id="Dapper" version="2.1.66" targetFramework="net472" />
</packages>
```

|Area|`PackageReference`|`packages.config`|
|---|---|---|
|Modern SDK-style projects|Yes|No|
|Transitive dependencies|Yes|Dependencies are often explicit in config|
|Central Package Management|Yes|No, not normally|
|Lock files|Supported|Different behavior / legacy constraints|
|Restore style|Integrated with MSBuild|Legacy NuGet restore flow|

For new work, prefer `PackageReference`.
