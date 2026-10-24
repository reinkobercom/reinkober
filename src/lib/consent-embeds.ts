// Aktiviert gesperrte externe Inhalte (Videos, Bewertungen, Karte), sobald
// "Funktionale" Cookies erlaubt sind oder auf "Ich bin einverstanden" geklickt wird.
import { getConsent, setConsent, onConsent } from './consent';

function activate(box: HTMLElement) {
  const tpl = box.querySelector('template');
  if (!tpl) return;
  const frag = tpl.content.cloneNode(true) as DocumentFragment;
  // <script>-Tags aus Templates werden nicht ausgeführt – neu erzeugen
  frag.querySelectorAll('script').forEach((old) => {
    const s = document.createElement('script');
    [...old.attributes].forEach((at) => s.setAttribute(at.name, at.value));
    s.textContent = old.textContent;
    old.replaceWith(s);
  });
  box.querySelector('[data-blocker]')?.remove();
  tpl.replaceWith(frag);
  box.removeAttribute('data-consent-embed');
  box.style.minHeight = '';
}

export function initEmbeds() {
  onConsent((c) => {
    if (c.functional) document.querySelectorAll<HTMLElement>('[data-consent-embed]').forEach(activate);
  });
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-consent-accept]');
    if (!btn) return;
    const c = getConsent() || { functional: false, performance: false, marketing: false };
    setConsent({ ...c, functional: true });
  });
}
