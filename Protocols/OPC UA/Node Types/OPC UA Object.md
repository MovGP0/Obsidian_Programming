- Objects are used to structure the address space in a hierarchy
- Objects use the `DisplayName` and `Description` attributes to describe other nodes
- Objects must always be typed
	- having at least one `HasTypeDefinition` reference to a given [[OPC UA Object Type]]

### Object Attributes

| Attribute     | DataType      | Required | Description                                                                                                                                                               |
| ------------- | ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nodeld        | Nodeld        | Required | *Inherited Node Attribute*                                                                                                                                                |
| NodeClass     | NodeClass     | Required | *Inherited Node Attribute*                                                                                                                                                |
| BrowseName    | QualifiedName | Required | *Inherited Node Attribute*                                                                                                                                                |
| DisplayName   | LocalizedText | Required | *Inherited Node Attribute*                                                                                                                                                |
| Description   | LocalizedText | Optional | *Inherited Node Attribute*                                                                                                                                                |
| WriteMask     | Ulnt32        | Optional | *Inherited Node Attribute*                                                                                                                                                |
| UserWriteMask | Ulnt32        | Optional | *Inherited Node Attribute*                                                                                                                                                |
| &mdash;       | &mdash;       | &mdash;  | &mdash;                                                                                                                                                                   |
| EventNotifier | Byte          | Required | This Attribute represents a bit mask that identifies<br/>1. whether the Object can be used to subscribe to Events<br/>2. whether the history of Events is accessible and changeable |

## XML Example

```xml
<opc:UANodeSet xmlns:opc="http://opcfoundation.org/UA/2011/03/UANodeSet.xsd"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://opcfoundation.org/UA/2011/03/UANodeSet.xsd https://files.opcfoundation.org/schemas/UA/1.04/UANodeSet.xsd">
	<opc:UAObject opc:NodeId="ns=1;i=4001" opc:BrowseName="1:ProcessController">
	    <opc:DisplayName>Process Controller</opc:DisplayName>
	    <opc:Description>Controller for managing processes</opc:Description>
	    <opc:References>
	        <opc:Reference opc:ReferenceType="Organizes" opc:IsForward="false">i=85</opc:Reference>
	        <opc:Reference opc:ReferenceType="HasComponent">ns=1;i=3001</opc:Reference>
	        <opc:Reference opc:ReferenceType="HasProperty">ns=1;i=5001</opc:Reference>
	    </opc:References>
	</opc:UAObject>
</opc:UANodeSet>
```