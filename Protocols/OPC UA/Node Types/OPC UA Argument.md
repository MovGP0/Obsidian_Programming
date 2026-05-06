Declares the type of an input or output argument of a [[OPC UA Method]].

### Argument Attributes

| Attribute       | DataType      | Required | Description                                                             |
| --------------- | ------------- | -------- | ----------------------------------------------------------------------- |
| Nodeld          | Nodeld        | Required | *Inherited Node Attribute*                                              |
| NodeClass       | NodeClass     | Required | *Inherited Node Attribute*                                              |
| BrowseName      | QualifiedName | Required | *Inherited Node Attribute*                                              |
| DisplayName     | LocalizedText | Required | *Inherited Node Attribute*                                              |
| Description     | LocalizedText | Optional | *Inherited Node Attribute*                                              |
| WriteMask       | Ulnt32        | Optional | *Inherited Node Attribute*                                              |
| UserWriteMask   | Ulnt32        | Optional | *Inherited Node Attribute*                                              |
| &mdash;         | &mdash;       | &mdash;  | &mdash;                                                                 |
| Name            | String        | Required | Name of the Argument                                                    |
| DataType        | NodeId        | Required | NodeId of a DataType Node                                               |
| ValueRank       | Int32         | Required | Indicates the tensor-rank of the argument (scalar, array, matrix, etc.) |
| ArrayDimensions | UInt32[]      | Optional | Defines the sizes of the tensor dimensions                              |
| Description     | LocalizedText | Required | Description of the Argument                                             |

## XML Example

```xml
<UAVariable NodeId="ns=1;i=1001" BrowseName="InputArguments">
    <DisplayName>Input Arguments</DisplayName>
    <Description>Method input parameters</Description>
    <DataType>Argument</DataType>
    <ValueRank>1</ValueRank>
    <ArrayDimensions>1</ArrayDimensions>
    <Value>
        <ListOfExtensionObject>
            <ExtensionObject>
                <TypeId>i=297</TypeId>
                <Body>
                    <Argument>
                        <Name>Temperature</Name>
                        <DataType>ns=1;i=11</DataType>
                        <ValueRank>-1</ValueRank>
                        <ArrayDimensions/>
                        <Description>Temperature in Celsius</Description>
                    </Argument>
                </Body>
            </ExtensionObject>
        </ListOfExtensionObject>
    </Value>
</UAVariable>
```