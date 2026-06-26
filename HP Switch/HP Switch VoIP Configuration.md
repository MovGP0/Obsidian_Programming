---
title: Voice over IP (VoIP) Configuration
---
* VLAN für VoIP erstellen
[[HP Switch VLAN Configuration]]

### LLDP (Link Layer Discovery Protocol) Konfigurieren
```ad-info
LLDP wird verwendet, wenn auf einem Switch-Port mehrere Devices angeschlossen sind, welche jeweils einem anderen VLAN zugeordnet werden. Dies passiert zB. wenn der Ethernet des PC's durch das VoIP Gerät durchgeschliffen wird.
```
### LLDP aktivieren und MAC-Adresse freischalten
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* LLDP aktivieren
`lldp enable`
`lldp compliance cdp` CDP-Kompatibilitätsmodus (optional)
* Prüfen ob das VoIP-Device erkannt wurde und MAC-Adresse auslesen
`display lldp neighbor-information interface GibabitEthernet1/0/17 brief`
Die erste Hälfte der MAC-Adresse ist die OUI (Hersteller-ID)
* OUI-Adresse registrieren
Uber die Maske wird definiert, dass jedes Gerät dieser Serie auf dem Port zulässing ist, damit das Gerät ggf. getauscht werden kann.
`voice vlan mac-address XXXX-XXXX-XXXX mask FFFF-FF00-0000 description DEVICEVENDOR`
* Konfiguaration löschen
`undo voice vlan security enable`
• Speichern
`save`

### VLANs zuordnen
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Switch port in Trunk Modus schalten (mehrere VLANs) und default-VLAN (für PC) konfigurieren
`interface GigabitEthernet1/0/17`
`port link-type trunk`
`port trunk pvid vlan VLANNUMBER` (VLAN des PCs)
`port trunk permit vlan VLANNUMBER` (VLAN des PCs)
* VLAN für VoIP konfigurieren
`interface GigabitEthernet1/0/17`
`voice vlan VLANNUMBER enable` (VLAN des VoIP devices)
* Konfiguration prüfen
`display voice vlan oui`
`display voice vlan state`
* Speichern
`save`
* VoIP deaktivieren
`undo voice vlan enable`

### Externe Links
* [GitHub - lahell/PSDiscoveryProtocol: Capture and parse CDP and LLDP packets on local or remote computers](https://github.com/lahell/PSDiscoveryProtocol)
* [PowerShell Gallery | PSDiscoveryProtocol 1.0.0](https://www.powershellgallery.com/packages/PSDiscoveryProtocol/1.0.0)