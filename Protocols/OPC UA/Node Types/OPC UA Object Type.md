### Object Type Attributes

| Attribute     | DataType      | Required | Description                                                                                                                      |
| ------------- | ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Nodeld        | Nodeld        | Required | *Inherited Node Attribute*                                                                                                       |
| NodeClass     | NodeClass     | Required | *Inherited Node Attribute*                                                                                                       |
| BrowseName    | QualifiedName | Required | *Inherited Node Attribute*                                                                                                       |
| DisplayName   | LocalizedText | Required | *Inherited Node Attribute*                                                                                                       |
| Description   | LocalizedText | Optional | *Inherited Node Attribute*                                                                                                       |
| WriteMask     | Ulnt32        | Optional | *Inherited Node Attribute*                                                                                                       |
| UserWriteMask | Ulnt32        | Optional | *Inherited Node Attribute*                                                                                                       |
| &mdash;       | &mdash;       | &mdash;  | &mdash;                                                                                                                          |
| IsAbstract    | Boolean       | Required | This Attribute indicates whether the ObjectType is concrete or abstract and therefore cannot directly be used as type definition |

# XML Example

```xml
<UAObjectType NodeId="ns=1;i=2001" BrowseName="1:MotorType">
    <DisplayName>Motor Type</DisplayName>
    <Description>Type definition for motors</Description>
    <References>
        <Reference ReferenceType="HasSubtype" IsForward="false">i=58</Reference> <!-- BaseObjectType -->
    </References>
    <!-- Define a property -->
    <UAVariable NodeId="ns=1;i=2002" BrowseName="1:Power" DataType="Double" ValueRank="-1">
        <DisplayName>Power</DisplayName>
        <Description>Power of the motor</Description>
        <References>
            <Reference ReferenceType="HasTypeDefinition">i=68</Reference> <!-- PropertyType -->
        </References>
    </UAVariable>
</UAObjectType>
```