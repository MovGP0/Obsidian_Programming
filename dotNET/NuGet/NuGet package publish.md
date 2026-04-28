---
title: publish a NuGet package
---
Publish a NuGet package
```powershell
dotnet pack --configuration 'Release'
dotnet nuget push 'bin/Release/MyLibrary.1.0.0.nupkg' --api-key 'APIKEY' --source 'https://api.nuget.org/v3/index.json'
```

