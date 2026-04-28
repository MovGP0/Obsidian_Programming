---
title: version ranges
---
Exact version:

```xml
<PackageReference Include="Example.Package" Version="1.2.3" />
```

Minimum version:

```xml
<PackageReference Include="Example.Package" Version="1.2.3" />
```

In NuGet’s normal semantics, this means “at least 1.2.3”, not necessarily exactly 1.2.3, although lock files can pin the resolved graph.

Version range examples:

```xml
<PackageReference Include="Example.Package" Version="[1.2.3]" />
<PackageReference Include="Example.Package" Version="[1.2.3,2.0.0)" />
<PackageReference Include="Example.Package" Version="1.*" />
```

Meaning:

|Version syntax|Meaning|
|---|---|
|`[1.2.3]`|Exactly `1.2.3`|
|`[1.2.3,2.0.0)`|`>= 1.2.3` and `< 2.0.0`|
|`1.*`|Floating latest matching `1.x`|

Floating versions can be useful for internal packages, but they are poor default choices for stable application builds unless paired with lock files. Microsoft explicitly recommends lock files when using floating versions to ensure repeatability. ([Microsoft Learn](https://learn.microsoft.com/en-us/nuget/concepts/dependency-resolution?utm_source=chatgpt.com "NuGet Package Dependency Resolution"))
