# PowerShell DSC Local Configuration Manager
Responsible for scheduling and executing `*.mof` files.

Manage using:
- `Get-DscLocalConfigurationManager`
- `Set-DscLocalConfigurationManager`

## Important properties

| Property                         | Description                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `AllowModuleOverwrite`           | Allow/Disallow overriding DSC modules                                                                          |
| `ConfigurationMode`              | Mode of when and how to apply configuration changes (`ApplyOnly`, `ApplyAndMonitor`, or `ApplyAndAutoCorrect`) |
| `ConfigurationModeFrequencyMins` | How often to check for configuration drift                                                                     |
| `RebootNodeIfNeeded`             | Reboot the server if needed                                                                                    |
| `RefreshFrequencyMins`           | How often to check pull server updates                                                                         |
| `RefreshMode`                    | `Push`, or `Pull`                                                                                              |

## Set LCM using DSC Configuration
```powershell
Configuration Foobar
{
    Import-Resource LocalConfigurationManager;
    Target localhost
    {
        LocalConfigurationManager
        {
            ConfigurationMode = 'ApplyAndCorrect'
            ConfigurationModeFrequencyMins = 120
            RefreshMode = 'Push'
            RebootIfNeeded = $true
        }
    }
}
```

## Troubleshooting

- Consider `PSDSCRunAsCredential` when the access rights of the LCM user are insufficient.
- Delete the `pending.mof` file when the deployment was unsuccessful. Try using `Update-DSCConfiguration`/`Start-DSCConfiguration -Force` to restart the deployment

```powershell
Remove-Item $env:systemRoot/system32/configuration/pending.mof -Force;
Get-Process *wmi* | Stop-Process -Force;
Restart-Service winrm -Force;
```
