## Keywords

- `Workflow`
- `Parallel`
- `Foreach –parallel`
- `Sequence`
- `InlineScript`
- `Checkpoint-Workflow`
- `Suspend-Workflow` / `Resume-Workflow`

### Parallel

```powershell
workflow WF-ParallelExample
{
	parallel
	{
		Get-CimInstance –ClassName Win32_OperatingSystem
		Get-Process –Name PowerShell*
		Get-CimInstance –ClassName Win32_ComputerSystem
		Get-Service –Name s*
	}
}
```

### ForEach / Sequence

```powershell
workflow WF-ForeachAndSequenceExample
{
    param([string[]]$computers)

	foreach –parallel ($computer in $computers)
	{
		sequence
		{
	        Get-WmiObject -Class Win32_ComputerSystem -PSComputerName $computer;
	        $disks = Get-WmiObject -Class Win32_LogicalDisk -Filter 'DriveType = 3' –PSComputerName $computer;

			foreach -parallel ($disk in $disks)
			{
				sequence
				{
				    $vol = Get-WmiObject -Class Win32_Volume -Filter "DriveLetter = '$($disk.DeviceID)'" –PSComputerName $computer 
				    Invoke-WmiMethod -Path $($vol.__PATH) -Name DefragAnalysis
				}
			}
	    }
	}
}
```

Execute
```powershell
WF-ForeachAndSequenceExample -Computers @('server01', 'server02', 'server03')
```

### InlineScript

```powershell
workflow foreachpitest
{	
	param([string[]]$computers)
	
	foreach –parallel ($computer in $computers)
	{
		InlineScript
		{
			Get-WmiObject –Class Win32_OperatingSystem –ComputerName $using:computer | Format-List
		}
	}
}
```

## Checkpoints with Suspend/Resume

Example Workflow
```powershell
workflow MyWorkflow
{
	$total = 0
	foreach ($num in 1..10)
	{
		Write-Output "Adding $num to total"
		$total += $num
		if ($num -eq 5)
		{
			Write-Output "Reached checkpoint"
			Checkpoint-Workflow
		}
	}

	Write-Output "Total is $total"
}
```

Start the Workflow
```powershell
MyWorkflow -PSComputerName 'Server01' -AsJob
```

Suspend the Worflow
```powershell
Suspend-Workflow -Name MyWorkflow
```

Resume the Workflow at the Checkpoint
```powershell
Resume-Workflow -Name MyWorkflow
```

## Example Workflow

```powershell
workflow Test-WF
{
    param([array[]]$ServerList)

    $ReturnArr = @()
	foreach -parallel -ThrottleLimit 10 ($Server in $ServerList)
	{
		$returnName = $Server
		$strCompName = $Server.Name
		$Count = InlineScript {
			(Get-Eventlog Security -ComputerName $Using:returnName -Newest 4000 | Where-Object { $_.EventID -eq '4624' }).count
		}
		$Workflow:ReturnArr += "$returnName,$Count"
	}
    $ReturnArr
}
```

```powershell
$arrComputers = (get-adcomputer -filter * -server dc1.contoso.com:3268).Name
Get-date
$Stats = Measure-Command -Expression { $OutTest = Test-WF -ServerList $arrComputers }
Get-date
$outTest
$Stats
```

## References

- [Jobs and Workflows](https://devblogs.microsoft.com/scripting/powershell-jobs-week-jobs-and-workflows/)