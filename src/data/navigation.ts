// Hauptnavigation (Header). Reihenfolge und Texte wie auf der bisherigen Website.
// "mega: true" öffnet das Menü "Beratung & Branchen" (Inhalt: Megamenü-Sektion).

export const mainNav = [
  { label: 'Startseite', href: '/' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Beratung & Branchen', mega: true },
  { label: 'Erfolge unserer Partner', href: '/erfolge-unserer-partner' },
] as const;

export const headerCta = {
  label: 'Potenzial-Analyse sichern',
  sub: 'Kostenfrei & unverbindlich',
  href: '/potenzial-analyse',
};
