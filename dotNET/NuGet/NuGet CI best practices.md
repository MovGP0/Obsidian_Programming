
For reliable CI builds:

```sh
dotnet restore MySolution.slnx --locked-mode
dotnet build MySolution.slnx --configuration Release --no-restore
dotnet test MySolution.slnx --configuration Release --no-build
```

Recommended repository files:

```text
NuGet.config
Directory.Packages.props
packages.lock.json
global.json
```

A good CI setup should:

|Practice|Why|
|---|---|
|Commit `NuGet.config`|Avoid machine-specific feeds|
|Use `<clear />` in package sources|Avoid accidental user/machine feeds|
|Use package source mapping|Reduce dependency-confusion risk|
|Use lock files|Repeatable restores|
|Use `--locked-mode` in CI|Fail on undeclared dependency changes|
|Pin .NET SDK via `global.json`|Avoid SDK drift|
|Cache `~/.nuget/packages` carefully|Faster builds|
|Avoid overwriting package versions|NuGet packages should be immutable|
