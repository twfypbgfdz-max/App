# V12.8.14-test - App-PLAN-Gap-Diagnose

Status: Testversion, nicht Stable, nicht deployt.

## Geaendert

- Neue Testdatei erstellt: `plateau-brecher-v12_8_14-test.html`.
- App-PLAN-Daten werden diagnostisch nach Kalenderwochen Montag bis Sonntag ausgewertet.
- Fehlende Kalenderwochen zwischen erstem und letztem PLAN-Datum werden erkannt.
- Die bestehende Diagnose bei fehlender aktueller PLAN-Woche wurde erweitert:
  - aktuelle Kalenderwoche
  - letzter vorhandener Planpunkt
  - naechster vorhandener Planpunkt
  - kompakte Liste erkannter PLAN-Gaps

## Bewusst nicht geaendert

- Keine PLAN-Daten.
- Keine automatische Plan-Reparatur oder Plan-Erzeugung.
- Keine Stable-Datei.
- Keine Apps-Script-Datei.
- Keine Sheet-Aktion.
- Keine Sync-, PR-, Stats- oder Bestleistungen-Logik.

## Testpunkte

- `23.06.2026`: aktuelle Woche vorhanden, keine PLAN-Gap-Meldung.
- Simuliertes Datum in fehlender Woche: `ACTIVE_PLAN_DIAG` wird gesetzt und kein Training gerendert.
- `detectPlanWeekGaps()` erkennt fehlende Wochen nur diagnostisch.
- Tages-/Wochennavigation bleibt unveraendert.
- Save/Sync bleibt unveraendert.
