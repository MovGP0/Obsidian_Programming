Get detailed information for NuGet package using https://nuget.info
```
https://nuget.info/packages/Newtonsoft.Json/12.0.0
```

You can also use the [NuGetPackageExplorer](https://github.com/NuGetPackageExplorer/NuGetPackageExplorer).

## Project Files

Modify `*.csproj` file for NuGet support

```xml
<PropertyGroup Label="NuGet">  
  <Authors>Foo Bar</Authors>
  <Copyright>Copyright 2024</Copyright>
  <Description>Helper classes</Description>
  <IsPackable>true</IsPackable>
  <PackageId>Package.Name</PackageId>
  <PackageProjectUrl>http://foo.com/package.name</PackageProjectUrl>
  <PackageTags>utils</PackageTags>
  <RepositoryType>git</RepositoryType>
  <RepositoryUrl>http://foo.com/package.name.git</RepositoryUrl>
  <SymbolPackageFormat>snupkg</SymbolPackageFormat>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
  <IncludeSymbols>true</IncludeSymbols>
</PropertyGroup>
```

## Source Link

To enable [SourceLink](https://github.com/dotnet/sourcelink), additional packages are required:

```xml
  <ItemGroup>
    <SourceLinkAzureDevOpsServerGitHost Include="my.devops.com:8080" />
  </ItemGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.SourceLink.AzureDevOpsServer.Git" Version="8.0.0" PrivateAssets="All" />
  </ItemGroup>
```

Instead of `RepositoryUrl` we can use `PublishRepositoryUrl` to create the URL automatically on build:

```xml
<PublishRepositoryUrl>true</PublishRepositoryUrl>
```

## Generate Software-Bill-Of-Materials (SBOM)

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

## Publish Package

```powershell
dotnet pack --configuration 'Release'
dotnet nuget push 'bin/Release/MyLibrary.1.0.0.nupkg' --api-key 'APIKEY' --source 'https://api.nuget.org/v3/index.json'
```

## See also

- [[Central Package Management]]

## Weblinks

- [NuGet.org](https://www.nuget.org/)
- [NuGet.info](https://nuget.info)
- [Deps.dev](https://deps.dev/)
- [NuGetPackageExplorer](https://github.com/NuGetPackageExplorer/NuGetPackageExplorer)
- [Software Bill Of Materials (SBOM) Tool](https://github.com/microsoft/sbom-tool)
