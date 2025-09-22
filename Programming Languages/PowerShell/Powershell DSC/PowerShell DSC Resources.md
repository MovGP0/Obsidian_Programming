# PowerShell DSC Resources
Resources are responsible to bring the system into a specific state.

Resources must be presend in one of the paths declared in `$env:PSModulePath` to be found.

## Base Resources
List all resources using `Get-DscResource `

| Resource         | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `Service`        | Start/Stop Windows Service                             |
| `Script`         | PowerShell code block that executes on the target host |
| `User`           | Create/Delete/Modify local users                       |
| `WindowsProcess` | Execute an program with specific parameters            |
| `WindowsFeature` | Add/Remove Windows Feature                             |
| `Registry`       | Add/Remove/Modify Registry entries                     |
| `Environment`    | Add/Remove/Modify Environment Variables                |
| `Archive`        | Operations on compressed files                         |
| `Group`          | Add/Remove/Modify membership on local groups and users |
| `Package`        | Install software using `*.msi` or `*.exe` installers   |
| `Log`            | Log output for diagnostics and troubleshooting         |

## Implement custom DSC Resources

- [Writing a custom DSC resource with MOF](https://learn.microsoft.com/en-us/powershell/dsc/resources/authoringresourcemof?view=dsc-1.1)
- [Writing a custom DSC resource with PowerShell classes](https://learn.microsoft.com/en-us/powershell/dsc/resources/authoringresourceclass?view=dsc-1.1)
- [Composite resources - Using a DSC configuration as a resource](https://learn.microsoft.com/en-us/powershell/dsc/resources/authoringresourcecomposite?view=dsc-1.1)
- [Authoring a DSC resource in C#](https://learn.microsoft.com/en-us/powershell/dsc/resources/authoringresourcemofcs?view=dsc-1.1)
- [Using the Resource Designer tool](https://learn.microsoft.com/en-us/powershell/dsc/resources/authoringresourcemofdesigner?view=dsc-1.1)


## Example DSC files
### Ensure file is present
```powershell
configuration "File Configuration"
{
    # (optional) ensure resource is imported
    Import-DSCResource -Name File;
    Node "localhost"
    {
	    File ExampleFile
	    {
	        Ensure = 'present'
	        Type = 'File'
	        DestinationPath = "$env:SystemDrive\Foobar.txt"
	        Contents = "content of the file";
	    }
    }
}
```

### Ensure WindowsFeature is installed
```powershell
configuration "Windows-Feature Configuration"
{
    # (optional) ensure resource is imported
    Import-DSCResource -Name WindowsFeature;
     
    Node "localhost"
    {
	    WindowsFeature SomeFeature
	    {
	        Ensure = 'Present'
	        Name = 'NameOfTheFeature'
	    }
    }
}
```
Example
```powershell
configuration "Install Software"
{
    # (optional) ensure resource is imported
    Import-DSCResource -Name WindowsFeature;
     
    Node "localhost"
    {
	    WindowsFeature DotNet45
	    {
	        Ensure = 'Present'
	        Name = 'NET-Framework-45-Core'
	    }
    }
}
```

## Ensure Windows Service is running
```powershell
configuration "Windows Service Configuration"
{
	Import-DSCResource -Name Service;
	Node "localhost"
	{
	    Service "Spooler:Running"
	    {
		    Name = "Spooler"
		    State = "Running"
		}
		Service "DHCP:Running"
		{
			Name = "DHCP"
			State = "Running"
		}
	}
}
```

## Install Software using Choco
```powershell
configuration "Example Configuration"
{
    Install-Module -Name cChoco;
    Import-DSCResource -Name cChoco;
    
	Node "localhost"
	{
		cChocoInstaller "installChoco"
		{
	        InstallDir = "$env:SystemDrive\choco"
	    }
	    cChocoPackageInstallerSet "installSomeStuff"
	    {
	        Ensure = 'Present'
	        Name = @( 'dotnet4.6.2' )
	        DependsOn = "[cChocoInstaller]installChoco"
	    }
	}
}
```

## Software Package with Parameters and Dependencies

```powershell
# declare parameters of *.ps1 file
[CmdletBinding()]
param(
	[Parameter()]
	[string]$computer,
	
	[Parameter()]
	[string]$SoftwareName,

	[Parameter()]
	[guid]$SoftwareProductId,
	
	[Parameter()]
	[string]$SoftwarePath,
	
	[Parameter()]
	[string]$ConfigFileName
)

# declare configuration with parameters
Configuration Install-Software
{
	param(
		[string]$node,
		[string]$SoftwareName,
		[guid]$SoftwareProductId,
		[string]$SoftwarePath,
		[string]$ConfigFileContent
	)
	
	Node $computer
	{
		WindowsFeature DotNet
		{
			Ensure = 'Present'
			Name = 'NET-Framework-45-Core'
		}
		File ConfigFile
		{
			DestinationPath = "c:\foo.config"
			Contents = $ConfigFileContent
		}
		Package InstallExampleSoftware
		{
			Ensure = "Present"
			Name = $SoftwareName
			ProductId = $SoftwareProductId
			Path = $SoftwarePath
			DependsOn = @('[WindowsFeature]DotNet')
		}
	}
}

# invoke configuration
Install-Software `
    -computer $computer `
    -SoftwareName $SoftwareName
    -SoftwareProductId $SoftwareProductId `
    -SoftwarePath $SoftwarePath `
    -ConfigFile (Get-Content $ConfigFileName)
```
Create `*.mof` file:
```powershell
MyScript.ps1 `
    -computer 'localhost' `
    -ExampleSoftwareName 'SomeSoftware' `
    -ExampleSoftwareProductId '4909a5d0-b3c3-4a98-be90-a0dcee7c4eef' `
    -ExampleSoftwarePath 'c:\software\install.msi' `
    -ConfigFileContents (Get-Content "config.xml")
```
