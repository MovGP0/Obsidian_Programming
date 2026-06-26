---
title: Access Control Lists (ACLs)
---
### ACL erstellen
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* ACL erstellen
`acl number ACLNUMBER`
`description ACLNAME`
`rule 0 deny ip destination 192.168.10.76`
* Speichern
`save`
* ACL löschen
`undo acl number ACLNUMBER`
### Access class erstellen
```ad-info
Eine ACL muss einer access class zugeordnet werden.
```
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Access class erstellen und ACL zuweisen
`traffic classifier CLASSIFIERNAME operator and`
`if-match acl ACLNUMBER`
* Access class anzeigen
`display traffic classifier CLASSIFIERNAME
* Speichern
`save`
* Access class löschen
`undo traffic classifier CLASSIFIERNAME

### Behavior erstellen
```ad-info
Aktion die ausgefüht wird. (deny oder allow)
```
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Behavior erstellen
`traffic behavior BEHAVIORNAME`
`filter deny`
* Speichern
`save`
* Behavior löschen
`undo traffic behavior BEHAVIORNAME`

### Access policy erstellen
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Access policy erstellen
`qos policy POLICYNAME`
`classifier CLASSIFIERNAME behavior BEHAVIORNAME`
* Access policy anzeigen
`display qos policy POLICYNAME`
* Speichern
`save`
* Access policy löschen
`undo qos policy POLICYNAME`

### Access policy einem Interface zuweisen
* Konfigurationsmodus aktivieren
`_cmdline-mode on`
`system-view`
* Policy zuweisen
`interface GigabitEthernet1/0/20`
`qos apply policy POLICYNAME inbound`
* Konfiguration anzeigen
`display qos policy interface GigabitEthernet1/0/20`
* Speichern
`save`
* Zuweisung aufheben
`interface GigabitEthernet1/0/20`
`undo qos policy POLICYNAME inbound`