- Similar to [[OPC UA Object Type]], but can only be used to define the type of an [[OPC UA Variable]].

### Variable Type Attributes

| Attribute       | DataType      | Required | Description                                                                                                                               |
| --------------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Nodeld          | Nodeld        | Required | *Inherited Node Attribute*                                                                                                                |
| NodeClass       | NodeClass     | Required | *Inherited Node Attribute*                                                                                                                |
| BrowseName      | QualifiedName | Required | *Inherited Node Attribute*                                                                                                                |
| DisplayName     | LocalizedText | Required | *Inherited Node Attribute*                                                                                                                |
| Description     | LocalizedText | Optional | *Inherited Node Attribute*                                                                                                                |
| WriteMask       | Ulnt32        | Optional | *Inherited Node Attribute*                                                                                                                |
| UserWriteMask   | Ulnt32        | Optional | *Inherited Node Attribute*                                                                                                                |
| &mdash;         | &mdash;       | &mdash;  | &mdash;                                                                                                                                   |
| Value           | ANY           | Optional | Default value for instances of this VariableType.                                                                                         |
| DataType        | NodeId        | Required | Defines the DataType of the Value Attribute for instances of this type as well as for the Value Attribute of the VariableType if provided |
| ValueRank       | Int32         | Required | Tensor-Rank (indicates Scalar, Array, Matrix, etc.)                                                                                       |
| ArrayDimensions | UInt32[]      | Optional | Size of the array in the given dimension                                                                                                  |
| IsAbstract      | Boolean       | Required | Abstract types cannot be referenced by variables directly                                                                                 |

- The data type of the value is specified by the `DataType`, `ValueRank`, and `ArrayDimensions` Attributes

## XML Example

```xml
<opc:UAVariableType opc:NodeId="ns=1;i=3001" opc:BrowseName="1:TemperatureSensorType" opc:DataType="Double" opc:ValueRank="-1">
    <opc:DisplayName>Temperature Sensor Type</opc:DisplayName>
    <opc:Description>Type definition for temperature sensors</opc:Description>
    <opc:References>
        <!-- Reference to BaseVariableType -->
        <opc:Reference opc:ReferenceType="HasSubtype" opc:IsForward="false">i=62</opc:Reference>
    </opc:References>
    <!-- Default value for the variable type -->
    <opc:Value>
        <opc:Double>25.0</opc:Double>
    </opc:Value>
</opc:UAVariableType>
```