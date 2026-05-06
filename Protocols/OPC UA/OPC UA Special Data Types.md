## NodeId

- The `NodeId` type contains an index for the namespace and a name
- The `NamespaceIndex` is an `UInt32` reference to an URI like `http://opcfoundation.org/UA/` 
	- The UInt32 type is used instead of String for performance considerations
	- The URI can be retrieved by the `NamespaceArray` object of the server
	- The array might be indexed differently when a new connection to the server is made
	- The index `0` always represents `http://opcfoundation.org/UA/`

Consists of
1. Namespace Index (UInt32)
2. IdentiferType (Enum of: Numeric, String, GUID, Opaque)
3. Identifier

## ExpandedNodeId

- The type `ExpandedNodeId` should be used when communicating between servers, which uses the full Namespace URI as `String`
- The numerical namespace index should be ignored when the string representation is present

Consists of
1. Server Index (UInt32)
2. NamespaceURI (String)
3. NamespaceIndex (UInt32)
4. IdentiferType (Enum of: Numeric, String, GUID, Opaque)
5. Identifier

## QualifiedName

The `QualifiedName` data type is used as a "browse name".

Consists of
1. a namespace index 
2. a string representing its name

## LocalizedText

- Provides translations of strings that are presented to the user.
- The locale to use are defined as a priority list when connecting to the server.
	- The server will use the default locale when no locale is matched

Contains 
1. a string representing the string in a given translation/locale
2. a RFC 3066 language code (i.e. "de" or "en-US")
