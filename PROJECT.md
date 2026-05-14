# PoseidonRecordFE

Frontend Angular 13 dell'applicazione **PoseidonRecord**: una web app per la gestione di record sportivi di nuoto (atleti, gare, tempi, record societari, start list) a cui si sono aggiunti, nel tempo, alcuni moduli di utilità personale (palestra, macchine, pizza, chat).

## Stack tecnologico

- **Framework**: Angular 13.0.4
- **UI**: Angular Material 13 + ng-bootstrap 12 + Bootstrap 4.6
- **Icone**: FontAwesome 6, Bootstrap Icons
- **PDF**: ng2-pdf-viewer
- **Routing**: `HashLocationStrategy`
- **Cookie**: ngx-cookie-service
- **Test**: Karma + Jasmine
- **Linguaggio**: TypeScript 4.4

## Backend

Le chiamate REST puntano a un backend Spring (presumibilmente `poseidonRecord` lato server):

- Produzione: `http://195.20.241.70:8080/poseidonRecord`
- Locale (commentato): `http://localhost:8080/poseidonRecord`

L'URL è hard-coded in `record.service.ts` e `chat.service.ts`.

## Struttura dei moduli

Routing definito in `src/app/app-routing.module.ts`:

| Path           | Componente             | Funzione                                           |
|----------------|------------------------|----------------------------------------------------|
| `/`            | `LoginComponent`       | Login utente (credenziali via `/utenti/login`)     |
| `/menu`        | `MenuComponent`        | Menu principale con tile delle sezioni             |
| `/atleti`      | `AtletiComponent`      | Ricerca atleti e relative gare                     |
| `/add-record`  | `AddRecordComponent`   | Inserimento nuovi record (solo super user)         |
| `/societari`   | `SocietariComponent`   | Elenco record societari                            |
| `/start-list`  | `StartListComponent`   | Download start list (file da backend)              |
| `/macchine`    | `MacchineComponent`    | Gestione macchine / veicoli passeggeri             |
| `/pizza`       | `PizzaComponent`       | Modulo "pizza" (teglie)                            |
| `/app-palestra`| `PalestraComponent`    | Scheda palestra (con visualizzatore PDF)           |
| `/c`           | `ChatComponent`        | Chat interna con polling ogni 2s                   |

Componenti di supporto: `HeaderComponent`, `FooterComponent`, `ErrordialogComponent`, `MacchinaComponent`, `VeicoloPasseggeriComponent`.

## Domain model

Le entità principali sono in `src/app/`:

- `Record`, `RecordDto`, `RecordSocietario` — record di gara
- `Atleta`, `Utente`, `MacchinaUtente` — utenze
- `Gara`, `Stili`, `Categorie` — anagrafiche sportive
- `StartList` — file delle start list
- `Esito` — wrapper di risposta backend
- `Macchina`, `Prenotazioni`, `Teglia` — moduli accessori

## Servizi

- **`RecordService`** (`record.service.ts`): autenticazione, anagrafiche (stili, categorie, metri), CRUD record, gestione file (download/list start list).
- **`ChatService`** (`chat.service.ts`): get/post messaggi su `/chat/messaggi/...`, con endpoint `new/{ultimoId}` per il polling incrementale.
- **`MacchineService`** (`macchine.service.ts`): gestione veicoli.

## Comandi

```bash
npm start          # ng serve  -> http://localhost:4200
npm run build      # build di produzione in dist/
npm run watch      # build incrementale (config dev)
npm test           # test unit via Karma
```

## Note operative

- Il branch di lavoro è `develop`; il branch principale è `master`.
- Gli ultimi commit (`chat feature`, `miglioramento`) riguardano lo sviluppo del modulo chat.
- Il backend URL è duplicato nei service: per puntare in locale serve scommentare la riga `localhost` in entrambi i file.
- Il routing usa `HashLocationStrategy` (URL con `#`), utile per deploy su hosting statici senza rewrite lato server.
