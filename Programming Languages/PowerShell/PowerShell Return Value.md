```powershell
function Get-User
{
    [CmdletBinding(DefaultParameterSetName="ID")]
    [OutputType("System.Int32", ParameterSetName="ID")]
    [OutputType([String], ParameterSetName="Name")]
    param (      
        [parameter(Mandatory=$true, ParameterSetName="ID")]
        [Int[]]$UserID,
        [parameter(Mandatory=$true, ParameterSetName="Name")]
        [String[]]$UserName
    )
    
    process{
        # ...
        [PSObject]$returnValue = if(<cond>) { [int] userId } else { [string] userName }
        return $returnValue;
    }
}
```
