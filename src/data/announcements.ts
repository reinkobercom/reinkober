// Termine & Hinweise mit Zeitraum (z. B. Betriebsurlaub, Webinar).
// Derzeit gibt es auf der Website keine solchen Hinweise – Vorlage für später:
//   { text: 'Vom 23.12. bis 02.01. sind wir im Urlaub.', visible: true, visibleFrom: '2026-12-15', visibleUntil: '2027-01-02' }
// Ein Eintrag erscheint als schmaler Hinweis über dem Header, solange visible = true
// und das heutige Datum im Zeitraum liegt (Datum im Format JJJJ-MM-TT).

export interface Announcement { text: string; href?: string; visible: boolean; visibleFrom?: string; visibleUntil?: string }

export const announcements: Announcement[] = [];

export function activeAnnouncements(now = new Date()) {
  const d = now.toISOString().slice(0, 10);
  return announcements.filter((a) => a.visible && (!a.visibleFrom || d >= a.visibleFrom) && (!a.visibleUntil || d <= a.visibleUntil));
}
