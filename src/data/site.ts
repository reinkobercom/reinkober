// Zentrale Angaben – hier ändern, dann gilt es überall auf der Website.

export const site = {
  name: 'reinkober.com',
  url: 'https://reinkober.com',
  company: 'RX2 Marketing GmbH',
  managingDirector: 'Simon Reinkober',
  address: {
    street: 'Stockumer Straße 30',
    zip: '59368',
    city: 'Werne',
    country: 'DE',
    lat: 51.6637736,
    lng: 7.6427878,
  },
  phone: '+49 (0) 160 960 886 04',   // so wird die Nummer angezeigt
  phoneHref: 'tel:+4916096088604',     // so wird sie gewählt (ohne Leerzeichen, ohne 0 nach +49)
  whatsapp: 'https://wa.me/4916096088604',
  email: 'info@reinkober.com',
  social: {
    facebook: 'https://www.facebook.com/reinkoberholding',
    instagram: 'https://www.instagram.com/reinkober.holding/',
    linkedin: 'https://www.linkedin.com/company/14815912',
  },
  // Öffnungszeiten werden auf der bisherigen Website nicht angezeigt.
  // Für Google (strukturierte Daten) – bei Bedarf eintragen, z. B. ['Mo-Fr 09:00-17:00']
  openingHours: [] as string[],
};

// Empfänger der Formular-Benachrichtigungen (je Formular änderbar)
export const formRecipients: Record<string, string[]> = {
  'potenzial-analyse': ['simon@reinkober.com'],
  'wachstums-call': ['simon@reinkober.com'],
  kontakt: ['simon@reinkober.com'],
  bewerbung: ['simon@reinkober.com'],
  onboarding: ['simon@reinkober.com'],
  'onboarding-recruiting': ['simon@reinkober.com'],
};

// Absender der Benachrichtigungen (Domain ist bei Resend verifiziert)
export const formSender = {
  from: 'reinkober.com Website <leads@reinkober-leadportal.com>',
};

// Tracking – wird ausschließlich nach Einwilligung im Cookie-Banner geladen
export const tracking = {
  googleAds: 'AW-16629589761',
  metaPixel: '527995139618637',
  openAiPixel: 'HPe68c1s6jFaZpfgQDvSjn',
  trustindex: 'https://cdn.trustindex.io/loader.js?89cc1e2540aa45218b2656b448e',
};
