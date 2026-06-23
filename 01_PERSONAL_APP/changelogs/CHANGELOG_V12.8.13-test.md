# V12.8.13-test - Sheet-PLAN-Diagnose beim Speichern

Status: Testversion, nicht Stable, nicht deployt.

## Geaendert

- Neue Testdatei erstellt: `plateau-brecher-v12_8_13-test.html`.
- Save-Preflight unterscheidet jetzt klar zwischen fehlenden Sheet-Planzeilen und falscher Zeilenanzahl.
- Wenn fuer das aktuelle Datum `0` Sheet-Zeilen gefunden werden, zeigt die App eine konkrete PLAN/Sheet-Diagnose mit Datum, erwarteter App-PLAN-Uebungsanzahl und gefundenen Sheet-Zeilen.
- Anzahlabweichungen melden jetzt erwartete und gefundene Zeilen.

## Bewusst nicht geaendert

- Keine Stable-Datei.
- Keine Apps-Script-Datei.
- Keine Sheet-Struktur und keine Sheet-Aktion.
- Kein Sync-Bypass.
- Keine PR-, Stats- oder Bestleistungen-Logik.

## Testpunkte

- JavaScript-Syntax der HTML-Testdatei pruefen.
- Save-Preflight mit `0` Sheet-Zeilen muss die neue klare Diagnose zeigen.
- Save-Preflight mit falscher Zeilenanzahl muss erwartete und gefundene Anzahl melden.
- Normalfall `23.06` nach Sheet-Reparatur muss weiter speicherbar bleiben.
