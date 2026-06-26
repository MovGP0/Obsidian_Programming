---
title: Port isolation
---
```ad-info
Disabling all network traffic to a given network port
```
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Port-Isolation aktivieren
`interface GigabitEthernet1/0/20`
`port-isolate enable`
* Port-Isolation anzeigen
`display port-isolate group`
* Speichern
`save`
* Port-Isolation deaktivieren
`interface GigabitEthernet1/0/20`
`undo port-isolate enable`