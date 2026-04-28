---
title: generate Software-Bill-Of-Materials (SBOM)
---
The [SBOM Tool](https://github.com/microsoft/sbom-tool) generates a [SPDX 2.2](https://spdx.org/rdf/spdx-terms-v2.2/) compatible SBOM file for the NuGet package:

Install the tool:
```
winget install Microsoft.SbomTool
dotnet tool install --global Microsoft.Sbom.DotNetTool
```

Add the build target:
```powershell
dotnet package add Microsoft.Sbom.Targets
```
```xml
<ItemGroup>
	<PackageReference Include="Microsoft.Sbom.Targets" Version="3.0.0">
		<PrivateAssets>all</PrivateAssets>
		<IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
	</PackageReference>
</ItemGroup>
```

Enable the generation of the BOM:
```xml
<PropertyGroup>
	<GenerateSBOM>true</GenerateSBOM>
</PropertyGroup>
```
