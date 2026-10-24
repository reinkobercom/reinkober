# reinkober.com – Website

Nachbau der bisherigen Onepage-Website mit [Astro](https://astro.build), gehostet bei Vercel.
Alle Seiten sind statisch (schnell, sicher); nur der Formularversand läuft als kleine Server-Funktion.

## Wo wird was gepflegt?

| Was | Datei |
|---|---|
| Kontaktdaten, Telefon, E-Mail, Social Media, Öffnungszeiten | `src/data/site.ts` |
| **Empfänger der Formulare** (je Formular) und Absender | `src/data/site.ts` → `formRecipients`, `formSender` |
| Formular-Fragen, Texte, Pflichtfelder, Danke-Seite | `src/data/forms.ts` |
| Sektionen ein-/ausschalten | `src/data/sections.ts` (`true` = sichtbar, `false` = aus) |
| Termine/Hinweise mit Zeitraum | `src/data/announcements.ts` |
| Karriere: offene Stellen, „Wir bieten dir…“, Ablauf (derzeit aus) | `src/data/career.ts` (`enabled: true` schaltet ein) |
| Cookie-Banner-Texte und Dienste | `src/components/global/CookieConsent.astro` |
| Seitentitel & Beschreibungen (Google) | `src/data/meta.ts` |
| Seiten ohne Google-Indexierung (noindex) | `src/data/seo.mjs` |
| Bilder & Alt-Texte | `src/data/images.ts`, Bilddateien in `src/assets/img/` |
| Hauptnavigation & Header-Button | `src/data/navigation.ts` |
| Tracking-IDs (Google Ads, Meta, OpenAI) | `src/data/site.ts` → `tracking` |
| Seiteninhalte (Texte, Aufbau) | `src/content/pages/<seite>.json` |

Änderungen werden aktiv, sobald sie ins GitHub-Repository gepusht sind – Vercel baut die Seite dann automatisch neu (ca. 2 Minuten).

### Texte ändern
Die Inhalte jeder Seite stehen in `src/content/pages/<seite>.json` (z. B. `index.json` = Startseite).
Mit der Suche (Strg/Cmd+F) den bisherigen Text finden und ersetzen. HTML-Auszeichnungen wie
`<strong>` (fett) oder `<mark data-hl="brush-underline">` (blaue Pinsel-Unterstreichung) bitte stehen lassen.

### Sektion ausblenden
In `src/data/sections.ts` bei der Seite die Zeile mit dem Sektionsnamen von `true` auf `false` setzen.

### Formular-Empfänger ändern
In `src/data/site.ts` unter `formRecipients` die Adresse(n) beim jeweiligen Formular ändern, z. B.
`kontakt: ['simon@reinkober.com', 'info@reinkober.com']`.

### Rechtstexte
Impressum und Datenschutzerklärung wurden für den Umzug aktualisiert (DDG statt TMG, kein Hinweis mehr auf die
eingestellte EU-OS-Plattform, neue Dienstleister Vercel/Resend, Einwilligungs-Banner, Bewerberdaten).
**Bitte vor dem Livegang anwaltlich prüfen lassen.** Die Texte stehen in `src/content/pages/impressum.json`
bzw. `datenschutz.json`. Wenn ein neuer Dienst eingebunden wird, muss die Datenschutzerklärung ergänzt werden.

## Formulare

Alle Formulare senden an `/api/anfrage` (`src/pages/api/anfrage.ts`). Der Versand läuft über **Resend**
mit dem Absender `leads@reinkober-leadportal.com`. „Antworten“ in der E-Mail geht direkt an die Person,
die das Formular ausgefüllt hat.

- Serverseitige Prüfung aller Pflichtfelder, E-Mail und Telefonnummer
- Spamschutz: unsichtbares Honeypot-Feld, Mindest-Ausfüllzeit, max. 5 Anfragen pro Minute je IP
- Pflicht-Checkbox Datenschutz
- Schlägt der Versand fehl, sieht die Person eine Meldung mit Telefonnummer; die komplette Anfrage
  steht dann in den Vercel-Logs (Project → Logs, Suche nach `[anfrage]`) – nichts geht verloren.

| Formular | Seite | danach |
|---|---|---|
| Potenzial-Analyse | /potenzial-analyse | /danke |
| Wachstums-Call | /wachstums-call-formular | /danke-wachstum |
| Kontakt | /kontakt | /danke |
| Online-Bewerbung | /online-bewerbung | /karriere-danke |
| Onboarding / Onboarding Recruiting | /onboarding-formular(-recruiting) | Abschlussmeldung |

## Umgebungsvariablen (Vercel → Project → Settings → Environment Variables)

| Name | Wert |
|---|---|
| `RESEND_API_KEY` | API-Key aus Resend (nur dort eintragen, **nie** ins Repository) |

Lokal: Datei `.env` anlegen (steht in `.gitignore`) mit `RESEND_API_KEY=…`.

## Cookies & Tracking

Eigenes Cookie-Banner (gleicher Aufbau wie bei Onepage). Google Ads, Meta-Pixel und OpenAI-Pixel laden
**nur** nach Einwilligung „Marketing“, Vercel Web Analytics nach „Performance“. Videos (Bunny), Bewertungen
(Trustindex) und Karte (OpenStreetMap) laden wie bisher erst nach Zustimmung.

## Entwicklung

```bash
npm install
npm run dev      # lokale Vorschau auf http://localhost:4321
npm run build    # Produktions-Build
```

Node 22 oder neuer.

## Domain umstellen (DNS)

Für die Website beim Domain-Anbieter **nur** diese beiden Einträge ändern (alte A-/CNAME-Einträge für `@` und `www` vorher entfernen):

| Typ | Name | Wert |
|---|---|---|
| A | @ | der von Vercel angezeigte Wert (Project → Settings → Domains) |
| CNAME | www | der von Vercel angezeigte Wert |

**MX- und TXT-Einträge der Haupt-Domain unverändert lassen** – sonst kommen keine E-Mails mehr an.
Die Resend-Einträge liegen auf der Versand-Domain `reinkober-leadportal.com` und berühren `reinkober.com` nicht.

`www.reinkober.com` leitet dauerhaft auf `reinkober.com` weiter.
