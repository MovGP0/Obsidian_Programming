---
title: Quality of Service (QoS) Traffic Shaping
---
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Bandbreitenlimitierung auf Interface konfigurieren
`interface GigabitEthernet1/0/10`
`qos gts any ci 8192` (Bandwith limitation of all traffic to $8192\ kib/s = 1\ MiB/s$)
* QoS anzeigen
`display qos gts interface GigabitEthernet1/0/10`
* Speichern
`save`
* Bandbreitenlimitierung aufheben
`interface GigabitEthernet1/0/10`
`undo qos gts any`