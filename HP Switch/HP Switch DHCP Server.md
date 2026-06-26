---
title: DHCP Server
---
### DHCP-Server einrichten
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* DHCP-Scope anlegen
Es können mehrere DHCP-Scopes angelegt werden. zB. eine pro VLAN.
`dhcp server ip-pool POOLNAME`
`network 192.168.10.0 mask 255.255.255.0`
`gateway-list 192.168.20.1`
`dns-list 192.168.10.6`
`domain-name domain.com`
`expired day 7`
* DHCP-Konfiguration anzeigen
`display dhcp server tree pool POOLNAME`
`display dhcp server ip-in-use all`
* Speichern
`save`