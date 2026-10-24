// Saubere Überschriften-Hierarchie: genau eine H1 je Seite, darunter H2/H3 ohne Sprünge.
// Onepage hat viele Überschriften nur optisch (als <p>) ausgezeichnet – hier werden die
// Ebenen anhand von Position und Schriftgröße vergeben. Die Optik ändert sich dadurch nicht.

type Atom = { id: string; type: string; tag?: string; font?: { fs?: number }; html?: string; code?: string };
type Section = { id: string; only?: string; isHeader?: boolean; isMega?: boolean; title?: string; rows?: { cols?: { atoms?: Atom[] }[] }[] };

const FOOTER = /fu(ß|ss)zeile|footer/i;

export function assignHeadings(sections: Section[]): Map<string, string> {
  const out = new Map<string, string>();
  const content = sections.filter((s) => !s.isHeader && !s.isMega && !FOOTER.test(s.title || ''));
  const heads = (s: Section) =>
    (s.rows || []).flatMap((r) => (r.cols || []).flatMap((c) => (c.atoms || []).filter((a) => a.type === 'header')));

  // Eingebetteter HTML-Code (z. B. Pflege-Artikel) bringt eine eigene H1 mit
  const codeHasH1 = content.some((s) => (s.rows || []).some((r) => (r.cols || []).some((c) => (c.atoms || []).some((a) => /<h1[\s>]/i.test((a as any).source?.data?.html || a.code || a.html || "") && a.type !== "header"))));
  // H1: vorhandene H1 (Live-Seite) oder größte Überschrift der ersten Inhaltssektion
  let h1: Atom | undefined;
  for (const s of content) {
    if (s.only === 'mobile') continue;
    if (codeHasH1) break;
    h1 = heads(s).find((a) => a.tag === 'h1');
    if (h1) break;
  }
  if (!h1 && !codeHasH1) {
    for (const s of content) {
      if (s.only === 'mobile') continue;
      const hs = heads(s).filter((a) => (a.font?.fs || 0) >= 20);
      if (hs.length) { h1 = hs.reduce((a, b) => ((b.font?.fs || 0) > (a.font?.fs || 0) ? b : a)); break; }
    }
  }
  if (h1) out.set(h1.id, 'h1');
  if (codeHasH1) out.set('__codeH1', 'h1');
  const txt = (a?: Atom) => (a?.html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  const h1Text = txt(h1);

  for (const s of content) {
    // Mobile Doppel-Variante der H1-Sektion: dieselbe Überschrift ist dort (sichtbar) die H1;
    // die Desktop-Variante ist mobil ausgeblendet, sodass je Gerät genau eine H1 sichtbar ist.
    let hsAll = heads(s);
    if (s.only === 'mobile' && h1Text) {
      const twin = hsAll.find((a) => txt(a) === h1Text);
      if (twin) { out.set(twin.id, 'h1'); hsAll = hsAll.filter((a) => a.id !== twin.id); }
    }
    const hs = hsAll.filter((a) => a.id !== h1?.id);
    if (!hs.length) continue;
    const max = Math.max(...hs.map((a) => a.font?.fs || 0));
    const hasH1Here = !!h1 && heads(s).some((a) => a.id === h1!.id);
    let titleDone = false;
    for (const a of hs) {
      const fs = a.font?.fs || 0;
      if (fs < 17) { out.set(a.id, 'p'); continue; }
      if (!titleDone && fs >= max * 0.9) {
        out.set(a.id, hasH1Here ? 'h2' : 'h2');
        titleDone = true;
        continue;
      }
      out.set(a.id, titleDone ? 'h3' : 'h2');
      if (!titleDone) titleDone = true;
    }
  }
  // Header, Megamenü, Fußzeile: keine Überschriften-Tags
  for (const s of sections) {
    if (s.isHeader || s.isMega || FOOTER.test(s.title || '')) heads(s).forEach((a) => out.set(a.id, 'p'));
  }
  return out;
}
