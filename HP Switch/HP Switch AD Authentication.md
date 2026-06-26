---
title: Active Directory / RADIUS Authentication
---
```ad-info
Zentrale Authentifizierung am HP Switch mittels RADIUS-Protokoll, welches zB. von ActiveDirectory unterstützt wird.
```
### Einrichtung im Active Directory
* Benutzergruppen für Switch-Manangement im AD erstellen:
    * Switch-Admins
    * Switch-Users

#### RADIUS-Server einrichten
* Serverrolle **Network Policy and Access Services** installieren
* Anwendung **Network Policy Server** starten
* **NPS (local)** und **Register server in Active Directory** auswählen
    * Server wird in Gruppe *RAS und IAS Server* eingetragen
* Ordner **Radius clients and servers**, **Radius clients**, **new**
    * Radius Klient aktivieren
    * Alias (zB. erster Teil des DNS-Namens) als *Friendly Name* eintragen
    * IP-Addresse bzw. DNS-Adresse eintragen
    * Passwort als *Shared Secret* eintragen

#### Network Policy erstellen
* **Policies**, **Network Policies**, **New**
* Policy benennen, **User-Groups** und erstellte Benutzergruppe wählen
* **Access granted** aktivieren
* Encryption Typ auswählen ([PAP](https://de.wikipedia.org/wiki/Password_Authentication_Protocol) ist unverschlüsselt)
* RADIUS Attribute *Framed Protocol* und *Service-Type* entfernen
* Attribut *Service-Type* **Login** hinzufügen
* Attribut *Vendor-Specific* mit Vendor-Code **25506** hinzufügen (Client muss HP-Device sein)
* *Vendor-assigned Attribute Number* **29** mit Value **3** (3 = Admin-Berechtigung; 1 = User-Berechtigung)

### RADIUS-Server verbinden
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* RADIUS-Server Verbindung
`radius scheme SCHEMA` (`SCHEMA` ist Name des Schemas)
`server type extended`
`primary authentication 192.168.10.10` (IP des RADIUS-Auth-Servers)
`security policy server 192.168.10.10` (IP des RADIUS Policy-Servers)
* Einstellungen kontrollieren
`display radius scheme`
* Speichern
`save`
* Löschen
`undo radius scheme SCHEMA`

#### Default User-Domäne einrichten
* Domäne einrichten
`domain DOMAINNAME`
`authentication login radius-scheme SCHEMA local` (für Authentifizierung verwenden)
`authorization login radius-scheme SCHEMA local` (für Authorisierung verwenden)
`domain default DOMAINNAME` (Domäne als Default setzen)
* Domäne kontrollieren
`display domain DOMAINNAME`
* Speichern
`save`
* Domäne löschen
`undo domain DOMAINNAME`
