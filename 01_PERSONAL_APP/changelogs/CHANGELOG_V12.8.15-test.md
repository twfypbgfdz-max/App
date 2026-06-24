# V12.8.15-test - PLAN-Fortschreibung als Vorschlag

Status: Testversion, nicht Stable, nicht deployt.

## Geaendert

- Neue Testdatei erstellt: `plateau-brecher-v12_8_15-test.html`.
- Die PLAN-Diagnose zeigt bei fehlender aktueller Kalenderwoche einen kompakten Vorschlag fuer die naechste Planwoche.
- Der Vorschlag wird aus der letzten vollstaendigen PLAN-Woche vor der Luecke abgeleitet.
- Angezeigt werden fehlende Woche, Vorlage, Montag/Dienstag/Mittwoch/Freitag/Samstag mit Datum, TAG und Uebungsanzahl.
- Der Hinweis `Nur Vorschlag, wurde nicht gespeichert.` wird direkt in der Diagnose angezeigt.

## Bewusst nicht geaendert

- Keine PLAN-Daten.
- Keine PLAN-Mutation und keine automatische Plan-Erzeugung.
- Keine Sheet-Aktion und keine automatische Sheet-Erweiterung.
- Keine Stable-Datei.
- Keine Apps-Script-Datei.
- Keine Save-/Sync-, PR-, Stats- oder Bestleistungen-Logik.

## Testpunkte

- `23.06.2026`: normaler Trainingstag, keine Vorschlagsbox.
- `19.10.2026`: Diagnose aktiv, Vorschlag aus letzter vollstaendiger Woche `12.10-17.10`.
- Vorschlag veraendert das echte `PLAN` Array nicht.
- Inline-JavaScript-Syntax pruefen.
