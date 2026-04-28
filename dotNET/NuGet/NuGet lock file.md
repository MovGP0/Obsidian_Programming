---
title: NuGet lock file (packages.lock.json)
---
For more repeatable restores, enable NuGet lock files:

```xml
<PropertyGroup>
  <RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>
</PropertyGroup>
```

This generates a `packages.lock.json` file. Commit it to source control.

In CI, use locked mode:

```sh
dotnet restore --locked-mode
```

That makes restore fail if the project references and the lock file disagree. This is good: it catches accidental or undeclared dependency graph changes.

Microsoft documents that setting the lock-file property makes NuGet generate `packages.lock.json` at the project root, listing package dependencies. ([Microsoft Learn](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files?utm_source=chatgpt.com "NuGet PackageReference in project files"))

Practical rule:

|Scenario|Recommendation|
|---|---|
|Application|Use and commit `packages.lock.json`|
|Library|Often useful, but less universal|
|CI / release build|Use `--locked-mode`|
|Floating versions|Use lock files, otherwise builds are less deterministic|
