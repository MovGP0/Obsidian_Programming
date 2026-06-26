---
title: SNMP Monitoring
---
### SNMPv2 einrichten
```ad-warning
SNMPv2 sendet Statistiken unverschlüsselt an alle Listener-Geräte mit Gruppennamen
```
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* SNMP Agent konfigurieren
`snmp-agent`
`snmp-agent sys-info version v2c`
`snmp-agent sys-info contact user@domain.com` (Kontaktinformation)
`snmp-agent sys-info location LOCATIONNAME` (Ort wo Gerät steht)
`snmp-agent community read COMMUNITYNAME` (Gruppenname für Publish)
* Konfiguration kontrollieren
`display snmp-agent sys-info`
`snmp-agent community`
* Konfiguration speichern
`save`
* Konfiguration löschen
`undo snmp-agent community read COMMUNITYNAME` (Publishing deaktivieren)
`undo snmp-agent sys-info version v2c` (SNMPv2 deaktivieren)
`undo snmp-agent` (SNMP deaktivieren)

### SNMPv3 einrichten
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* SNMP Agent konfigurieren
`snmp-agent`
`snmp-agent sys-info version v3`
`snmp-agent sys-info contact user@domain.com` (Kontaktinformation)
`snmp-agent sys-info location LOCATIONNAME` (Ort wo Gerät steht)
`snmp-agent group v3 GROUPNAME privacy` (Gruppe erstellen)
`snmp-agent usm-user v3 monitor GROUPNAME authentication-mode sha AUTHPASSWORD privacy-mode aes128 ENRCYPTPASSWORD` (User mit Authentification und Encryption Passwort erstellen)
* Einstellungen kontrollieren
`display snmp-agent sys-info`
`display snmp-agent usm-user`
* Einstellungen speichern
`save`
* Einstellungen löschen
`undo snmp-agent usm-user v3 monitor GROUPNAME local` (User löschen)
`undo snmp-agent sys-info version v3` (SNMPv3 deaktivieren)
`undo snmp-agent` (SNMP deaktivieren)