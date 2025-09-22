- `$AllNodes` and `$Node` provide a script-local hashtable for shared settings
- `$NonNodeData` stores data that is not used by any node

```powershell
@{
	AllNodes =
	@(
		@{
			NodeName = 'server1'
			ExampleSoftware =
			@{
				Name = 'ExampleSoftware'
				ProductId = '{b652663b-867c-4d93-bc14-8ecb0b61cfb0}'
				SourcePath = "$env:SystemDrive\packages\thesoftware.msi"
			}
		},
		@{
			NodeName = 'server2'
		}
	);
	NonNodeData =
	@{
	    ConfigDataXml = (Get-Content "$env:SystemDrive\configs\config.xml")
	};
}

Configuration 'My Configuration'
{
    Import-DSCResource -Name File;
    Node $AllNodes.NodeName
    {
        File 'Create Config File'
        {
            DestinationPath = "$env:SystemDrive\configs\config.xml"
            Contents = ($ConfigurationData.NonNodeData.ConfigDataXml)
        }
    }
}
```

Apply configuration to all nodes using:
```powershell
$AllNodes.NodeName
```

Apply configuration to group of nodes using:
```powershell
Node $AllNodes.Where($_.Roles -contains '.domain').NodeName
```

Apply configuration to a single node using:
```powershell
Node 'mycomputer.domain'
```
