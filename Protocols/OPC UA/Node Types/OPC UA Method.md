- Method Nodes represent Remote Procedure Call methods
- A method specifies a set of input arguments and a set of output arguments
- Methods should be executed fast
	- Use Programs for long-running tasks
- The OPC UA standard does not define how to create/update/delete methods

## Method Attributes

| Attribute       | DataType      | Required | Description                |
| --------------- | ------------- | -------- | -------------------------- |
| Nodeld          | Nodeld        | Required | *Inherited Node Attribute* |
| NodeClass       | NodeClass     | Required | *Inherited Node Attribute* |
| BrowseName      | QualifiedName | Required | *Inherited Node Attribute* |
| DisplayName     | LocalizedText | Required | *Inherited Node Attribute* |
| Description     | LocalizedText | Optional | *Inherited Node Attribute* |
| WriteMask       | Ulnt32        | Optional | *Inherited Node Attribute* |
| UserWriteMask   | Ulnt32        | Optional | *Inherited Node Attribute* |
| &mdash;         | &mdash;       | &mdash;  | &mdash;                    |
| Executable      | Boolean       | Required |  A flag indicating if the Method can be invoked at the moment  |
| UserExecutable  | Boolean       | Required | Same as the Executable Attribute taking user access rights into account  |
| InputArguments  | Argument[]    | Optional | Defines an array of arguments for the method. |
| OutputArguments | Argument[]    | Optional | Defines an array of arguments for the method. |

- The order of the `Argument` arrays defines the order of the arguments.
	- If an argument property is not provided, the method has no input/output argument (i.e. `void` return value)

## XML Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<opc:UANodeSet xmlns:opc="http://opcfoundation.org/UA/2011/03/UANodeSet.xsd"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://opcfoundation.org/UA/2011/03/UANodeSet.xsd https://files.opcfoundation.org/schemas/UA/1.04/UANodeSet.xsd">
	<opc:UAMethod opc:NodeId="ns=1;i=3001" opc:BrowseName="1:StartProcess">
	    <opc:DisplayName>Start Process</opc:DisplayName>
	    <opc:Description>Method to start the process</opc:Description>
	    <opc:References>
	        <opc:Reference opc:ReferenceType="HasComponent" opc:IsForward="false">ns=1;i=4001</opc:Reference>
	    </opc:References>
	    <opc:InputArguments>
	        <opc:Argument>
	            <opc:Name>ProcessID</opc:Name>
	            <opc:DataType>i=11</opc:DataType>
	            <opc:ValueRank>-1</opc:ValueRank>
	            <opc:ArrayDimensions/>
	            <opc:Description>Identifier for the process</opc:Description>
	        </opc:Argument>
	    </opc:InputArguments>
	    <opc:OutputArguments>
	        <opc:Argument>
	            <opc:Name>Status</opc:Name>
	            <opc:DataType>i=11</opc:DataType>
	            <opc:ValueRank>-1</opc:ValueRank>
	            <opc:ArrayDimensions/>
	            <opc:Description>Resulting status</opc:Description>
	        </opc:Argument>
	    </opc:OutputArguments>
	</opc:UAMethod>
<opc:UANodeSet>
```