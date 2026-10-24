// Strukturierte Daten (JSON-LD) für Google.
import { site } from '../data/site';

const org = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.company,
  url: `${site.url}/`,
  logo: `${site.url}/icon-512.png`,
  image: `${site.url}/og-image.jpg`,
  email: site.email,
  telephone: site.phoneHref.replace('tel:', ''),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng },
  founder: { '@type': 'Person', name: site.managingDirector },
  areaServed: 'DE',
  knowsAbout: ['Online-Marketing', 'Kundengewinnung', 'Mitarbeitergewinnung', 'Social Recruiting', 'SEO', 'Google Ads', 'Meta Ads'],
  sameAs: Object.values(site.social),
  ...(site.openingHours.length ? { openingHours: site.openingHours } : {}),
};

const ARTICLES: Record<string, string> = {
  '/10-tipps-fur-ein-besseres-instagram-profil': '2024-10-18',
  '/10-haufige-seo-fehler': '2024-12-20',
  '/ki-schulungspflicht-in-unternehmen': '2025-04-08',
  '/2026-gute-mitarbeiter-gewinnen': '2026-03-15',
  '/planbar-neue-kunden-uber-google-und-co': '2026-03-17',
  '/lokale-sichtbarkeit-dominieren': '2026-03-14',
  '/pflegemarketing-klientengewinnung': '2026-06-15',
  '/mitarbeitergewinnung-in-der-pflege': '2026-06-16',
};

export function jsonLdFor(path: string, meta: { title: string; description: string }) {
  const url = path === '/' ? `${site.url}/` : `${site.url}${path}`;
  const out: Record<string, unknown>[] = [];
  if (path === '/') {
    out.push({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.name, url: `${site.url}/`, inLanguage: 'de-DE', publisher: { '@id': org['@id'] } });
    out.push({ '@context': 'https://schema.org', ...org });
  } else if (ARTICLES[path]) {
    out.push({
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: meta.title, description: meta.description,
      datePublished: ARTICLES[path], inLanguage: 'de-DE', mainEntityOfPage: url,
      author: { '@type': 'Person', name: 'Simon Reinkober' }, publisher: { '@id': org['@id'] },
    });
    out.push({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Marketing Blog', item: `${site.url}/marketing-blog` },
        { '@type': 'ListItem', position: 3, name: meta.title, item: url },
      ],
    });
  } else if (path === '/kontakt' || path === '/ueber-uns') {
    out.push({ '@context': 'https://schema.org', ...org });
  }
  return out;
}
