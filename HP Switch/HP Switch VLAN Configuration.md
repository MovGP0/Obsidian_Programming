---
title: VLAN Configuration
---
### VLAN einrichten
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Create a VLAN
`vlan VLANNUMBER`
`description VLANNAME`
`quit`
* VLANs anzeigen
`display vlan`
* Speichern
`save`
* VLAN löschen
`undo vlan VLANNUMBER`

### Access-Modus | Port zu einem VLAN zuweisen
```ad-info
Default-Moduls für Ports, an denen ein Gerät angeschlossen ist, welches in nur einem VLAN aktiv sein muss.
```
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Port konfigurieren
`interface GigabitEthernet1/0/1` (Port 1)
`port link-type access`
`port access vlan VLANNUMBER`
* Konfiguration anzeigen
`display interface brief`
* Änderungen speichern
`save`
* VLAN-Zuordnung entfernen
`interface GigabitEthernet1/0/1` (Port 1)
`undo port link-type`
`undo port access vlan`

### Trunk-Modus | Port zu mehreren VLANs zuweisen
```ad-info
Um einem Port mehreren VLANs zuzuordnen, muss dieser in den *Trunk*-Modus gesetzt werden. Wird zB. verwendet, um mehrere Switches miteinander zu verbinden.
```
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Port konfigurieren
`interface GigabitEthernet1/0/48` (Port 48)
`port link-type trunk`
`port trunk pvid vlan 1`
`port trunk permit vlan VLANNUMBER VLANNUMBER VLANNUMBER`
* Konfiguration anzeigen
`display port trunk`
* Konfiguration entfernen
`interface GigabitEthernet1/0/48` (Port 48)
`undo port link-type`
* Konfiguration speichern
`save`

### Hybrid-Modus | Port zu getaggten und ungetaggten VLANs zuweisen
```ad-info
Um einen Port zu VLANs hinzuzufügen, welche nicht explizit angelegt wurden.
```
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Port konfigurieren
`interface GigabitEthernet1/0/1` (Port 1)
`port link-type hybrid`
`port hybrid vlan VLANNUMBER VRLANNUMBER tagged`
`port hybrid vlan VLANNUMBER VRLANNUMBER untagged`
* Konfiguration anzeigen
`display port hybrid`
* Konfiguration speichern
`save`
* Konfiguration entfernen
`interface GigabitEthernet1/0/1` (Port 1)
`undo port link-type`

### VLAN IP-Konfiguration
```ad-info
Um das Routing zwischen VLANs zu ermöglichen, kann ein virtuelles Interface mit IP-Adresse erstellt werden.
```
Für ein VLAN wird ein virtuelles Interface `vlan-interfaceVLANNUMBER` erstellt.
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* IP-Adresse für VLAN konfigurieren
`interface vlan-interface10` Interface von VLAN Nummer 10
`ip address 192.168.10.1 255.255.255.0` IP-Adresse des virtuellen Interfaces
`ip routa-static 0.0.0.0 0.0.0.0 192.168.10.100` Default-Route konfigurieren
`undo shutdown`
* Konfiguration anzeigen
`display interface vlan-interface10`
* Routing-Tabelle anzeigen
`display ip routing-table`
* Konfiguration speichern
`save`