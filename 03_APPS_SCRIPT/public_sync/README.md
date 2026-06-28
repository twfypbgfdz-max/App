# Public/Friend Cloud Sync

## Zweck

Public/Friend Cloud Sync fuer die Plateau Brecher Public App.

Wichtig:
- Nicht Personal-App.
- Nicht altes Public-Sheet.
- Neues separates Public-Master-Sheet.

## Setup

1. Neues leeres Google Sheet erstellen: `Plateau Brecher Public Master`
2. Erweiterungen -> Apps Script oeffnen.
3. `PublicSync.gs` einfuegen.
4. `setupPublicMasterSheet()` einmal manuell ausfuehren.
5. Berechtigungen bestaetigen.
6. Als Web-App deployen.
7. Web-App-URL spaeter in der Public-App-Konfiguration eintragen.

## Sicherheit

- Keine echten Namen noetig, Spitzname reicht.
- PIN wird gehasht gespeichert.
- Der Hash nutzt `Utilities.computeDigest` mit konstantem Prefix/Salt im Script.
- Das ist fuer die Freunde-Testphase gedacht und kein vollwertiges Auth-System wie Supabase oder Firebase.
- `disabled` sperrt Cloud-Sync und Pro-/Friend-Zugang.
- Lokale Daten auf dem Geraet koennen nicht zuverlaessig aus der Ferne geloescht werden.
- Keine PINs loggen und keine grossen Payloads in Logs schreiben.

## Testplan Apps Script

1. `setupPublicMasterSheet()` ausfuehren.
2. Pruefen, ob `Users`, `CloudData`, `Logs`, `AppConfig` angelegt wurden.
3. Pruefen, ob Header und AppConfig-Startwerte gesetzt wurden.
4. `createOrLoginUser('Test', '1234')` testen.
5. `loginUser(userId, '1234')` testen.
6. `checkAccess(userId, '1234')` testen.
7. `saveCloudData(userId, '1234', 'trainingLog', '{"ok":true}')` testen.
8. `loadCloudData(userId, '1234', 'trainingLog')` testen.
9. Mit `setUserStatus(userId, 'disabled')` deaktivieren und `checkAccess` erneut testen.
