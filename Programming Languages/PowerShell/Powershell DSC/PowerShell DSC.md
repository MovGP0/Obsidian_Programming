# PowerShell DSC
## Overview
Managed Object Format (MOF) package contains
- Data File
- Configuration File

MOF file standard is defined by **Distributed Management Task Force** (**DMTF**)

DMTF standardized the **Common Informatio Model** (**CIM**)

**Windows Management Instrumentation** (**WMI**) is the Windows implementation of the CIM standard

**Group Policies** (**GPO*) only work with **Active Directory** (**AD**).

**System Center Configuration Manager** (**SCCM**) is harder to setup

## Publishing als `*.mof` file
- Put the DSC configuration into an `*.ps1` file
- Executhe the `*.ps1` file to generate the `*.mof` file
- Execute `Start-DscConfiguration \\server\directory\` to process `*.mof` files in an given directory

## Push Model
```powershell
# compile the MOF file and copy to target system
Start-DSCConfiguration
```

## Pull Model
- Copy the DSC files to a destribution server
- Data is pulled from the server by the client
- [[PowerShell DSC Local Configuration Manager]] (**LCM**) schedules and executes the MOF file

## Keywords
| Keyword              | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| `Configuration`      | Set of operations on the target system                             |
| `Node`               | Target host to execute the operations on                           |
| `Import-DscResource` | Locates the [[PowerShell DSC Resources]] that parse and execute the configuration |

## DSC Cmdlets
List cmdlets `get-command -Module PSDesiredStateConfiguration`

| Cmdlet                             | Description                                                        |
| ---------------------------------- | ------------------------------------------------------------------ |
| `Configuration`                    | Compiles the configuration into a `*.mof` file                     |
| `Disable-DscDebug`                 |                                                                    |
| `Enable-DscDebug`                  |                                                                    |
| `Get-DscConfiguration`             | Gets the current DSC configuration                                 |
| `Get-DscConfigurationStatus`       | Gets the DSC configuration status |
| `Get-DscLocalConfigurationManager` | Gets the current settings of the Local Configuration Manager (LCM) |
| `Get-DscResource`                  | List all DSC resources on the system                               |
| `Invoke-DscResource`               |                                                                    |
| `New-DscChecksum`                  | Generate a checksum of the `*.mof` file for pull servers           |
| `Publish-DscConfiguration`         | Copies the configuration to the target system without executing |
| `Remove-DscConfigurationDocument`  | Remove a `*.mof` file from the system                              |
| `Restore-DscConfiguration`         | Restore a previous DSC system state                                |
| `Set-DscLocalConfigurationManager` |                                                                    |
| `Start-DscConfiguration`           |                                                                    |
| `Stop-DscConfiguration`            |                                                                    |
| `Test-DscConfiguration`            | Runs the configuration on the target system without making changes |
| `Update-DscConfiguration`          | Force the execution of an configuration file |
