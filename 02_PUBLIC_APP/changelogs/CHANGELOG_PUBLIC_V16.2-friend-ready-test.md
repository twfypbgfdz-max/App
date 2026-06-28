# CHANGELOG PUBLIC V16.2-friend-ready-test

## Neu

- Neue Public-Testversion `plateau-brecher-public-v16_2-friend-ready-test.html` auf Basis von `plateau-brecher-public-v16_1-pwa-install-test.html`.
- `APP_VERSION` auf `V16.2-friend-ready-test` und `BUILD_DATE` auf `2026-06-28` gesetzt.
- Friend-ready Setup mit klaren Startwegen:
  - Sofort lokal starten
  - Mit Cloud-Code nutzen
- Neuer und bestehender Cloud-Code sind in der UI getrennt:
  - Neuer Freund: Spitzname + PIN, Cloud-Code erstellen.
  - Bestehender Freund: User-Code + PIN, einloggen.
- User-Code wird nach Cloud-Erstellung/Login im Setup-Status sichtbar.
- Fehlertexte fuer Freunde verbessert.
- Cloud-Speicherstatus beim Speichern verbessert:
  - Cloud-Erfolg: `Gespeichert - Cloud Backup aktualisiert`
  - Cloud-Fehler: lokales Speichern bleibt erhalten, Cloud-Fehler wird klar angezeigt.
- Install-Hinweis bleibt erhalten und kann ausgeblendet/wieder angezeigt werden.
- Mini-Datenschutz-Hinweis im Setup ergaenzt.
- Manifest `manifest-v16_2-friend-ready-test.webmanifest` auf die v16.2-Testdatei gesetzt.

## Bewusst nicht umgesetzt

- Kein Service Worker, um Cache-Probleme in der Testversion zu vermeiden.
- Kein Deployment, kein Push, keine Stable-Dateien.
- Kein Payment, Stripe, Supabase oder App-Store-Flow.
- Apps Script nicht geaendert.

## Tests

- Lokalmodus manuell testen.
- Neuer Freund: Cloud-Code erstellen und User-Code notieren.
- Bestehender Freund: Login mit User-Code und PIN.
- Cloud-Speichern: `trainingLog` in `CloudData`, `saveCloudData` in `Logs`.
- Install-Hinweis ausblenden und wieder anzeigen.
- Disabled-Test im Sheet.
