### Clear NuGet Cache

Clear all caches
```sh
dotnet nuget locals all --clear
```

List cache locations
```sh
dotnet nuget locals all --list
```

Clear specific cache locations
```sh
dotnet nuget locals http-cache --clear  
dotnet nuget locals global-packages --clear  
dotnet nuget locals temp --clear  
dotnet nuget locals plugins-cache --clear
```

Using `nuget.exe` direcly
```sh
nuget locals all -clear  
nuget locals all -list
```
