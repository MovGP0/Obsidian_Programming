---
title: folder feeds
---
A local folder can be a NuGet source:

```sh
mkdir ./local-nuget
dotnet nuget add source ./local-nuget --name local
```

Pack into it:

```sh
dotnet pack --configuration Release --output ./local-nuget
```

Restore from it:

```sh
dotnet restore --source ./local-nuget
```

This is useful for testing packages before publishing them.
