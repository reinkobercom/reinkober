// Hilfsfunktionen: übersetzen die gemessenen Werte aus den Seitenmodellen
// (src/content/pages/*.json) in CSS-Variablen für die Komponenten.

export type Font = { fs?: number; lh?: number; fw?: number; color?: string; align?: string; ls?: number; tt?: string; fst?: string };
export type Frame = {
  kind?: string; bg?: string; grad?: string; radius?: string; border?: string; shadow?: string; pad?: string;
  backdrop?: string; text?: string; halign?: string; valign?: string;
  bgImage?: { src: string; pos?: string; overlay?: string };
};

const n = (v: number | undefined) => (v == null || Number.isNaN(v) ? undefined : Math.round(v * 100) / 100);

/** Objekt → style-String, leere Werte werden weggelassen. */
export function css(vars: Record<string, string | number | undefined | null | false>): string {
  return Object.entries(vars)
    .filter(([, v]) => v !== undefined && v !== null && v !== false && v !== '')
    .map(([k, v]) => `${k}:${v}`)
    .join(';');
}

const ALIGN: Record<string, string> = { left: 'left', center: 'center', right: 'right', justify: 'justify', start: 'left', end: 'right' };

export function fontVars(f?: Font, m?: Partial<Font>) {
  if (!f) return {};
  return {
    '--fs': n(f.fs), '--lh': n(f.lh), '--fw': f.fw && f.fw !== 400 ? f.fw : undefined,
    '--ls': f.ls ? n(f.ls) : undefined, '--tt': f.tt, '--tc': f.color,
    '--ta': f.align && f.align !== 'left' && f.align !== 'start' ? ALIGN[f.align] : undefined,
    '--fs-m': m?.fs != null ? n(m.fs) : undefined, '--lh-m': m?.lh != null ? n(m.lh) : undefined,
    '--ta-m': m?.align ? ALIGN[m.align] : undefined,
  };
}

export function frameVars(f?: Frame, m?: Frame) {
  if (!f) return {};
  const bg = f.grad || f.bg;
  return {
    '--f-bg': bg, '--f-bd': f.border, '--f-r': f.radius, '--f-sh': f.shadow,
    '--f-p': f.pad, '--f-p-m': m?.pad && m.pad !== f.pad ? m.pad : undefined, '--f-tc': f.text,
    '--f-ov': f.bgImage?.overlay,
  };
}

export const hasFrame = (f?: Frame) => !!f && !!(f.bg || f.grad || f.border || f.shadow || f.pad || f.bgImage || (f.radius && f.kind));

const FLEX: Record<string, string> = { top: 'flex-start', middle: 'center', bottom: 'flex-end', left: 'flex-start', center: 'center', right: 'flex-end' };
export const flex = (v?: string) => (v ? FLEX[v] : undefined);

/** Ist eine Farbe dunkel? (für Fokus-Rahmen auf dunklem Grund) */
export function isDark(hex?: string) {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) < 140;
}

/** Onepage-Padding "56px" oder "10px 20px 30px 40px" → mobil halbiert (Onepage-Verhalten). */
export function halfPad(p?: string) {
  if (!p) return undefined;
  return p.split(/\s+/).map((x) => `${Math.round(parseFloat(x) / 2)}px`).join(' ');
}
