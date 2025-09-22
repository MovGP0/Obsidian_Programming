## Create OData/IIS based Pull Server

1. Create a file `SetupPullServer.ps1` and install the required features
```powershell
Configuration SetupPullServer
{
    Import-DSCResource -ModuleName xPSDesiredStateConfiguration;
    
    Node "localhost"
    {
        WindowsFeature DSCServiceFeature
        {
            Ensure = "Present"
            Name = "DSC-Service"
        }
    }
    
    xDscWebService PSDSCPullServer
    {
        Ensure = "Present"
        State = "Started"
        EndpointName = "PSDSCPullServer"
        Port = 8080
        CertificateThumbPrint = "AllowUnencryptedTraffic"
        PhysicalPath = "$env:SystemDrive\inetpub\wwwroot\PSDSCPullServer"
        ModulePath = "$env:PROGRAMFILES\WindowsPowerShell\DscService\Modules"
        ConfigurationPath =
            "$env:PROGRAMFILES\WindowsPowerShell\DscService\Configuration"
        DependsOn = "[WindowsFeature]DSCServiceFeature"
    }
  }
}
```
2. Execute `SetupPullServer.ps1` to create the `.mof` file
3. Use `Start-DscConfiguration` to execute the `.mof` file

### Deploy a `.mof` file to the Pull Server

1. Rename the file to an unique id
```powershell
$guid = [GUID]::NewGuid();
Rename-Item -Path .\SourceDir\SomeFile.mof -NewName ".\Configurations\$guid.mof";
```
2. Generate checksum files for all `{guid}.mof` files. The checksum is required for change tracking by the clients.
```powershell
New-DSCCheckSum `
    -ConfigurationPath .\Configurations\ `
    -OutPath .\Configurations `
    -Verbose
```
3. Copy the `.mof` and `.mov.checksum` files to the `ConfigurationPath` folder of the Push Server

## Deploy DSC Resources to the Pull Server

1. Compress the folder with the resources into a `.zip` file. 
   **Warning** DSCv4 does not support `System.IO.Compression.Zipfile`; use 7Zip instead.
   Use `System.IO.Compression.Zipfile` or `Compress-Archive` on DSCv5.
2. Rename the file to `MODULENAME_x.y.z.zip`, where `x.y.z` is the file version.
3. Create a checksum file
```powershell
New-DSCCheckSum `
    -ConfigurationPath MODULENAME_x.y.z.zip `
    -OutPath MODULENAME_x.y.z.zip.checksum `
    -Verbose
```
4. Copy the files to the `ModulePath` path on the Pull Server
