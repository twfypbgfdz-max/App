# V12.8.12-test - PLAN-Luecke 22.06 und Startdiagnose

Status: Testversion, nicht Stable, nicht deployt.

## Geaendert

- Neue Testdatei erstellt: `plateau-brecher-v12_8_12-test.html`.
- Fehlenden PLAN-Block `22.06`, `23.06`, `24.06`, `26.06`, `27.06` ergaenzt.
- Der Block wurde als eigener naechster Wochenblock nach Zyklus 2 / Woche 4 eingefuegt, nicht als zweite Woche 4.
- Startdiagnose ergaenzt: Wenn die aktuelle Kalenderwoche im PLAN fehlt, zeigt die App eine Diagnose statt still auf `C0/W0/D0` zurueckzufallen.

## Bewusst nicht geaendert

- Keine Stable-Datei.
- Keine Public-App.
- Kein Apps-Script-Deployment.
- Keine Sync-, PR-, Stats- oder Bestleistungen-Logik.
- Keine bestehenden Trainingsdaten oder Sheet-Werte.

## Testpunkte

- JavaScript-Syntax der HTML-Testdatei pruefen.
- Datumstest `22.06.2026` muss Zyklus 2 / Woche 5 / TAG 1: PULL finden.
- Datumstest `23.06.2026` muss Zyklus 2 / Woche 5 / TAG 2: PUSH finden.
- Datumstest `26.06.2026` muss Zyklus 2 / Woche 5 / TAG 5: TORSO finden.
- Eine absichtlich fehlende Kalenderwoche muss eine PLAN-Diagnose zeigen und kein altes Standardtraining laden.
