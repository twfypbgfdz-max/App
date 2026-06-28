# CHANGELOG PUBLIC V16.0-friend-mode-test

## Neu

- Neue Public-Testversion `plateau-brecher-public-v16_0-friend-mode-test.html` auf Basis von `plateau-brecher-public-v15_3.8-test.html`.
- `APP_VERSION` auf `V16.0-friend-mode-test` und `BUILD_DATE` auf `2026-06-24` gesetzt.
- Start-/Setup-Bereich fuer Lokalmodus und Cloud-Code vorbereitet.
- Lokalmodus speichert Trainingsdaten in `localStorage` und startet ohne Google Sheet.
- Cloud-Code-Modus mit User-Code, PIN und optionalem Spitznamen vorbereitet.
- Zentrale Konstante `PUBLIC_SYNC_ENDPOINT = ''` ergaenzt; ohne Endpoint zeigt die App einen Setup-Hinweis.
- Rollen-/Statusdaten clientseitig vorbereitet: `free`, `friend`, `pro`, `active`, `disabled`.
- Kleine Speicher-Abstraktion ergaenzt: `saveAppData()`, `loadAppData()`, `syncCloudData()`.
- Neuer separater Apps-Script-Bereich `03_APPS_SCRIPT/public_sync/` fuer Public/Friend Sync angelegt.
- `PUBLIC_SYNC_ENDPOINT` fuer den aktuellen PublicSync-Web-App-Test eingetragen.
- PIN-Session wird aus `sessionStorage` wiederhergestellt, damit Cloud-Sync nach Reload weiter speichern kann.
- `saveCloudData`/`loadCloudData` serverseitig defensiv gegen deaktivierte User und Plaene ohne Cloud-Sync abgesichert.
- Manuelle Apps-Script-Testhelfer `testSaveCloudDataManual()` und `testLoadCloudDataManual()` fuer CloudData vorbereitet.
- Sync-Debug verbessert: Setup zeigt Mode, Cloud User, PIN-Session und Endpoint; Konsolenwarnungen enthalten Fehlergrund und Kontext.

## Nicht umgesetzt

- Keine echte Zahlungslogik.
- Kein Stripe, PayPal, Supabase oder App-Store-Flow.
- Kein Deployment.
- Kein Umbau der alten Public-Sheet-Logik.
- Keine Personal-App-Dateien geaendert.
- CloudData-End-to-End muss im Browser und Google Sheet noch manuell bestaetigt werden.

## Tests

- Dateiexistenz und Versionsstrings pruefen.
- Lokalmodus manuell im Browser testen.
- Cloud-Modus ohne Endpoint muss eine klare Meldung zeigen.
- Apps Script in neuem leeren Google Sheet manuell testen.
- `doPost` erlaubt nur `createOrLoginUser`, `loginUser`, `checkAccess`, `saveCloudData`, `loadCloudData`.
- `setUserStatus` und `setUserPlan` bleiben nur manuell im Apps-Script-Editor nutzbar.
