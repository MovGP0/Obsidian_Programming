---
title: list NuGet packages
---
```sh
dotnet list package
```

Include transitive packages:

```sh
dotnet list package --include-transitive
```

Find outdated packages:

```sh
dotnet list package --outdated
```

Find vulnerable packages:

```sh
dotnet list package --vulnerable
```

For SDK-style projects, package references are stored in the project file unless you use Central Package Management.
