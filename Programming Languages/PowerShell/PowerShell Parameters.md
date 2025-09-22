```powershell
[CmdletBinding(SupportsShouldProcess=$true, ConfirmImpact='Medium')]
param(
    [Parameter()]
    [Alias('s')]
    [ValidateNotNullOrEmpty()]
    [ValidateSet('Wien','Innsbruck','Salzburg')]
    [string]$source,

    [Parameter()]
    [Alias('t')]
    [ValidateNotNullOrEmpty()]
    [ValidateSet('Wien','Innsbruck','Salzburg')]
    [ValidateScript({ $source -ne $_ })]
    [string]$target
)

process
{
    Set-StrictMode -Version Latest;
    $ErrorActionPreference = "Stop";

    [bool]$debug = ($PSBoundParameters['Debug'] -eq $true);
    [bool]$verbose = ($PSBoundParameters['Verbose'] -eq $true);

	if ($pscmdlet.ShouldProcess($targetFilePath, "Set-Content"))
    {
        Write-Result -Debug:$debug -Verbose:$verbose; # -WhatIf parameter was set
    }
    else if([bool]$WhatIfPreference.IsPresent)
    {
	    Write-Result -Debug:$debug -Verbose:$verbose; # -Confirm parameter was set
    }
}

function Write-Result
{
	[CmdletBinding()]
	param()
    
    process
    {
        [bool]$debug = ($PSBoundParameters['Debug'] -eq $true);
        [bool]$verbose = ($PSBoundParameters['Verbose'] -eq $true);
        
	    Set-Content `
			-Path 'Foobar.txt'`
			-Value 'Foobar' `
			-Debug:$debug `
			-Verbose:$verbose;
	}
}
```

## ParameterAttribute

```powershell
[Parameter(
    Mandatory= $true,
    ValueFromPipeline= $true,
    ValueFromPipelineByPropertyName= $true,
    Position= 0,
    ParameterSetName = 'group'
)]
```

## Validation Attributes
```powershell
[ValidateNotNull()]
[ValidateNotNullOrEmpty()]
[ValidateLength(length)]
[ValidateCount(count)]
[ValidateRange(min, max)]
[ValidateSet("foo", "bar")]
[ValidatePattern("REGEX")]
[ValidateScript({ Test-Path $_ })]
```
