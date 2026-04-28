## The basic mental model

A typical .NET project has package references like this:

```xml
<ItemGroup>
  <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
  <PackageReference Include="Serilog" Version="4.2.0" />
</ItemGroup>
```

When you run restore, NuGet resolves the dependency graph, downloads missing packages into the global package cache, and writes the resolved graph to `obj/project.assets.json`. Microsoft documents that restore resolves dependencies and writes the graph to `project.assets.json`. ([Microsoft Learn](https://learn.microsoft.com/en-us/nuget/concepts/dependency-resolution?utm_source=chatgpt.com "NuGet Package Dependency Resolution"))

The usual lifecycle is:

```sh
dotnet add package Some.Package
dotnet restore
dotnet build
dotnet test
dotnet publish
```

`dotnet build` and `dotnet run` automatically perform restore unless disabled, but in CI it is often cleaner to run restore explicitly first. Microsoft documents that package restore can be done with `dotnet restore`, `nuget restore`, `msbuild -t:restore`, or Visual Studio, and that `dotnet build` / `dotnet run` automatically restore packages. ([Microsoft Learn](https://learn.microsoft.com/en-us/nuget/consume-packages/package-restore?utm_source=chatgpt.com "NuGet Package Restore"))

## Practical rules of thumb

- Use `PackageReference`, not `packages.config`, unless you are maintaining an old project.
- Use `Directory.Packages.props` once a solution has more than a few projects.
- Use `packages.lock.json` for applications and CI.
- Use package source mapping whenever you have more than one feed.
- Do not rely on Visual Studio’s machine-level package sources for builds.
- Do not overwrite an existing package version on a feed. Publish a new version.
- Clear the NuGet cache only when necessary; normal restore should not require it.
- For CI, treat restore as its own explicit step and use `--no-restore` afterwards.
- For diagnosing restore problems, generate a binary log:
```sh
dotnet restore /bl:restore.binlog
```

## Weblinks

- [NuGet.org](https://www.nuget.org/)
- [NuGet.info](https://nuget.info)
- [Deps.dev](https://deps.dev/)
- [NuGetPackageExplorer](https://github.com/NuGetPackageExplorer/NuGetPackageExplorer)
- [Software Bill Of Materials (SBOM) Tool](https://github.com/microsoft/sbom-tool)
