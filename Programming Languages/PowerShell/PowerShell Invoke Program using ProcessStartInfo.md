```powershell
$pinfo = New-Object System.Diagnostics.ProcessStartInfo
$pinfo.FileName = "$env:UserProfile\AppData\Roaming\npm\gulp.cmd"
$pinfo.RedirectStandardError = $true
$pinfo.RedirectStandardOutput = $true
$pinfo.UseShellExecute = $false
$pinfo.Arguments = "test:build test:exec"
$pinfo.WorkingDirectory = "$env:UserProfile\projects\WebApp"

$p = New-Object System.Diagnostics.Process
$p.StartInfo = $pinfo
$p.Start()

$stdout = $p.StandardOutput.ReadToEnd()
$stderr = $p.StandardError.ReadToEnd()
$exitcode = $p.ExitCode

[System.Console]::WriteLine($stdout)
```