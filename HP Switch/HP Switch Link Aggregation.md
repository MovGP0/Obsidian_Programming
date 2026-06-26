---
title: VLAN Link Aggregation
---
```ad-info
Mehrere Ports aus Performance- oder Redundanzgründen zu einem zusammenschalten.
```
## Link Aggregation mit mehreren VLANs
Wird zB. für Verbindung zwischen Switches verwendet.

* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* virtuelles Interface erstellen
`interface Bridge-Aggregation LINKNUMBER`
`link aggregation mode dynamic` ([LACP](https://en.wikipedia.org/wiki/Link_aggregation#Link_Aggregation_Control_Protocol) aktivieren)
`port link type trunk` (Trunk-Modus; siehe [[HP Switch VLAN Configuration]])
`port trunk pvid vlan VLANNUMBER` (default VLAN)
`port trunk permit vlan VLANNUMBER VLANNUMBER VLANNUMBER VLANNUMBER` (VLANs zuordnen)
`quit`
* Ports dem Interface hinzufügen
`interface GigabitEthernet1/0/PORTNUMBER`
`port link-aggregation group LINKNUMBER`
`interface GigabitEthernet1/0/PORTNUMBER`
`port link-aggregation group LINKNUMBER`
* Einstellungen ansehen
`display link-aggregation verbose`
* Speichern
`save`
* Interface löschen
`undo interface Bridge-Aggregation LINKNUMBER`

### Link Aggregation mit einem VLAN
Wird zB. für Server in einem VLAN verwendet.

* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* virtuelles Interface erstellen
`interface Bridge-Aggregation LINKNUMBER`
`link aggregation mode dynamic` ([LACP](https://en.wikipedia.org/wiki/Link_aggregation#Link_Aggregation_Control_Protocol) aktivieren)
`port link-type access` (Access-Modus; siehe [[HP Switch VLAN Configuration]])
`port access vlan VLANNUMBER`
* Ports dem Interface hinzufügen
`interface GigabitEthernet1/0/PORTNUMBER`
`port link-aggregation group LINKNUMBER`
`interface GigabitEthernet1/0/PORTNUMBER`
`port link-aggregation group LINKNUMBER`
* Einstellungen ansehen
`display link-aggregation verbose`
* Speichern
`save`
* Interface löschen
`undo interface Bridge-Aggregation LINKNUMBER`

## Link Aggregation in Windows Server einrichten
* **Server Manager** öffnen
* NIC Teaming
* **Task** / **New Team**
* Teaming Mode: *LACP*
* Load Balancing Mode: *Dynamic*

PowerShell: [new-NetLbfTeam](https://docs.microsoft.com/en-us/powershell/module/netlbfo/new-netlbfoteam)

### Referenzen
[Link aggregation – Wikipedia](https://en.wikipedia.org/wiki/Link_aggregation)