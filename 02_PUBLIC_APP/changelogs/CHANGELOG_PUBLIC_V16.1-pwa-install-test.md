# CHANGELOG PUBLIC V16.1-pwa-install-test

## Neu

- Neue Public-Testversion `plateau-brecher-public-v16_1-pwa-install-test.html` auf Basis von `plateau-brecher-public-v16_0-friend-mode-test.html`.
- `APP_VERSION` auf `V16.1-pwa-install-test` und `BUILD_DATE` auf `2026-06-28` gesetzt.
- Install-Hinweis im Setup ergaenzt:
  - iPhone/Safari: Teilen - Zum Home-Bildschirm - Hinzufuegen.
  - Android/Chrome: Menue - App installieren oder Zum Startbildschirm hinzufuegen.
- Button `Anleitung ausblenden` speichert den Status in `localStorage`.
- Manifest `manifest-v16_1-pwa-install-test.webmanifest` und einfaches SVG-Icon vorbereitet.

## Bewusst nicht umgesetzt

- Kein Service Worker registriert, um Cache-Probleme und alte Testversionen zu vermeiden.
- Kein Deployment, kein Push, keine Stable-Dateien.
- Keine Payment-, Supabase- oder App-Store-Logik.
- Friend-Mode, Cloud-Code, Lokalmodus und CloudData-Sync bleiben aus v16.0 uebernommen.

## Hinweise

- iPhone installiert PWAs ueber Safari im Teilen-Menue.
- Browser-/PWA-Cache kann alte Versionen zeigen.
- Bei Problemen Website-Daten loeschen und die App neu oeffnen.

## Tests

- PC oeffnet App.
- Lokalmodus funktioniert.
- Cloud-Login funktioniert.
- `trainingLog` schreibt in `CloudData`.
- iPhone Safari zeigt Install-Hinweis.
- Homescreen-App oeffnet.
- Keine Personal-Dateien geaendert.
