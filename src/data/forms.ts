// Alle Formulare der Website.
// Texte, Reihenfolge und Pflichtfelder wurden 1:1 aus Onepage übernommen.
// Pflegen: Texte in Anführungszeichen ändern. "required: true" = Pflichtfeld.
// Wohin die Anfragen gehen, steht in src/data/site.ts (formRecipients).

export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'choice' | 'multichoice';
export interface FormField {
  name: string;          // Bezeichnung in der E-Mail
  type: FieldType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];    // bei Auswahlfeldern
  style?: string;
  icon?: string;
  autocomplete?: string;
  inputmode?: string;
}
export interface FormStep { title: string; description?: string | null; kicker?: string | null; hint?: string | null; button?: string; fields: FormField[] }
export interface FormDef {
  key: string;
  name: string;          // erscheint im Betreff der Benachrichtigung
  layout: 'quiz' | 'stack' | 'interview';
  nextText?: string;
  prevText?: string;
  submitText: string;
  redirect?: string | null;  // Danke-Seite nach dem Absenden
  finish?: { title: string; text: string } | null;
  steps: FormStep[];
}

export const forms: Record<string, FormDef> = {
  "potenzial-analyse": {
    "key": "potenzial-analyse",
    "name": "Potenzial-Analyse",
    "layout": "quiz",
    "nextText": "Nächster Schritt",
    "submitText": "Daten absenden",
    "redirect": "/danke",
    "steps": [
      {
        "title": "Jetzt ausfüllen & Auswertung sichern:\nWie lautet Ihre Website?",
        "description": null,
        "fields": [
          {
            "required": true,
            "type": "text",
            "placeholder": "www.",
            "label": "",
            "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M11.864,16.378a3.915,3.915,0,0,1-1.124,2.468l-1,1A3.95,3.95,0,0,1,4.154,14.26l1-1a3.917,3.917,0,0,1,2.468-1.124L9.438,10.32a5.928,5.928,0,0,0-5.7,1.527l-1,1a5.949,5.949,0,0,0,8.414,8.413l1-1a5.932,5.932,0,0,0,1.527-5.7Z\"/> <path d=\"M16.378,11.864a3.915,3.915,0,0,0,2.468-1.124l1-1A3.95,3.95,0,0,0,14.26,4.154l-1,1a3.917,3.917,0,0,0-1.124,2.468L10.32,9.438a5.928,5.928,0,0,1,1.527-5.7l1-1a5.949,5.949,0,0,1,8.413,8.414l-1,1a5.932,5.932,0,0,1-5.7,1.527Z\"/> <path d=\"M8,17a1,1,0,0,1-.707-1.707l8-8a1,1,0,0,1,1.414,1.414l-8,8A1,1,0,0,1,8,17Z\"/></svg>",
            "name": "Website",
            "inputmode": "url",
            "autocomplete": "url"
          }
        ]
      },
      {
        "title": "Wie groß ist Ihr Team?",
        "description": null,
        "fields": [
          {
            "required": true,
            "type": "text",
            "placeholder": "z.B. 17 Personen",
            "label": "",
            "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12,6L12,6c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,4.657,13.657,6,12,6z\"></path> <path d=\"M4,19v-8c0-1.13,0.391-2.162,1.026-3H2c-1.105,0-2,0.895-2,2v6h2v5c0,0.552,0.448,1,1,1h2 c0.552,0,1-0.448,1-1v-2H4z\"></path> <path d=\"M14,24h-4c-0.552,0-1-0.448-1-1v-6H6v-6c0-1.657,1.343-3,3-3h6c1.657,0,3,1.343,3,3v6h-3v6 C15,23.552,14.552,24,14,24z\"></path> <path d=\"M4,7L4,7C2.895,7,2,6.105,2,5v0c0-1.105,0.895-2,2-2h0c1.105,0,2,0.895,2,2v0 C6,6.105,5.105,7,4,7z\"></path> <path d=\"M20,19v-8c0-1.13-0.391-2.162-1.026-3H22c1.105,0,2,0.895,2,2v6h-2v5c0,0.552-0.448,1-1,1h-2 c-0.552,0-1-0.448-1-1v-2H20z\"></path> <path d=\"M20,7L20,7c1.105,0,2-0.895,2-2v0c0-1.105-0.895-2-2-2h0c-1.105,0-2,0.895-2,2v0 C18,6.105,18.895,7,20,7z\"></path></svg>",
            "name": "Teamgröße"
          }
        ]
      },
      {
        "title": "Wie heißen Sie?",
        "description": null,
        "fields": [
          {
            "required": true,
            "type": "text",
            "placeholder": "Max Mustermann",
            "label": "",
            "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M22,14.885l-5-4.5A1.5,1.5,0,0,0,16,10H8a1.5,1.5,0,0,0-1,.385l-5,4.5a1.5,1.5,0,0,0-.308,1.844l2.5,4.5a1.5,1.5,0,1,0,2.622-1.458L4.892,16.315,7,14.418V23a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V14.418l2.108,1.9-1.919,3.456a1.5,1.5,0,0,0,2.622,1.458l2.5-4.5A1.5,1.5,0,0,0,22,14.885Z\"></path> <circle cx=\"12\" cy=\"4\" r=\"4\"></circle></svg>",
            "name": "Name",
            "autocomplete": "name"
          }
        ]
      },
      {
        "title": "Wie können wir Sie erreichen?",
        "description": "Innerhalb von 48 Stunden kontaktieren wir Sie zwecks Terminabsprache zur Besprechung der tiefgreifenden Analyse.",
        "fields": [
          {
            "required": true,
            "type": "email",
            "placeholder": "Ihre E-Mail-Adresse",
            "label": "",
            "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M13.4,14.6A2.3,2.3,0,0,1,12,15a2.3,2.3,0,0,1-1.4-.4L0,8.9V19a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V8.9Z\"/> <path d=\"M21,2H3A3,3,0,0,0,0,5V6a1.05,1.05,0,0,0,.5.9l11,6a.9.9,0,0,0,.5.1.9.9,0,0,0,.5-.1l11-6A1.05,1.05,0,0,0,24,6V5A3,3,0,0,0,21,2Z\"/></svg>",
            "name": "E-Mail"
          },
          {
            "required": true,
            "type": "tel",
            "placeholder": "Telefon",
            "label": "",
            "name": "Telefon"
          }
        ],
        "button": "Kostenfreie Potenzial-Analyse erhalten"
      }
    ]
  },
  "wachstums-call": {
    "key": "wachstums-call",
    "name": "Wachstums-Call",
    "layout": "quiz",
    "nextText": "Nächster Schritt",
    "submitText": "Daten absenden",
    "redirect": "/danke-wachstum",
    "steps": [
      {
        "title": "Gib deinen Vornamen ein",
        "description": null,
        "fields": [
          {
            "required": true,
            "type": "text",
            "placeholder": "Bsp. Max",
            "label": "",
            "name": "Vorname",
            "autocomplete": "given-name"
          }
        ]
      },
      {
        "title": "Gib deinen Nachnamen ein",
        "description": null,
        "fields": [
          {
            "required": true,
            "type": "text",
            "placeholder": "Bsp. Mustermann",
            "label": "",
            "name": "Nachname",
            "autocomplete": "family-name"
          }
        ]
      },
      {
        "title": "Gib deine Website an",
        "description": null,
        "fields": [
          {
            "required": true,
            "type": "text",
            "placeholder": "Bsp. www.reinkober.com",
            "label": "",
            "name": "Website",
            "inputmode": "url"
          }
        ]
      },
      {
        "title": "Gib deine Telefonnummer ein",
        "description": null,
        "fields": [
          {
            "required": true,
            "type": "tel",
            "placeholder": "Bsp. 016096088604",
            "label": "",
            "name": "Telefonnummer",
            "autocomplete": "tel"
          }
        ]
      }
    ]
  },
  "bewerbung": {
    "key": "bewerbung",
    "name": "Online-Bewerbung",
    "layout": "quiz",
    "nextText": "Weiter zum nächsten Schritt",
    "submitText": "Bewerbung senden",
    "redirect": "/karriere-danke",
    "steps": [
      {
        "title": "Auf welche Position willst du dich bewerben?",
        "description": "Bitte wähle die jeweilige Position aus oder wähle \"Initiativbewerbung\".",
        "fields": [
          {
            "label": "Auswählen",
            "required": true,
            "type": "choice",
            "options": [
              "Senior Online-Marketing Manager (m/w/d)",
              "Junior Online-Marketing Manager (m/w/d)"
            ],
            "style": "tabs",
            "name": "Position"
          }
        ]
      },
      {
        "title": "Wie viele Jahre Erfahrung hast du in der jeweiligen Stelle?",
        "description": "Bitte wähle die passende Antwort aus.",
        "fields": [
          {
            "label": "",
            "required": true,
            "type": "choice",
            "options": [
              "Ich habe bereits mehr als 5 Jahre Berufserfahrung",
              "Ich habe etwa 2 bis 5 Jahre Berufserfahrung",
              "Ich bin noch neu in dem Bereich"
            ],
            "style": "tabs",
            "name": "Jahre"
          }
        ]
      },
      {
        "title": "Was machst du aktuell?",
        "description": "In welchem Bereich arbeitest du aktuell? Was machst du aktuell beruflich?",
        "fields": [
          {
            "required": true,
            "type": "textarea",
            "placeholder": "Was machst du aktuell?",
            "label": "",
            "name": "Aktuell"
          }
        ]
      },
      {
        "title": "In welchen Bereichen hast du gute bis sehr gute Erfahrungen?",
        "description": "Mehrfachauswahl möglich: Klicke alle Punkte an, wo du wirklich Erfahrung drin hast und selbstständig arbeiten kannst. Keine Scham - wähle alles aus, was passt. Ob 2 oder 15 Kacheln.",
        "fields": [
          {
            "label": "Auswählen",
            "required": false,
            "type": "multichoice",
            "options": [
              "Website Programmierung",
              "Webflow",
              "Google Ads (über 50k € Adspend)",
              "Meta Ads (über 50k € Adspend)",
              "TikTok Ads (über 50k € Adspend)",
              "LinkedIn Outreach",
              "Markenaufbau",
              "Copywriting",
              "Foto- & Videoproduktion",
              "Conversion-Optimierte Landingpages",
              "Onepage.io",
              "Tracking & Analytics (GA4, Tag Manager, Server-Side Tracking)",
              "SEO (lokal & überregional)",
              "Full-Funnel-Kampagnenstrategie",
              "Brand-Strategie & Positionierung",
              "CRM-Setup & Automatisierungen",
              "E-Mail-Marketing"
            ],
            "style": "tagline",
            "name": "Erfahrungen Auswahl"
          }
        ]
      },
      {
        "title": "Deine Erfahrung zählt!",
        "description": "Teile mit uns, was dich auszeichnet – sei es dein bisheriger Adspend, die Anzahl deiner realisierten Projekte, geschalteten Ads oder deine Erfahrung im Online-Marketing oder der Webentwicklung. Jede Information hilft uns, dich besser kennenzulernen! (optional)",
        "fields": [
          {
            "required": false,
            "type": "textarea",
            "placeholder": "Alles, was dir einfällt und wichtig ist, uns mitzuteilen...",
            "label": "",
            "name": "Erfahrungen"
          }
        ]
      },
      {
        "title": "Wann könntest du bei uns anfangen?",
        "description": null,
        "fields": [
          {
            "label": "Auswählen",
            "required": true,
            "type": "choice",
            "options": [
              "Sofort",
              "In ca. 4 Wochen",
              "In ca. 8 Wochen",
              "Noch längerer Zeitraum"
            ],
            "style": "tabs",
            "name": "Einstiegsdatum"
          }
        ]
      },
      {
        "title": "Welche Gehaltsvorstellung hast du für diese Position?",
        "description": "Teile uns mit, welches Bruttogehalt du dir für diese Position pro Monat vorstellst. Wir besprechen das ohnehin im persönlichen Gespräch – mach dir also nicht zu viele Gedanken. Uns geht es nicht darum, jemanden aufgrund der Gehaltsvorstellung auszuschließen, sondern darum, das Gespräch optimal vorzubereiten.",
        "fields": [
          {
            "required": true,
            "type": "text",
            "placeholder": "Dein Bruttogehalt pro Monat",
            "label": "",
            "name": "Gehalt"
          }
        ]
      },
      {
        "title": "Wie können wir dich erreichen?",
        "description": "Fülle das Formular aus, damit wir uns mit dir in Verbindung setzen können. Wir freuen uns, dich kennenzulernen.",
        "fields": [
          {
            "required": true,
            "type": "text",
            "placeholder": "Dein Vor- und Nachname",
            "label": "",
            "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M22,14.885l-5-4.5A1.5,1.5,0,0,0,16,10H8a1.5,1.5,0,0,0-1,.385l-5,4.5a1.5,1.5,0,0,0-.308,1.844l2.5,4.5a1.5,1.5,0,1,0,2.622-1.458L4.892,16.315,7,14.418V23a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V14.418l2.108,1.9-1.919,3.456a1.5,1.5,0,0,0,2.622,1.458l2.5-4.5A1.5,1.5,0,0,0,22,14.885Z\"></path> <circle cx=\"12\" cy=\"4\" r=\"4\"></circle></svg>",
            "name": "Name",
            "autocomplete": "name"
          },
          {
            "required": true,
            "type": "tel",
            "placeholder": "Deine Telefonnummer",
            "label": "",
            "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M15.639,14.407l-2.355,2.321a19.111,19.111,0,0,1-3.4-2.613,19.353,19.353,0,0,1-2.612-3.4L9.591,8.36a1.01,1.01,0,0,0,.208-1.1L7.382,1.614A1.009,1.009,0,0,0,6.2,1.036L1.756,2.209A1.007,1.007,0,0,0,1,3.218,21.337,21.337,0,0,0,7.039,16.959,21.339,21.339,0,0,0,20.784,23a1.011,1.011,0,0,0,1.01-.756l1.172-4.44a1.009,1.009,0,0,0-.577-1.186L16.748,14.2A1.009,1.009,0,0,0,15.639,14.407Z\"/></svg>",
            "name": "Telefon"
          },
          {
            "required": true,
            "type": "email",
            "placeholder": "Deine E-Mail-Adresse",
            "label": "",
            "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M13.4,14.6A2.3,2.3,0,0,1,12,15a2.3,2.3,0,0,1-1.4-.4L0,8.9V19a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V8.9Z\"/> <path d=\"M21,2H3A3,3,0,0,0,0,5V6a1.05,1.05,0,0,0,.5.9l11,6a.9.9,0,0,0,.5.1.9.9,0,0,0,.5-.1l11-6A1.05,1.05,0,0,0,24,6V5A3,3,0,0,0,21,2Z\"/></svg>",
            "name": "E-Mail"
          },
          {
            "required": true,
            "type": "text",
            "placeholder": "Deine PLZ - woher kommst du?",
            "label": "",
            "name": "PLZ",
            "autocomplete": "postal-code"
          }
        ]
      }
    ]
  },
  "kontakt": {
    "key": "kontakt",
    "name": "Kontaktanfrage",
    "layout": "stack",
    "submitText": "Meine Anfrage absenden",
    "redirect": "/danke",
    "steps": [
      {
        "title": "",
        "fields": [
          {
            "type": "text",
            "label": "Ihr Name",
            "placeholder": "Johannes Mustermann",
            "required": true,
            "name": "Name",
            "autocomplete": "name"
          },
          {
            "type": "email",
            "label": "Ihre E-Mail-Adresse",
            "placeholder": "beispiel@gmail.com",
            "required": true,
            "name": "E-Mail",
            "autocomplete": "email"
          },
          {
            "type": "tel",
            "label": "Ihre Telefonnummer",
            "placeholder": "Ihre Telefonnummer",
            "required": true,
            "name": "Telefon",
            "autocomplete": "tel"
          },
          {
            "type": "textarea",
            "label": "Worum geht es? (optional)",
            "placeholder": "Schreiben Sie Ihren Text hier..",
            "required": false,
            "name": "Nachricht"
          }
        ]
      }
    ]
  },
  "onboarding": {
    "key": "onboarding",
    "name": "Onboarding-Interview (Kunden)",
    "layout": "interview",
    "nextText": "Zum nächsten Schritt",
    "prevText": "Vorheriger Schritt",
    "submitText": "Nächster Schritt",
    "redirect": null,
    "finish": {
      "title": "Danke für deine Zeit!",
      "text": "Wir werden die Ergebnisse nun analysieren und bei Rückfragen auf Dich zu kommen."
    },
    "steps": [
      {
        "kicker": "Kurz vorab",
        "title": "Wer füllt das Interview aus?",
        "hint": null,
        "fields": [
          {
            "type": "text",
            "label": "Firma / Ansprechpartner",
            "placeholder": "z. B. Muster GmbH – Max Mustermann",
            "required": true,
            "name": "Firma / Ansprechpartner",
            "autocomplete": "organization"
          },
          {
            "type": "email",
            "label": "E-Mail-Adresse",
            "placeholder": "name@firma.de",
            "required": true,
            "name": "E-Mail",
            "autocomplete": "email"
          }
        ]
      },
      {
        "kicker": "Beginnen wir mit deinem Angebot",
        "title": "Wie nennt sich dein Produkt oder deine Dienstleistung?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Zum Beispiel: „Online Ernährungscoaching“, „1:1 Finanzberatung für Selbstständige“ oder „Premium Massivholztische“.",
            "required": true,
            "name": "Titel"
          }
        ]
      },
      {
        "kicker": "Deine Wunschkunden",
        "title": "Wer sind deine absoluten Lieblingskunden, mit denen es einfach „läuft“?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Denk an Kunden, bei denen die Zusammenarbeit Spaß macht: Alter, Beruf, Interessen, Branche, typische Probleme.",
            "required": true,
            "name": "ZG"
          }
        ]
      },
      {
        "kicker": "Was steht deinen Kunden im Weg?",
        "title": "Welche typischen Herausforderungen oder Stolpersteine hat deine Zielgruppe, wenn sie das Problem alleine lösen will?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was funktioniert bei ihnen nicht? Woran scheitern sie, wenn sie es selbst probieren?",
            "required": true,
            "name": "Herausforderung ZG"
          }
        ]
      },
      {
        "kicker": "Das ist dein Angebot",
        "title": "Was bietest du genau an – erklär es bitte so, wie du es deinem Wunschkunden erklären würdest.",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Beschreib’s so, wie du es einem Interessenten erzählen würdest. Was bekommt er konkret? Welche Ergebnisse kann er erwarten?",
            "required": true,
            "name": "Angebotsinhalt"
          }
        ]
      },
      {
        "kicker": "Das ist dein Angebot",
        "title": "Gibt es verschiedene Preise, Pakete, Varianten oder Dienstleistungen? Wenn ja, bitte kurz beschreiben.",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Zum Beispiel: „Es gibt ein 6-Wochen-Intensivprogramm und eine langfristige Betreuung“, oder „Ich biete Einzelstücke sowie Serienproduktion an“.",
            "required": true,
            "name": "Preise/Pakete"
          }
        ]
      },
      {
        "kicker": "Das ist dein Angebot",
        "title": "Dürfen Preise/Pakete genannt werden?",
        "hint": "💡 Hier entscheidest du, ob der Preis ein Verkaufsargument sein soll oder erst im Gespräch genannt wird.",
        "fields": [
          {
            "type": "select",
            "label": "",
            "placeholder": "Wähle eine Option aus",
            "options": [
              "Ja, Preise dürfen offen kommuniziert werden.",
              "Nein, Preise dürfen nicht offen kommuniziert werden.",
              "Die verschiedenen Pakete/Stufen dürfen genannt werden, aber ohne Preise."
            ],
            "required": false,
            "name": "Pakete/preise nennen"
          },
          {
            "type": "text",
            "label": "Alternativ:",
            "placeholder": "Wie darf dein Angebot kommuniziert werden?",
            "required": false,
            "name": "Pakete/preise nennen (2)"
          }
        ]
      },
      {
        "kicker": "Deine Wunschkunden",
        "title": "Welche Wünsche oder Ziele verfolgen deine Wunschkunden mit deinem Angebot?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was wollen diese Kunden erreichen oder verbessern? Zum Beispiel: „Endlich wieder schmerzfrei trainieren“ oder „Mehr Anfragen über Social Media bekommen“.",
            "required": true,
            "name": "ZG Ziel"
          }
        ]
      },
      {
        "kicker": "Deine Wunschkunden",
        "title": "Mit welchem Problem kommen deine Kunden zu dir? Woran merken sie selbst: „Ich brauche dringend das Produkt/Dienstleistung/Hilfe“?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Beschreib typische Probleme oder Symptome. Was ist der Moment, in dem die Kunden merken: „Jetzt reicht’s, ich will eine Lösung!“",
            "required": true,
            "name": "ZG Problem"
          }
        ]
      },
      {
        "kicker": "Was steht deinen Kunden im Weg?",
        "title": "Gibt es Vorbehalte oder typische Einwände, warum manche Kunden noch zögern?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was hörst du im Gespräch oft? „Zu teuer“, „zu wenig Zeit“, „Ich weiß nicht, ob das klappt“… Trage gerne alles ein, was dir einfällt.",
            "required": true,
            "name": "Einwand ZG"
          }
        ]
      },
      {
        "kicker": "Was macht dein Angebot besonders?",
        "title": "Warum funktioniert deine Lösung besonders gut? Gibt es einen speziellen Ansatz, eine Methode oder Besonderheiten, die dich abheben?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Zum Beispiel: „Ich begleite meine Kunden persönlich“, „Wir haben eine einzigartige Methode“, „Unsere Ergebnisse sind messbar“…",
            "required": true,
            "name": "USPs"
          }
        ]
      },
      {
        "kicker": "Was macht dein Angebot besonders?",
        "title": "Wenn du an deine Mitbewerber denkst: Was unterscheidet dich ganz klar von denen?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was bekommst du immer wieder als Feedback? Oder was würdest du selbst sagen: „Das kann ich besser als die anderen…“",
            "required": true,
            "name": "Wettbewerber"
          }
        ]
      },
      {
        "kicker": "Deine Story & Motivation",
        "title": "Warum machst du genau das, was du machst? Gab es einen Moment, der dich dahin geführt hat?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Gab es einen Aha-Moment? Ein Schlüsselerlebnis? Oder hast du einfach gemerkt: „DAS ist meine Leidenschaft“?",
            "required": true,
            "name": "Motivation/Story"
          }
        ]
      },
      {
        "kicker": "Kommunikation & Stil",
        "title": "Wie sollen wir die Zielgruppe ansprechen?",
        "hint": "💡 Einfach anklicken: Sollen wir die Menschen duzen oder siezen?",
        "fields": [
          {
            "type": "select",
            "label": "",
            "placeholder": "Wähle eine Option aus",
            "options": [
              "Duzen",
              "Siezen",
              "Weiß ich noch nicht"
            ],
            "required": true,
            "name": "Kommunikation"
          }
        ]
      },
      {
        "kicker": "Kommunikation & Stil",
        "title": "Gibt es etwas, worüber du NICHT sprechen willst?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Gibt es Dinge, über die du im Marketing bewusst NICHT reden möchtest? Beispielsweise „Ich will keine Rabatte nennen“ oder „Ich will keine Heilversprechen machen“…",
            "required": false,
            "name": "Nicht kommunizieren"
          }
        ]
      },
      {
        "kicker": "Kommunikation & Stil",
        "title": "Gibt es eine Botschaft oder ein Satz, der für dein Marketing absolut drin sein muss?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Hast du ein persönliches Motto, einen Leitsatz oder einen Begriff, der immer genannt werden soll?",
            "required": true,
            "name": "Kommunizieren"
          }
        ]
      },
      {
        "kicker": "Das ist dein Angebot",
        "title": "Was verstehen Kunden an deinem Angebot oft FALSCH, was musst Du häufiger klarstellen oder genauer erklären?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Zum Beispiel: „Viele glauben, mein Coaching ist nur für Profis geeignet“, oder „Die meisten unterschätzen den Aufwand hinter dem Ergebnis“. Was müssen wir wissen, um diese falschen Vorstellungen direkt richtigzustellen?",
            "required": true,
            "name": "Verständnisfehler"
          }
        ]
      },
      {
        "kicker": "Der Feinschliff",
        "title": "Wie fühlen sich deine Kunden nach der Zusammenarbeit mit dir? Was verändert sich?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was sagen deine Kunden nach dem Kauf? Welche positiven Veränderungen sehen sie?",
            "required": true,
            "name": "Nach Kauf"
          }
        ]
      },
      {
        "kicker": "Der Feinschliff",
        "title": "Und was verpassen sie, wenn sie NICHT mit dir arbeiten?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was passiert, wenn sie sich dagegen entscheiden? Bleibt das Problem bestehen? Wird es vielleicht schlimmer?",
            "required": true,
            "name": "Verpassen"
          }
        ]
      },
      {
        "kicker": "Der Feinschliff",
        "title": "Gibt es sonst noch etwas, das wir wissen sollten?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Hier ist Platz für alles, was du uns noch mitgeben möchtest.",
            "required": true,
            "name": "Mehr infos"
          }
        ]
      },
      {
        "kicker": "Deine Story & Motivation",
        "title": "Welche Qualifikationen, Ausbildungen oder besonderen Erfahrungen machen dich zum Experten in deinem Bereich?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Zum Beispiel: „Zertifizierter XY-Coach“, „20 Jahre Branchenerfahrung“, „Studium im Bereich XY“, „Eigene Erfolgsgeschichte mit dem Thema“ oder „Regelmäßige Fachvorträge auf Konferenzen“. Alles, was deiner Zielgruppe zeigt: Du weißt, wovon du sprichst!",
            "required": true,
            "name": "Qualifikationen"
          }
        ]
      },
      {
        "kicker": "Was macht dein Angebot besonders?",
        "title": "Bitte nenne uns einige deiner Mitbewerber:",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Füge gern einfach die Links zu deren Webseiten hier ein.",
            "required": true,
            "name": "Wettbewerber (2)"
          }
        ]
      }
    ]
  },
  "onboarding-recruiting": {
    "key": "onboarding-recruiting",
    "name": "Onboarding-Interview (Recruiting)",
    "layout": "interview",
    "nextText": "Zum nächsten Schritt",
    "prevText": "Vorheriger Schritt",
    "submitText": "Nächster Schritt",
    "redirect": null,
    "finish": {
      "title": "Danke für deine Zeit!",
      "text": "Wir werden die Ergebnisse nun analysieren und bei Rückfragen auf Dich zu kommen."
    },
    "steps": [
      {
        "kicker": "Kurz vorab",
        "title": "Wer füllt das Interview aus?",
        "hint": null,
        "fields": [
          {
            "type": "text",
            "label": "Firma / Ansprechpartner",
            "placeholder": "z. B. Muster GmbH – Max Mustermann",
            "required": true,
            "name": "Firma / Ansprechpartner",
            "autocomplete": "organization"
          },
          {
            "type": "email",
            "label": "E-Mail-Adresse",
            "placeholder": "name@firma.de",
            "required": true,
            "name": "E-Mail",
            "autocomplete": "email"
          }
        ]
      },
      {
        "kicker": "Beginnen wir mit deinem Angebot",
        "title": "Wie nennt sich dein Produkt oder deine Dienstleistung?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Zum Beispiel: „Online Ernährungscoaching“, „1:1 Finanzberatung für Selbstständige“ oder „Premium Massivholztische“.",
            "required": true,
            "name": "Titel"
          }
        ]
      },
      {
        "kicker": "Deine Wunschkunden",
        "title": "Wer sind deine absoluten Lieblingskunden, mit denen es einfach „läuft“?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Denk an Kunden, bei denen die Zusammenarbeit Spaß macht: Alter, Beruf, Interessen, Branche, typische Probleme.",
            "required": true,
            "name": "ZG"
          }
        ]
      },
      {
        "kicker": "Was steht deinen Kunden im Weg?",
        "title": "Welche typischen Herausforderungen oder Stolpersteine hat deine Zielgruppe, wenn sie das Problem alleine lösen will?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was funktioniert bei ihnen nicht? Woran scheitern sie, wenn sie es selbst probieren?",
            "required": true,
            "name": "Herausforderung ZG"
          }
        ]
      },
      {
        "kicker": "Das ist dein Angebot",
        "title": "Was bietest du genau an – erklär es bitte so, wie du es deinem Wunschkunden erklären würdest.",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Beschreib’s so, wie du es einem Interessenten erzählen würdest. Was bekommt er konkret? Welche Ergebnisse kann er erwarten?",
            "required": true,
            "name": "Angebotsinhalt"
          }
        ]
      },
      {
        "kicker": "Das ist dein Angebot",
        "title": "Gibt es verschiedene Preise, Pakete, Varianten oder Dienstleistungen? Wenn ja, bitte kurz beschreiben.",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Zum Beispiel: „Es gibt ein 6-Wochen-Intensivprogramm und eine langfristige Betreuung“, oder „Ich biete Einzelstücke sowie Serienproduktion an“.",
            "required": true,
            "name": "Preise/Pakete"
          }
        ]
      },
      {
        "kicker": "Das ist dein Angebot",
        "title": "Dürfen Preise/Pakete genannt werden?",
        "hint": "💡 Hier entscheidest du, ob der Preis ein Verkaufsargument sein soll oder erst im Gespräch genannt wird.",
        "fields": [
          {
            "type": "select",
            "label": "",
            "placeholder": "Wähle eine Option aus",
            "options": [
              "Ja, Preise dürfen offen kommuniziert werden.",
              "Nein, Preise dürfen nicht offen kommuniziert werden.",
              "Die verschiedenen Pakete/Stufen dürfen genannt werden, aber ohne Preise."
            ],
            "required": false,
            "name": "Pakete/preise nennen"
          },
          {
            "type": "text",
            "label": "Alternativ:",
            "placeholder": "Wie darf dein Angebot kommuniziert werden?",
            "required": false,
            "name": "Pakete/preise nennen (2)"
          }
        ]
      },
      {
        "kicker": "Deine Wunschkunden",
        "title": "Welche Wünsche oder Ziele verfolgen deine Wunschkunden mit deinem Angebot?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was wollen diese Kunden erreichen oder verbessern? Zum Beispiel: „Endlich wieder schmerzfrei trainieren“ oder „Mehr Anfragen über Social Media bekommen“.",
            "required": true,
            "name": "ZG Ziel"
          }
        ]
      },
      {
        "kicker": "Deine Wunschkunden",
        "title": "Mit welchem Problem kommen deine Kunden zu dir? Woran merken sie selbst: „Ich brauche dringend das Produkt/Dienstleistung/Hilfe“?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Beschreib typische Probleme oder Symptome. Was ist der Moment, in dem die Kunden merken: „Jetzt reicht’s, ich will eine Lösung!“",
            "required": true,
            "name": "ZG Problem"
          }
        ]
      },
      {
        "kicker": "Was steht deinen Kunden im Weg?",
        "title": "Gibt es Vorbehalte oder typische Einwände, warum manche Kunden noch zögern?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was hörst du im Gespräch oft? „Zu teuer“, „zu wenig Zeit“, „Ich weiß nicht, ob das klappt“… Trage gerne alles ein, was dir einfällt.",
            "required": true,
            "name": "Einwand ZG"
          }
        ]
      },
      {
        "kicker": "Was macht dein Angebot besonders?",
        "title": "Warum funktioniert deine Lösung besonders gut? Gibt es einen speziellen Ansatz, eine Methode oder Besonderheiten, die dich abheben?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Zum Beispiel: „Ich begleite meine Kunden persönlich“, „Wir haben eine einzigartige Methode“, „Unsere Ergebnisse sind messbar“…",
            "required": true,
            "name": "USPs"
          }
        ]
      },
      {
        "kicker": "Was macht dein Angebot besonders?",
        "title": "Wenn du an deine Mitbewerber denkst: Was unterscheidet dich ganz klar von denen?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was bekommst du immer wieder als Feedback? Oder was würdest du selbst sagen: „Das kann ich besser als die anderen…“",
            "required": true,
            "name": "Wettbewerber"
          }
        ]
      },
      {
        "kicker": "Deine Story & Motivation",
        "title": "Warum machst du genau das, was du machst? Gab es einen Moment, der dich dahin geführt hat?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Gab es einen Aha-Moment? Ein Schlüsselerlebnis? Oder hast du einfach gemerkt: „DAS ist meine Leidenschaft“?",
            "required": true,
            "name": "Motivation/Story"
          }
        ]
      },
      {
        "kicker": "Kommunikation & Stil",
        "title": "Wie sollen wir die Zielgruppe ansprechen?",
        "hint": "💡 Einfach anklicken: Sollen wir die Menschen duzen oder siezen?",
        "fields": [
          {
            "type": "select",
            "label": "",
            "placeholder": "Wähle eine Option aus",
            "options": [
              "Duzen",
              "Siezen",
              "Weiß ich noch nicht"
            ],
            "required": true,
            "name": "Kommunikation"
          }
        ]
      },
      {
        "kicker": "Kommunikation & Stil",
        "title": "Gibt es etwas, worüber du NICHT sprechen willst?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Gibt es Dinge, über die du im Marketing bewusst NICHT reden möchtest? Beispielsweise „Ich will keine Rabatte nennen“ oder „Ich will keine Heilversprechen machen“…",
            "required": false,
            "name": "Nicht kommunizieren"
          }
        ]
      },
      {
        "kicker": "Kommunikation & Stil",
        "title": "Gibt es eine Botschaft oder ein Satz, der für dein Marketing absolut drin sein muss?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Hast du ein persönliches Motto, einen Leitsatz oder einen Begriff, der immer genannt werden soll?",
            "required": true,
            "name": "Kommunizieren"
          }
        ]
      },
      {
        "kicker": "Das ist dein Angebot",
        "title": "Was verstehen Kunden an deinem Angebot oft FALSCH, was musst Du häufiger klarstellen oder genauer erklären?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Zum Beispiel: „Viele glauben, mein Coaching ist nur für Profis geeignet“, oder „Die meisten unterschätzen den Aufwand hinter dem Ergebnis“. Was müssen wir wissen, um diese falschen Vorstellungen direkt richtigzustellen?",
            "required": true,
            "name": "Verständnisfehler"
          }
        ]
      },
      {
        "kicker": "Der Feinschliff",
        "title": "Wie fühlen sich deine Kunden nach der Zusammenarbeit mit dir? Was verändert sich?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was sagen deine Kunden nach dem Kauf? Welche positiven Veränderungen sehen sie?",
            "required": true,
            "name": "Nach Kauf"
          }
        ]
      },
      {
        "kicker": "Der Feinschliff",
        "title": "Und was verpassen sie, wenn sie NICHT mit dir arbeiten?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Was passiert, wenn sie sich dagegen entscheiden? Bleibt das Problem bestehen? Wird es vielleicht schlimmer?",
            "required": true,
            "name": "Verpassen"
          }
        ]
      },
      {
        "kicker": "Der Feinschliff",
        "title": "Gibt es sonst noch etwas, das wir wissen sollten?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Hier ist Platz für alles, was du uns noch mitgeben möchtest.",
            "required": true,
            "name": "Mehr infos"
          }
        ]
      },
      {
        "kicker": "Deine Story & Motivation",
        "title": "Welche Qualifikationen, Ausbildungen oder besonderen Erfahrungen machen dich zum Experten in deinem Bereich?",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Zum Beispiel: „Zertifizierter XY-Coach“, „20 Jahre Branchenerfahrung“, „Studium im Bereich XY“, „Eigene Erfolgsgeschichte mit dem Thema“ oder „Regelmäßige Fachvorträge auf Konferenzen“. Alles, was deiner Zielgruppe zeigt: Du weißt, wovon du sprichst!",
            "required": true,
            "name": "Qualifikationen"
          }
        ]
      },
      {
        "kicker": "Was macht dein Angebot besonders?",
        "title": "Bitte nenne uns einige deiner Mitbewerber:",
        "hint": null,
        "fields": [
          {
            "type": "textarea",
            "label": "",
            "placeholder": "💡 Füge gern einfach die Links zu deren Webseiten hier ein.",
            "required": true,
            "name": "Wettbewerber (2)"
          }
        ]
      }
    ]
  }
};
