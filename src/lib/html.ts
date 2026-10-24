// Kleine HTML-Helfer für Texte aus den Seitenmodellen.

/** Überschriften-Inhalt: Block-Tags entfernen. Mehrere Absätze bleiben eigene Zeilen;
 *  abweichende Schriftgrößen (data-fs) werden relativ zur Hauptgröße übernommen. */
export function inlineHtml(html = '', baseFs?: number): string {
  const blocks = [...html.matchAll(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/g)];
  let h: string;
  if (blocks.length > 1) {
    h = blocks
      .map((m) => {
        const attrs = m[1] || '';
        const fs = attrs.match(/data-fs="([\d.]+)"/)?.[1];
        const lh = attrs.match(/data-lh="([\d.]+)"/)?.[1];
        const fw = attrs.match(/data-fw="(\d+)"/)?.[1];
        const inner = m[2].replace(/(<br>\s*)+$/g, '');
        if (!inner.trim()) return '';
        const st = fs && baseFs ? ` style="font-size:${(+fs / baseFs).toFixed(4)}em;${lh ? `line-height:${(+lh / +fs).toFixed(4)};` : ''}${fw ? `font-weight:${fw}` : ''}"` : '';
        return `<span class="hb"${st}>${inner}</span>`;
      })
      .filter(Boolean)
      .join('');
  } else {
    h = html.replace(/<\/?(p|h[1-6]|ul|ol|li|blockquote)(\s[^>]*)?>/g, '');
  }
  h = h.replace(/(<br>\s*)+$/g, '').replace(/^(\s*<br>)+/g, '').trim();
  const m = h.match(/^<strong>([\s\S]*)<\/strong>$/);
  if (m && !m[1].includes('<strong>')) h = m[1];
  return h.trim();
}

/** Fließtext: sicherstellen, dass Text in <p> steht. */
export function blockHtml(html = ''): string {
  const h = html.trim();
  if (!h) return '';
  if (/^<(p|ul|ol|h[1-6]|blockquote)[\s>]/.test(h)) return h.replace(/<p\s+data-fs="[^"]*"[^>]*>/g, '<p>');
  return `<p>${h}</p>`;
}

/** Reiner Text (für Meta-Descriptions, Alt-Fallbacks). */
export function plainText(html = ''): string {
  return html.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Externe Links bekommen rel/target-Attribute, interne bleiben unverändert. */
export function linkAttrs(href?: string, target?: string) {
  if (!href) return {};
  const ext = /^https?:\/\//.test(href) && !/^https?:\/\/(www\.)?reinkober\.com/.test(href);
  return {
    href,
    target: target || undefined,
    rel: ext ? (target === '_blank' ? 'noopener' : undefined) : undefined,
  };
}

/** Links normalisieren: absolute reinkober.com-URLs → relativ, "www.x.de" ohne Protokoll → https. */
export function fixHref(href?: string | null): string | undefined {
  if (!href) return undefined;
  let h = href.trim();
  if (/^(https?:\/\/)?(www\.)?reinkober\.com/i.test(h)) h = h.replace(/^(https?:\/\/)?(www\.)?reinkober\.com/i, '') || '/';
  else if (/^www\./i.test(h)) h = `https://${h}`;
  if (h === '') return undefined;
  return h;
}
