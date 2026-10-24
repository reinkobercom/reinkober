// Cookie-Einwilligung: speichern, lesen und auf Änderungen reagieren.
export type Consent = { functional: boolean; performance: boolean; marketing: boolean };
const KEY = 'rk-consent-v1';
const listeners: ((c: Consent) => void)[] = [];

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function setConsent(c: Consent) {
  try { localStorage.setItem(KEY, JSON.stringify({ ...c, ts: Date.now() })); } catch { /* privater Modus */ }
  listeners.forEach((fn) => fn(c));
  document.dispatchEvent(new CustomEvent('rk:consent', { detail: c }));
}

/** Ruft fn sofort (falls bereits eingewilligt) und bei jeder Änderung auf. */
export function onConsent(fn: (c: Consent) => void) {
  listeners.push(fn);
  const c = getConsent();
  if (c) fn(c);
}
