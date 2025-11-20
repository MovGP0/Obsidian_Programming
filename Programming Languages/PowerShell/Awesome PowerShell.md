## Configure `$profile` File

Profile file is typically located in `C:\Users\<USERNAME>\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`

Prevent profile from loading in nested PowerShell instances:
```powershell
if ($Host.UI.SupportsVirtualTerminal -eq $false)
{
    return;
}
```

Set default location to user directory
```powershell
Set-Location ~
```

Set error action preferences
```powershell
$ErrorActionPreference = "Stop";
$WarningPreference = "Continue";
$InformationPreference = "Continue";
$DebugPreference = "SilentlyContinue"
$VerbosePreference = "SilentlyContinue";
```

[Oh-my-Posh](https://ohmyposh.dev/)
```powershell
oh-my-posh init pwsh --config '~\AppData\Local\Programs\oh-my-posh\themes\marcduiker.omp.json' | Invoke-Expression
```

[Starship](https://starship.rs/)
```powershell
$ENV:STARSHIP_CONFIG = [System.IO.Path]::Combine($HOME, ".config", "starship.toml")
Invoke-Expression (&starship init powershell)
```

[Terminal-Icons](https://github.com/devblackops/Terminal-Icons)
```powershell
Import-Module Terminal-Icons | Out-Null
```

[Zoxide](https://github.com/ajeetdsouza/zoxide)
```powershell
Invoke-Expression (& { (zoxide init powershell | Out-String) })
```

[ConvertTo-Sixel](https://github.com/trackd/sixel)
```powershell
ConvertTo-Sixel -url 'https://raw.githubusercontent.com/PowerShell/PowerShell/refs/heads/master/assets/Chibi_Avatar.png' -Width 65
```
