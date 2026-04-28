---
title: create a custom NuGet package
---
A minimal `.csproj` package setup:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup Label="NuGet">
    <Authors>Foo Bar</Authors>
    <Copyright>Copyright 2024</Copyright>
    <IsPackable>true</IsPackable>
    <TargetFramework>net8.0</TargetFramework>
    <PackageId>Company.PackageName</PackageId>
    <Version>1.0.0</Version>
    <Authors>Company</Authors>
    <Description>Helper classes</Description>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
    <PackageTags>utils</PackageTags>
    <RepositoryType>git</RepositoryType>
    <RepositoryUrl>http://foo.com/package.name.git</RepositoryUrl>
    <PackageProjectUrl>http://foo.com/package.name</PackageProjectUrl>
    <SymbolPackageFormat>snupkg</SymbolPackageFormat>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
    <IncludeSymbols>true</IncludeSymbols>
  </PropertyGroup>
</Project>
```

Create the package:

```sh
dotnet pack --configuration Release
```

Output usually lands in:

```text
bin/Release/Company.MyLibrary.1.0.0.nupkg
```

Push to a feed:

```sh
dotnet nuget push bin/Release/Company.MyLibrary.1.0.0.nupkg \
  --source https://api.nuget.org/v3/index.json \
  --api-key YOUR_API_KEY
```

For internal packages, push to Azure Artifacts, GitHub Packages, Nexus, Artifactory, ProGet, or a local folder feed.

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
