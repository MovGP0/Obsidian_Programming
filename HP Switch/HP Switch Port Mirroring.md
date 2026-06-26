---
title: Port Mirroring
---
```ad-info
Dient dazu den Traffic eines Ports auf einen anderen Port zu spiegeln, um den Network-Traffic analysieren zu können.
```
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Mirroring einrichten
`interface GigabitEthernet1/0/1`
`mirroring-group GROUPNUMBER monitor-port` (Monitoring)
`interface GigabitEthernet1/0/2` 
`mirroring-group GROUPNUMBER mirroring-port both` (Mirroring)
* Mirror-Gruppe anzeigen
`display mirroring-group GROUPNUMBER`
* Speichern
`save`
* Mirror-Gruppe löschen
`undo mirroring-group GROUPNUMBER`