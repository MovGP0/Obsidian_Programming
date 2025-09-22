## Packages to install

- [Oh My Posh](https://ohmyposh.dev/)
- [Terminal-Icons](https://github.com/devblackops/Terminal-Icons)
- [PowerShellAI](https://github.com/dfinke/PowerShellAI)

## `$profile` File

```powershell
oh-my-posh init pwsh --config '~\AppData\Local\Programs\oh-my-posh\themes\marcduiker.omp.json' | Invoke-Expression
Import-Module PowerShellAI | Out-Null
Import-Module Terminal-Icons | Out-Null
Enable-AIShortCutKey
Set-Location ~
```