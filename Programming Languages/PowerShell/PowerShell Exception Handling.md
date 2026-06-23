```powershell
try {
    # ...
} catch {
    Write-Exception $_
    throw;
} finally {
    # ...
}
```

## Example Write-Exception Function
```powershell
function Write-Exception
{
  param
  (
    [Parameter(Mandatory=$true, Position=0)]
    $thisError
  )
  process
  {
    [System.Text.StringBuilder]$builder = New-Object -TypeName "System.Text.StringBuilder"; 
    $builder.AppendLine($thisError.Exception);
    $builder.AppendLine($thisError.Exception.StackTrace);
    $builder.AppendLine("at line $($thisError.InvocationInfo.ScriptLineNumber) char $($thisError.InvocationInfo.OffsetInLine)");
    $builder.AppendLine($thisError.InvocationInfo.Line);
    $builder.AppendLine($thisError.InvocationInfo.ScriptName);
    Write-Error $builder.ToString();
  }
}
```

Consider [PoShLog](https://github.com/PoShLog/PoShLog) for logging.

## Error trapping

```powershell
function Do-Something
{
    param
    (
        [Parameter()]
        [string]$foo
    )
    trap [Exception]
    {
        Write-Exception $_;
        Continue; # Break
    }
    begin
    {
        # ...
    }
    process
    {
        # ...
    }
    end
    {
        # ...
    }
}
```
