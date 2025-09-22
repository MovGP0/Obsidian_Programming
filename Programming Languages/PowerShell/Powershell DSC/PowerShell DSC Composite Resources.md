[[PowerShell DSC Resources]] can be composed using the `DependsOn` property.

```powershell
Configuration 'ConfigurationName'
{
    Node 'NodeName'
    {
        Resource 'Resource1'
        {
            # ...
        }
        Resource 'Resource2'
        {
            # ...
        }
        Resource 'CompositeResource'
        {
            # ...
            DependsOn = @('[Resource]Resource1', '[Resource]Resource2')
        }
    }
}
```

