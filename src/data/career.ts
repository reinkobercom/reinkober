// Karriere-Seite: In Onepage ausgeblendete Bereiche (Offene Stellen, Bewerben-Button,
// „Wir bieten dir…“, Ablauf). Inhalte 1:1 aus Onepage übernommen.
//
// enabled: false → die Seite zeigt wie bisher „Aktuell haben wir keine offenen Stellen!“
// enabled: true  → stattdessen erscheinen die Stellen unten samt Bewerben-Button.
// Stellen hinzufügen/entfernen: Einträge in `jobs` bearbeiten.

export const career = {
  enabled: false,

  intro: {
    title: 'Unsere offenen Stellen.',
    text: [
      'Du möchtest in einem dynamischen Team arbeiten und mit innovativen Strategien echtes Wachstum erzeugen? Wir suchen engagierte Talente, die mit uns im Bereich Online-Marketing und Webentwicklung durchstarten. Bei uns erwarten dich spannende Projekte, viel Gestaltungsspielraum und ein motiviertes Team.',
      'Finde die passende Stelle für dich und werde Teil unseres Erfolgs!',
    ],
  },

  jobs: [
    {
      title: 'Senior Online-Marketing Manager (m/w/d)',
      location: '59368 Werne',
      type: 'Vollzeit',
      tasks: [
        'Entwicklung und Steuerung von Performance-Marketing-Kampagnen (Google & Meta Ads)',
        'Aufbau und Optimierung von Landingpages für maximale Conversion',
        'Entwickeln neuer Strategien zur Leadgenerierung',
        'Schreiben überzeugender Ad Copies und Erstellung von Creatives',
        'Analyse und Optimierung der Kampagnen-Performance',
        'Entwicklung und Umsetzung von SEO-Strategien zur organischen Sichtbarkeit',
      ],
      profile: [
        'Mehrjährige Erfahrung im Performance-Marketing (Google & Meta Ads)',
        'Sicher im Aufbau von Kampagnen & Funnels',
        'Stark in Copywriting, Anzeigengestaltung und Conversion-Optimierung',
        'Erfahrung in der Entwicklung und Umsetzung von SEO-Strategien',
        'Strukturierte, analytische und kreative Arbeitsweise',
      ],
    },
    {
      title: 'Junior Online-Marketing Manager (m/w/d)',
      location: '59368 Werne',
      type: 'Vollzeit',
      tasks: [
        'Unterstützung beim Aufbau und der Optimierung von Meta & Google Ads Kampagnen',
        'Erstellung und Pflege von Landingpages zur Leadgenerierung',
        'Schreiben von ansprechenden Ad Copies und Erstellung von Creatives',
        'Entwicklung neuer Strategien zur Kundenansprache',
        'Monitoring und Analyse von Kampagnen-Daten',
        'Entwicklung und Umsetzung von SEO-Strategien zur besseren Auffindbarkeit',
      ],
      profile: [
        'Erste Erfahrungen im Online-Marketing, idealerweise mit Google & Meta Ads',
        'Interesse an Landingpages, Copywriting & Performance-Optimierung',
        'Grundkenntnisse im Bereich SEO von Vorteil',
        'Kreativität & analytisches Denken',
        'Eigeninitiative und Motivation, dich weiterzuentwickeln',
      ],
    },
  ],

  button: { label: 'Jetzt für eine Stelle bewerben', sub: 'In unter 60 Sekunden - ohne Anschreiben oder Lebenslauf', href: '/online-bewerbung' },

  offers: {
    title: 'Wir bieten dir...',
    items: [
      '... ein Umfeld, in dem du deine kreativen Ideen zu 100% einbringen und ausleben kannst.',
      '... die Möglichkeit, ab Tag 1 Verantwortung zu übernehmen und diese Verantwortung später auch als Team- oder Projektleiter:in auszubauen.',
      '... eine hochwertige Arbeitsausstattung von Apple sowie die Möglichkeit eines Firmenwagens.',
      '... ständige fachliche und persönliche Weiterbildung bei den besten Coaches und auf den besten Events der jeweiligen Branche.',
      '... und das Wichtigste: Dein Leben bestimmt deinen Beruf – nicht umgekehrt. Du musst morgens dein Kind in die Kita bringen oder hast einen Termin auf der Bank? Kein Problem – plane deinen Tag, wie er zu dir passt.',
    ],
  },

  steps: [
    { title: 'Online-Bewerbung in unter 60 Sekunden', text: 'Fülle unser kurzes Online-Formular aus – ohne Anschreiben oder Lebenslauf. Einfach und schnell!' },
    { title: 'Überprüfung deiner Bewerbung', text: 'Nach Eingang deiner Bewerbung prüfen wir diese sorgfältig. Du hörst innerhalb von 72 Stunden von uns.' },
    { title: 'Feedback und mögliche Einstellung', text: 'Wir geben dir Feedback zu deiner Bewerbung und besprechen die nächsten Schritte für eine mögliche Einstellung.' },
  ],
};

/** Onepage-Sektion „Aktuell haben wir keine offenen Stellen!“ – wird bei enabled: true ersetzt. */
export const careerPlaceholderSection = 'aMG2zY3LqBusXFM5eiXRf';
