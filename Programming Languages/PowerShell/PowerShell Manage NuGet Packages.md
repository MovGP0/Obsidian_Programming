Start PowerShell as **Administrator**

Ensure package provider is installed
```powershell
Get-PackageProvider -ListAvailable
```
```txt
Name                     Version          DynamicOptions
----                     -------          --------------
NuGet                    3.0.0.1          Destination, ExcludeVersion, Scope, SkipDependencies, Headers, FilterOnTag, …
PowerShellGet            2.2.5.0          PackageManagementProvider, Type, Scope, AllowClobber, SkipPublisherCheck, In…
PowerShellGet            1.0.0.1
```

Install package provider when required
```powershell
Install-PackageProvider -Name 'NuGet' -Force
```

Install package
```powershell
Install-Package `
    -Name 'System.Reactive' `
    -Provider 'NuGet' `
    -Source 'https://api.nuget.org/v3/index.json' `
    -Force
```

Install specific version of an package
```powershell
Install-Package `
    -Name 'System.Reactive' `
    -Provider 'NuGet' `
    -Source 'https://api.nuget.org/v3/index.json' `
    -RequiredVersion '7.0.0-alpha' `
    -AllowPrereleaseVersions `
    -Force
```

Package should now be located in the NuGet cache
```powershell
ls ~\.nuget\packages
```
