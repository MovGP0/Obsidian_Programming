- Variable Nodes represent a **Data Value** or **Property**
	- i.e. the numerical value of a temperature sensor
- Clients may
	- Read the value
	- Set the value (when not declared as read-only in the `WriteMask`)
	- Subscribe to changes of the value
- Variables must always belong to another Node
	- That is being referenced by at least one `HasComponent` or `HasProperty` reference
- Variables must always be typed
	- having at least one `HasTypeDefinition` reference to a given [[OPC UA Variable Type]]

| Variable Type | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| Data Value    | Represent the data of an object and can be composed of one or more variables |
| Property      | Simple values that are not composed.                                         |

### Variable Attributes

| Attribute               | DataType      | Required | Description                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nodeld                  | Nodeld        | Required | *Inherited Node Attribute*                                                                                                                                                                                                                                                                                                             |
| NodeClass               | NodeClass     | Required | *Inherited Node Attribute*                                                                                                                                                                                                                                                                                                             |
| BrowseName              | QualifiedName | Required | *Inherited Node Attribute*                                                                                                                                                                                                                                                                                                             |
| DisplayName             | LocalizedText | Required | *Inherited Node Attribute*                                                                                                                                                                                                                                                                                                             |
| Description             | LocalizedText | Optional | *Inherited Node Attribute*                                                                                                                                                                                                                                                                                                             |
| WriteMask               | Ulnt32        | Optional | *Inherited Node Attribute*                                                                                                                                                                                                                                                                                                             |
| UserWriteMask           | Ulnt32        | Optional | *Inherited Node Attribute*                                                                                                                                                                                                                                                                                                             |
| &mdash;                 | &mdash;       | &mdash;  | &mdash;                                                                                                                                                                                                                                                                                                                                |
| Value                   | ANY           | Required | The actual value of the Variable.                                                                                                                                                                                              |
| DataType                | NodeId        | Required | DataTypes are represented as Nodes in the Address Space.<br/>This Attribute contains a Nodeld of such a Node and thus defines the DataType of the Value Attribute                                                                                                                                                                      |
| ValueRank               | Int32         | Required | Identifies if the value is an array and when it is an array it allows specifying the dimensions of the array                                                                                                                                                                                                                           |
| ArrayDimensions         | UInt32[]      | Optional | Allows specifying the size of an array and can only be used if the value is an array.<br/>For each dimension of the array a corresponding entry defines the length of the dimension                                                                                                                                                    |
| AccessLevel             | Byte          | Required | A bit mask indicating whether the current value of the Value Attribute is readable and writable,<br/>as well as whether the history of the value is readable and changeable                                                                                                                                                            |
| UserAccessLevel         | Byte          | Required | Contains the same information as the AccessLevel but takes user access rights into account                                                                                                                                                                                                                                             |
| MinimumSamplingInterval | Duration      | Optional | Provides the information how fast the OPC UA server can detect changes of the Value Attribute.<br/>For Values not directly managed by the server, e.g., the temperature of a temperature sensor, the server may need to scan the device for changes (polling) and thus is not able to detect changes faster than this minimum interval |
| Historizing             | Boolean       | Required | Indicates whether the server currently collects history for the Value.<br/>The AccessLevel Attribute does not provide that information, it only specifies whether some history is available                                                                                                                                            |

- The data type of the value is specified by the `DataType`, `ValueRank`, and `ArrayDimensions` Attributes
	- Because a reference may change, distinct attributes are used instead of a reference

## XML Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<opc:UANodeSet xmlns:opc="http://opcfoundation.org/UA/2011/03/UANodeSet.xsd"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://opcfoundation.org/UA/2011/03/UANodeSet.xsd https://files.opcfoundation.org/schemas/UA/1.04/UANodeSet.xsd">
    <opc:UAVariable opc:NodeId="ns=1;i=1001" opc:BrowseName="opc:InputArguments">
        <opc:DisplayName>Input Arguments</opc:DisplayName>
        <opc:Description>Method input parameters</opc:Description>
        <opc:DataType>opc:Argument</opc:DataType>
        <opc:Value>
            <opc:ListOfExtensionObject>
                <opc:ExtensionObject>
                    <opc:TypeId>i=297</opc:TypeId>
                    <opc:Body>
                        <opc:Argument>
                            <opc:Name>Temperature</opc:Name>
                            <opc:DataType>opc:Double</opc:DataType>
                            <opc:ValueRank>-1</opc:ValueRank>
                            <opc:Description>Temperature in Celsius</opc:Description>
                        </opc:Argument>
                    </opc:Body>
                </opc:ExtensionObject>
            </opc:ListOfExtensionObject>
        </opc:Value>
    </opc:UAVariable>
</opc:UANodeSet>
```