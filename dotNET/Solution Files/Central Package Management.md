In Solution File
```xml
<Project Sdk="Microsoft.NET.Sdk">
	<PropertyGroup>
		<!-- ... -->
		<ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
		<!-- use version defined in Directory.packages.props for transient dependencies -->
        <CentralPackageTransitivePinningEnabled>true</CentralPackageTransitivePinningEnabled>
	</PropertyGroup>
	<ItemGroup>
		<!-- ... -->
	</ItemGroup>
</Project>
```

In `Directory.packages.props`
```xml
<Project>  
	<ItemGroup>  
		<PackageVersion Include="PACKAGENAME" Version="VERSION" />
	</ItemGroup>  
</Project>
```