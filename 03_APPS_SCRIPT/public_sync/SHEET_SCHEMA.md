# Sheet Schema

Google Sheet: `Plateau Brecher Public Master`

## Users

`userId | displayName | pinHash | plan | status | createdAt | lastLogin | note`

- `userId`: technischer User-Code, z. B. `u_abc123`.
- `displayName`: Spitzname, kein echter Name noetig.
- `pinHash`: gehashte PIN, keine Klartext-PIN.
- `plan`: Rolle/Plan.
- `status`: Zugangszustand.

## CloudData

`userId | dataKey | payloadJson | updatedAt`

- `userId`: Besitzer der Daten.
- `dataKey`: Datenbereich.
- `payloadJson`: JSON als String, damit der erste Sync simpel bleibt.
- `updatedAt`: letzter Schreibzeitpunkt.

Beispiele fuer `dataKey`:
- `trainingLog`
- `prs`
- `plans`
- `settings`

## Logs

`timestamp | level | userId | action | message`

- Keine PINs loggen.
- Keine grossen Payloads loggen.

## AppConfig

`key | value | updatedAt`

Startwerte:
- `maintenanceMode = false`
- `publicSignupEnabled = true`
- `minAppVersion = 16.0`

## plan

- `free`: Basisfunktionen.
- `friend`: Freunde/Vollzugriff.
- `pro`: spaeter bezahlter Vollzugriff.

## status

- `active`: darf Cloud nutzen.
- `disabled`: Cloud/Pro gesperrt.
