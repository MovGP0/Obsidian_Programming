---
title: Central Package Management (Directory.Packages.props)
---
For larger solutions, use Central Package Management with `Directory.Packages.props`.

**Example**

```xml
<Project>
  <ItemGroup>
    <PackageVersion Include="Newtonsoft.Json" Version="13.0.3" />
    <PackageVersion Include="Serilog" Version="4.2.0" />
  </ItemGroup>
</Project>
```

Then in `.csproj`:

```xml
<ItemGroup>
  <PackageReference Include="Newtonsoft.Json" />
  <PackageReference Include="Serilog" />
</ItemGroup>
```

This avoids version drift across projects.

You usually also add this to `Directory.Build.props` or directly to project files:

```xml
<PropertyGroup>
  <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
</PropertyGroup>
```

For a multi-project solution, this is usually cleaner than repeating versions in every `.csproj`.

## See also

- [[Central Package Management]]
