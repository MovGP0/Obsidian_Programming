## Event Logs
- Microsoft-Windows-DSC/Operational
- Microsoft-Windows-DSC/Debug
- Microsoft-Windows-DSC/Analytic

## Enable logging
```powershell
wevtutil.exe set-log "Microsoft-Windows-Dsc/Analytic" /q:true /e:true
wevtutil.exe set-log "Microsoft-Windows-Dsc/Debug" /q:true /e:true
```

## Get Windows Event log
```powershell
Get-WinEvent "Microsoft-windows-DSC/Operational" `
    | Where { $_.LevelDisplayName -contains 'Error' }
```

## Observe current DSC Operations
```powershell
Get-xDSCOperation
Trace-xDSCOperation
```

## Restart DSC

### Restart DSCv4
```powershell
Get-Process *wmi* | Stop-Process -Force;
Restart-Service winrm -Force
```

### Restart DSCv5
```powershell
$dscProcessID = `
    Get-WmiObject msft_providers `
  | Where-Object {$_.provider -like 'dsccore'} `
  | Select-Object -ExpandProperty HostProcessIdentifier;

Get-Process -Id $dscProcessID | Stop-Process
```
