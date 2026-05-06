- OPC UA structures objects as **Nodes** with **Attributes** and **References** to other nodes.
- Attributes have a data type
- Only single-inheritance is supported when node type is derived from another type
- Attributes may be read-only or writeable
	- The `WriteMask` indicates which attributes are writeable

## Node Attributes

- Nodes have a set of common attributes that are common to all nodes
- Nodes may be referenced by other NodeIds; the NodeId property of the Node is the canonical (true) ID
- The NodeId contain a namespace such that multiple nodes with the same name can be properly referenced
- The properties of the node type are defined by the OPC UA standard and can not be extended

| Attribute     | Data Type     | Required | Description                                                                                                  |
| ------------- | ------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| Nodeld        | Nodeld        | Required | Uniquely identifies a Node in an OPC UA server and is used to address the Node in the OPC UA Services        |
| NodeClass     | NodeClass     | Required | An enumeration identifying the NodeClass of a Node such as Object or Method                                  |
| BrowseName    | QualifiedName | Required | Identifies the Node when browsing the OPC UA server. It is not localized                                     |
| DisplayName   | LocalizedText | Required | The Name of the Node that should be used to display the name in a user interface. Therefore, it is localized |
| Description   | LocalizedText | Optional | Localized textual description of the Node                                                                    |
| WriteMask     | Ulnt32        | Optional | Specifies which Attributes of the Node are writable, i.e., can be modified by an OPC UA client               |
| UserWriteMask | Ulnt32        | Optional | Specifies which Attributes of the Node can be modified by the user currently connected to the server         |

## Types of Nodes

- [[OPC UA Reference]]
- [[OPC UA Objects]]
- [[OPC UA Variable]]
- [[OPC UA Method]]
- [[OPC UA Argument]]
