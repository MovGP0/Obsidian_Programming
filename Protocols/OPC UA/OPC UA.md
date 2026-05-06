# OPC Unified Architecture

OPC UA (OLE for Process Control Unified Architecture) is a machine-to-machine communication protocol for industrial automation

- Methods are limited to 10 arguments; but arguments may be arrays and structures.
- The following protocols are defined
	- OPC UA over TCP
	- HTTPS
	- WebSockets
- The following serialization schemes are defined:
	- XML
	- UA Binary
	- JSON

## URI Scheme

`opc.tcp://127.0.0.1:4840`

## IP Stack

| Layer               | Protocol                                                                                | Description                                                               |
| ------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Automation Protocol | [OPC UA](https://en.wikipedia.org/wiki/OPC_Unified_Architecture)                        |                                                                           |
| Application         | [MQTT](https://en.wikipedia.org/wiki/MQTT) (ISO/IEC 20922)                              | Message broker for message transmission                                   |
| Transport           | [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)                      | Protocol needs to support ordered, lossless, and bi-directional transport |
| Internet            | [IPv6](https://en.wikipedia.org/wiki/IPv6) / [IPv4](https://en.wikipedia.org/wiki/IPv4) |                                                                           |

## See also

- [[OPC UA Data Type]]
- [[OPC UA Node]]
- [[OPC UA Reference]]
- [[OPC UA Event]]

## Weblinks

- [OPC Foundation](https://opcfoundation.org/)
- [OPC OA Reference](https://reference.opcfoundation.org/)
- [OPC UA Client](https://www.unified-automation.com/products/development-tools/uaexpert.html)
