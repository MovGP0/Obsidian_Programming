```powershell
[string]$programPath = ((${env:ProgramFiles(x86)}).Length -eq 0)
    ? ${env:ProgramFiles}
    : ${env:ProgramFiles(x86)};
```