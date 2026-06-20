
## Condensed OSI cheat sheet

|     | OSI layer    | Typical protocols                                                                |
| --- | :----------- | -------------------------------------------------------------------------------- |
| 7   | Application  | HTTP, DNS, DHCP, SMTP, IMAP, SSH, SMB, NFS, SNMP, MQTT, OPC UA, SIP, LDAP        |
| 6   | Presentation | TLS, ASN.1, XDR, JSON, XML, CBOR, Protobuf, MIME                                 |
| 5   | Session      | NetBIOS Session, RPC, SIP/SDP, SOCKS, Kerberos session exchange                  |
| 4   | Transport    | TCP, UDP, QUIC, SCTP, DCCP, RTP                                                  |
| 3   | Network      | IPv4, IPv6, ICMP, IGMP, IPsec, GRE, OSPF, BGP, IS-IS, RIP                        |
| 2   | Data link    | Ethernet, Wi-Fi MAC, PPP, HDLC, VLAN, STP, LLDP, LACP, MACsec, ARP               |
| 1   | Physical     | Ethernet PHYs, Wi-Fi PHYs, DSL, DOCSIS, GPON, LTE/5G NR PHY, RS-232/485, CAN PHY |

## Layer 1 — Physical layer

Raw signalling, modulation, media, connectors, electrical/optical/radio characteristics.

|Area|Protocols / standards|
|---|---|
|Wired Ethernet PHY|10BASE-T, 100BASE-TX, 1000BASE-T, 2.5GBASE-T, 5GBASE-T, 10GBASE-T, 10GBASE-SR/LR/ER, 25GBASE, 40GBASE, 100GBASE, 200GBASE, 400GBASE, 800GBASE|
|Wi-Fi PHY|IEEE 802.11a/b/g/n/ac/ax/be PHY|
|Personal-area radio|Bluetooth BR/EDR PHY, Bluetooth LE PHY, IEEE 802.15.4 PHY, Zigbee PHY, Thread PHY|
|Cellular|GSM, GPRS/EDGE radio, UMTS/WCDMA, LTE, LTE-M, NB-IoT, 5G NR|
|Optical / carrier|SONET, SDH, OTN, DWDM, CWDM|
|Access networks|DSL, ADSL, VDSL, G.fast, DOCSIS PHY, GPON, EPON, XGS-PON|
|Serial / fieldbus PHY|RS-232, RS-422, RS-485, CAN physical layer, LIN physical layer, FlexRay physical layer|
|Storage / interconnect PHY|Fibre Channel PHY, SAS PHY, SATA PHY, PCIe PHY, USB PHY, Thunderbolt PHY|
|Low-power / long-range|LoRa PHY, Sigfox radio, RFID, NFC|

## Layer 2 — Data-link layer

Framing, MAC addressing, local delivery, switching, VLANs, link access control.

|Area|Protocols|
|---|---|
|LAN / WLAN framing|Ethernet / IEEE 802.3 MAC, Wi-Fi / IEEE 802.11 MAC, Token Ring, FDDI|
|Link encapsulation|PPP, PPPoE, HDLC, SLIP, Frame Relay, ATM, LAPB, LAPD|
|VLAN / bridging|IEEE 802.1Q VLAN, QinQ / 802.1ad, MAC-in-MAC / 802.1ah, Provider Bridging, STP, RSTP, MSTP, SPB, TRILL|
|Link discovery / aggregation|LLDP, CDP, LACP / 802.1AX, GARP, GVRP, MVRP|
|Link security / access|MACsec / 802.1AE, 802.1X, EAPOL|
|Industrial / embedded link protocols|CAN, CAN FD, LIN, FlexRay, EtherCAT, PROFINET RT/IRT, Sercos III|
|Storage / fabric|Fibre Channel FC-2, FCoE|
|Access networks|DOCSIS MAC, GPON TC, EPON MAC|
|Address resolution / neighbor boundary|ARP, RARP, InARP — often treated as Layer 2.5 because they bind Layer 3 addresses to Layer 2 addresses|
|Overlay Layer-2 transport|VXLAN, NVGRE, GENEVE, L2TPv3, MPLS pseudowires — logically L2, carried over L3/L4|

EtherTypes and IEEE 802 values are maintained in IEEE/IANA-related registries, which is one reason a strict “complete Layer 2 protocol list” is not a single stable document. ([IANA](https://www.iana.org/assignments/ieee-802-numbers/ieee-802-numbers.xhtml?utm_source=chatgpt.com "IEEE 802 Numbers"))

## Layer 3 — Network layer

Logical addressing, packet forwarding, routing, tunnelling, internetworking.

|Area|Protocols|
|---|---|
|Core network protocols|IPv4, IPv6, CLNP, IPX, AppleTalk DDP, DECnet, XNS|
|Control / diagnostics|ICMP, ICMPv6, IGMP, MLD, IPv6 Neighbor Discovery, Router Advertisement, Router Solicitation|
|Security|IPsec AH, IPsec ESP, IKE is control-plane/application-ish but belongs to the IPsec suite|
|Tunnelling / encapsulation|GRE, IP-in-IP, IPv6-in-IPv4, 6in4, 6to4, ISATAP, Teredo, DS-Lite, MAP-E, MAP-T, L2TP, PPTP, WireGuard tunnel packets|
|Routing protocols|RIP, RIPv2, RIPng, OSPFv2, OSPFv3, IS-IS, BGP, EIGRP, Babel, AODV, OLSR, DSR|
|Multicast routing|PIM-SM, PIM-DM, DVMRP, MSDP|
|MPLS / traffic engineering|MPLS, LDP, RSVP-TE, Segment Routing, SR-MPLS, SRv6|
|Mobility / locator systems|Mobile IP, NEMO, LISP, NHRP|
|Legacy WAN|X.25 PLP, SNA path control|

IANA’s “Assigned Internet Protocol Numbers” registry includes many Layer 3 and Layer 4 payload identifiers, for example ICMP, IGMP, IPv4 encapsulation, TCP, UDP, GRE, ESP, AH, SCTP, and many others. ([IANA](https://www.iana.org/assignments/protocol-numbers?utm_source=chatgpt.com "Assigned Internet Protocol Numbers"))

## Layer 4 — Transport layer

End-to-end transport, ports, reliability, multiplexing, congestion control.

|Area|Protocols|
|---|---|
|Main Internet transports|TCP, UDP, SCTP, DCCP, QUIC|
|TCP extensions / variants|MPTCP, TCP Fast Open, TCP-AO|
|Legacy transports|SPX, AppleTalk ATP, OSI TP0, TP1, TP2, TP3, TP4|
|Real-time transport|RTP, RTCP — often placed between Layer 4 and Layer 7|
|Tunnelling transports|UDP-Lite, RUDP variants, ENet, KCP|
|Security-associated transports|DTLS over UDP, TLS over TCP, although TLS is usually mapped to Layer 5/6 rather than pure Layer 4|

The IANA service name and transport protocol port registry is the practical source for assigned service names and port/protocol combinations such as TCP, UDP, SCTP, and DCCP services. ([IANA](https://www.iana.org/assignments/service-names-port-numbers?utm_source=chatgpt.com "Service Name and Transport Protocol Port Number Registry"))

## Layer 5 — Session layer

Dialog control, session setup/teardown, checkpoints, RPC/session semantics. In the modern TCP/IP world this layer is often merged into application protocols.

|Area|Protocols|
|---|---|
|Session services|NetBIOS Session Service, RPC session handling, OSI Session Protocol|
|RPC systems|ONC RPC / SunRPC, MSRPC, DCE/RPC, gRPC session semantics|
|Authentication/session negotiation|Kerberos AP exchange, SASL, SPNEGO, GSS-API|
|Multimedia sessions|SIP, SDP, H.323, RTSP, MGCP, H.248/MEGACO|
|Tunnelling/session control|L2TP control plane, PPTP control plane, SOCKS|
|Remote interaction|SSH connection/session protocol, RDP session layer, VNC/RFB session model|
|Web sessions|HTTP cookies, WebSocket session semantics, HTTP/2 streams, HTTP/3 streams — not pure Layer 5, but session-like|

## Layer 6 — Presentation layer

Encoding, serialization, compression, encryption, data representation. In TCP/IP this is usually handled inside application libraries.

| Area                             | Protocols / formats                                                               |
| -------------------------------- | --------------------------------------------------------------------------------- |
| Encryption / secure presentation | TLS, SSL legacy, DTLS, SSH binary packet protocol                                 |
| Data representation              | ASN.1 BER, DER, CER, PER, XDR, NDR                                                |
| Text / document encoding         | MIME, S/MIME, XML, JSON, YAML, CSV                                                |
| Binary serialization             | Protocol Buffers, CBOR, MessagePack, Avro, Thrift, FlatBuffers, Cap’n Proto, BSON |
| Compression                      | DEFLATE, gzip, Brotli, zstd, LZ4, HPACK, QPACK                                    |
| Certificates / identity encoding | X.509, PKCS#7/CMS, PKCS#12, JWS, JWE, JWT                                         |
| Media presentation               | JPEG, PNG, GIF, WebP, AVIF, H.264, H.265/HEVC, AV1, Opus, AAC, MP3                |

Strictly speaking, many Layer 6 entries are **formats or encoding rules**, not “network protocols” in the same sense as TCP or IP.

## Layer 7 — Application layer

User-visible network services and application protocols. This is by far the largest layer.

| Area                            | Protocols                                                                                                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web                             | HTTP/0.9, HTTP/1.0, HTTP/1.1, HTTP/2, HTTP/3, HTTPS, WebSocket, WebTransport, Server-Sent Events                                                                                                              |
| API / RPC                       | SOAP, XML-RPC, JSON-RPC, gRPC, GraphQL over HTTP, OData, RESTCONF, NETCONF                                                                                                                                    |
| Naming / discovery              | DNS, DNSSEC, mDNS, DNS-SD, LLMNR, NetBIOS Name Service, WINS, SSDP, UPnP, WS-Discovery, SLP                                                                                                                   |
| Address/configuration           | DHCPv4, DHCPv6, BOOTP, RARP legacy                                                                                                                                                                            |
| Email / messaging               | SMTP, ESMTP, LMTP, POP3, IMAP, JMAP, NNTP, XMPP, Matrix, IRC                                                                                                                                                  |
| File transfer                   | FTP, FTPS, SFTP, TFTP, SCP, rsync, WebDAV, BitTorrent                                                                                                                                                         |
| File / storage services         | SMB/CIFS, NFS, AFP, AFS, iSCSI, NVMe-oF, NBD, S3 API                                                                                                                                                          |
| Remote login / desktop          | Telnet, SSH, RDP, VNC/RFB, X11 protocol, SPICE                                                                                                                                                                |
| Network management              | SNMP, Syslog, IPFIX, NetFlow, sFlow, OpenTelemetry OTLP, RMON                                                                                                                                                 |
| Time                            | NTP, SNTP, PTP / IEEE 1588, NTS                                                                                                                                                                               |
| Directory / identity            | LDAP, LDAPS, Kerberos, RADIUS, TACACS+, Diameter, OAuth 2.0, OpenID Connect, SAML, SCIM, ACME, OCSP, CMP, SCEP, EST                                                                                           |
| Voice / video                   | SIP, SDP, RTP, RTCP, RTSP, H.323, MGCP, H.248/MEGACO, WebRTC, ICE, STUN, TURN, MSRP                                                                                                                           |
| IoT / messaging                 | MQTT, MQTT-SN, CoAP, AMQP, STOMP, DDS, RTPS, LwM2M, Matter                                                                                                                                                    |
| Industrial automation           | OPC UA, OPC DA legacy, Modbus TCP, Modbus RTU, EtherNet/IP / CIP, PROFINET, EtherCAT mailbox protocols, BACnet/IP, KNXnet/IP, DNP3, IEC 60870-5-104, IEC 61850 MMS, GOOSE, Sampled Values, CANopen, SAE J1939 |
| Databases                       | PostgreSQL wire protocol, MySQL protocol, TDS / SQL Server, MongoDB wire protocol, Redis RESP, Cassandra CQL, Couchbase memcached/binary protocol                                                             |
| Message brokers / streaming     | AMQP, MQTT, STOMP, Kafka protocol, NATS, Redis Pub/Sub, ZeroMQ/ZMTP                                                                                                                                           |
| Printing                        | IPP, LPD/LPR, JetDirect/AppSocket, SMB printing                                                                                                                                                               |
| Version control / dev           | Git smart protocol, Subversion protocol, Mercurial wire protocol                                                                                                                                              |
| Monitoring / logging            | Prometheus exposition over HTTP, OTLP, StatsD, Graphite plaintext protocol                                                                                                                                    |
| Gaming / realtime app protocols | RakNet, ENet, Steam Datagram Relay protocol family, custom UDP protocols                                                                                                                                      |
| Blockchain / P2P                | Bitcoin P2P protocol, Ethereum devp2p, libp2p, IPFS Bitswap                                                                                                                                                   |
| Legacy OSI applications         | FTAM, X.400, X.500 DAP, CMIP, ROSE, ACSE                                                                                                                                                                      |

## Cross-layer

| Protocol           | Usual classification  | Why awkward                                                                      |
| ------------------ | :-------------------- | -------------------------------------------------------------------------------- |
| ARP                | L2/L3 boundary        | Uses L2 broadcast to resolve L3 addresses                                        |
| MPLS               | L2.5 / L3             | Label switching below IP routing but above link framing                          |
| TLS                | L5/L6                 | Runs above TCP/UDP but below many application protocols                          |
| QUIC               | L4-ish / L7-ish       | Provides transport semantics in user space over UDP; tightly coupled with HTTP/3 |
| RTP/RTCP           | L4/L7 boundary        | Transport-like media framing, but application-specific                           |
| SIP/SDP            | L5/L7                 | Session setup for voice/video applications                                       |
| VXLAN/GENEVE/NVGRE | Overlay L2 over L3/L4 | Encapsulate Ethernet frames inside IP/UDP/GRE                                    |
| IPsec              | L3/L4 boundary        | Protects IP packets; control plane uses IKE over UDP                             |
| 802.1X/EAPOL       | L2/auth boundary      | Link-layer access control carrying authentication                                |
| OPC UA             | L7                    | Has its own service model, encoding, security, and transport mappings            |

## Notes

See also IANA IP protocol numbers, IANA service/port names, or IEEE 802/EtherType values.
Those registries are machine-readable and much closer to exhaustive for their own domains.
