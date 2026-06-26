---
title: Initial Configuration
---
### Verbindung mit Switch herstellen / Switch Initialisieren
* Mit PUTTY über serielle Verbindung und Konsolenkabel vom Switch verbinden
* Benutzername `admin` ohne Passwort
* IP-Adresse für Web-Interface mit `ipsetup` konfigurieren
`ipsetup ip-address 192.168.1.1 255.255.255.0 default-gateway 192.168.1.1`
* Konfiguration ansehen
`summary`
* Ping ausführen
`ping 192.168.1.5`
* Verfügbare Kommandos auflisten
`?`
* Alle Kommandos anzeigen
`_cmdline-mode on` admin-Passwort muss eingegeben werden
* Änderungen speichern
`save`
* Gesamte Konfiguration ausgeben
`display current-configuration`

### Passwort-Recovery
* `CRL+B` beim Bootvorgang drücken. Es sollte das Boot-Menü erscheinen.
* Mit `Skip current system configuration` startet der Switch ohne Konfiguration. Anschließend `Reboot` durchführen
* mit `initialize` kann die Konfiguration zurückgesetzt werden

### Benutzergruppe anlegen
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Gruppe anlegen. Level 1 für User, Level 3 für Admins
`user-group ADMINGROUPNAME`
`authorization-attribute level 3`
`user-group USERGROUPNAME`
`authorization-attribute level 1`
`quit`
* Benutzergruppen anzeigen
`display user-group`
* Einstellungen speichern
`save`
* Gruppe löschen
`undo user-group GROUPNAME`

### Benutzer anlegen
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Benutzer anlegen und konfigurieren
`local-user USERNAME`
`password simple PASSWORD`
`group GROUPNAME`
`service-type ssh telnet web terminal`
`quit`
* Lokale Benutzer anzeigen
`display local-user`
* Einstellungen speichern
`save`
* Benutzer löschen
`undo local-user USERNAME`

### Remote-Access konfigurieren
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Service aktivieren
`telnet server enable`
`ssh server enable`
* Service deaktivieren
`undo telnet server enable`
`undo ssh server enable`
* Service-Status anzeigen
`display ssh server status`
* Service-Authentifizierung mit Benutzername/Passwort konfigurieren
``user-interface vty 0 1 5`
`authentication-mode schee`
* Web Interface aktivieren
`ip http enable`
`ip https enable`
* Web Interface deaktivieren
`undo ip http enable`
`undo ip https enable`
* Web Interface Status anzeigen
`display ip http`
`display ip https`
* Einstellungen speichern
`save`

