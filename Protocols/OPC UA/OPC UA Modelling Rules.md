- ModellingRules define constraints and guidelines for the instantiation of nodes, ensuring consistency and predictability in the address space.
- Rules may be overriden by subclasses
	- i.e. the class `Address` has an optional `Country` attribute, which is overridden to be required in the subclass `InternationalAddress`
	- Constraints can be further restricted by subclasses, but not loosened

The primary ModellingRules specified in OPC UA are:

| ModellingRule            | Description                                                                                                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mandatory**            | Indicates that the target node must be instantiated for every instance of the source node. This ensures that essential components are always present.                                    |
| **Optional**             | Specifies that the target node may be instantiated at the discretion of the implementer. This allows flexibility for components that are not always necessary.                           |
| **OptionalPlaceholder**  | Similar to Optional, but used when multiple instances of the target node can exist. It acts as a template for potential nodes that can be added as needed.                               |
| **MandatoryPlaceholder** | Indicates that at least one instance of the target node must be instantiated, but the exact number can vary. It serves as a template for required nodes where the quantity is not fixed. |
| **ExposesItsArray**      | Applied to VariableTypes with array data types, this rule indicates that each element of the array should also be exposed as an individual Variable in the address space.                |

## Examples

```csharp
public class Motor
{
    // Mandatory property
	public double Power { get; set; }

	// Optional property
	public double? Efficiency { get; set; }

	// Optional Placeholder
	public List<Sensor> Sensors { get; } = new List<Sensor>();

    // MandatoryPlaceholder 
    // (must contain at least one element)
    public List<Sensor> CriticalSensors { get; }

    public Motor(List<Sensor> criticalSensors)
    {
        if (criticalSensors == null || criticalSensors.Count == 0)
            throw new ArgumentException("At least one critical sensor must be defined.");
        
        CriticalSensors = criticalSensors;
    }
}

public class Sensor
{
    public string Name { get; set; }
    public double Reading { get; set; }
}

// Exposes its Array
public class DataArray
{
    public double[] Values { get; set; }

    // Exposing individual array elements as properties
    public double Value1 => Values.Length > 0 ? Values[0] : double.NaN;
    public double Value2 => Values.Length > 1 ? Values[1] : double.NaN;
    public double Value3 => Values.Length > 2 ? Values[2] : double.NaN;
}
```
