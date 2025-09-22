Executing script as job using `-AsJob`
```powershell
Get-WMIObject Win32_OperatingSystem -AsJob
Some-Workflow -AsJob
```

Executing script as Job using `Start-Job`
```powershell
Start-Job { Get-WMIObject Win32_OperatingSystem }
Start-Job Some-Workflow
```

Check status of all Jobs
```powershell
Get-Job
```

Get status of a specific Job
```powershell
$JobOutput = Receive-Job -Id 1
```

Remove Job
```powershell
Remove-Job -Id 1
```
