// Steuerung der mehrstufigen Formulare im Browser: Schritte, Prüfung, Versand.
// Ohne JavaScript schickt das Formular klassisch ab (alle Schritte sichtbar).

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let initialised = false;

export function fieldsOf(step: Element) {
  return [...step.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input:not([type=hidden]), textarea, select')]
    .filter((el) => !el.closest('.msf__hp'));
}

/** Prüft einen Schritt. Gibt eine Fehlermeldung zurück oder null. */
export function validate(step: Element): { msg: string; el?: HTMLElement } | null {
  const els = fieldsOf(step);
  const groups = new Map<string, HTMLInputElement[]>();
  for (const el of els) {
    if (el instanceof HTMLInputElement && (el.type === 'radio' || el.type === 'checkbox') && el.name !== '_privacy') {
      groups.set(el.name, [...(groups.get(el.name) || []), el]);
      continue;
    }
    const v = (el.value || '').trim();
    if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      if (el.required && !el.checked) return { msg: 'Bitte bestätigen Sie die Datenschutzerklärung.', el };
      continue;
    }
    if (el.required && !v) return { msg: 'Bitte füllen Sie dieses Feld aus.', el };
    if (v && el instanceof HTMLInputElement && el.type === 'email' && !EMAIL.test(v)) return { msg: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', el };
    if (v && el instanceof HTMLInputElement && el.type === 'tel' && v.replace(/[^\d]/g, '').length < 6) return { msg: 'Bitte geben Sie eine gültige Telefonnummer ein.', el };
  }
  for (const [, inputs] of groups) {
    const required = inputs.some((i) => i.required);
    if (required && !inputs.some((i) => i.checked)) return { msg: 'Bitte wählen Sie eine Option aus.', el: inputs[0] };
  }
  return null;
}

export function showError(step: Element, err: { msg: string; el?: HTMLElement } | null) {
  const box = step.querySelector<HTMLElement>('[data-error]');
  step.querySelectorAll('[aria-invalid]').forEach((e) => e.removeAttribute('aria-invalid'));
  if (!box) return;
  if (!err) { box.hidden = true; box.textContent = ''; return; }
  box.textContent = err.msg;
  box.hidden = false;
  if (err.el) { err.el.setAttribute('aria-invalid', 'true'); err.el.setAttribute('aria-describedby', box.id || ''); err.el.focus({ preventScroll: false }); }
}

export function collect(form: HTMLFormElement) {
  const data: Record<string, string> = {};
  const fd = new FormData(form);
  for (const [k, v] of fd.entries()) {
    const val = String(v);
    data[k] = data[k] ? `${data[k]}, ${val}` : val;
  }
  return data;
}

function setStep(form: HTMLFormElement, i: number, focus = true) {
  const steps = [...form.querySelectorAll<HTMLElement>('[data-step]')];
  steps.forEach((s, n) => { if (n === i) s.setAttribute('data-active', ''); else s.removeAttribute('data-active'); });
  form.dataset.current = String(i);
  const total = steps.length + 1;
  const bar = form.querySelector<HTMLElement>('[data-progress]');
  const label = form.querySelector<HTMLElement>('[data-progress-label]');
  if (bar) bar.style.width = `${((i + 1) / total) * 100}%`;
  if (label) label.textContent = form.dataset.form === 'bewerbung' ? `${i + 1} / ${total}` : `${Math.round(((i + 1) / total) * 100)}%`;
  if (focus) {
    const first = fieldsOf(steps[i])[0] as HTMLElement | undefined;
    (first || steps[i]).focus({ preventScroll: true });
  }
}

async function submit(form: HTMLFormElement) {
  const btn = form.querySelector<HTMLButtonElement>('[data-submit]');
  const step = form.querySelector('[data-step][data-active]') || form;
  const fallback = form.querySelector<HTMLElement>('[data-fallback]');
  if (btn) { btn.disabled = true; btn.classList.add('is-loading'); }
  if (fallback) fallback.hidden = true;
  try {
    const res = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(collect(form)) });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.ok) {
      if (json.field) { showError(step, { msg: json.error || 'Bitte prüfen Sie Ihre Angaben.' }); }
      else { showError(step, { msg: json.error || 'Ihre Anfrage konnte nicht gesendet werden.' }); if (fallback) fallback.hidden = false; }
      return;
    }
    // Conversion-Ereignis für Tracking (nur aktiv, wenn eingewilligt)
    const w = window as any;
    try { w.gtag?.('event', 'generate_lead', { form: form.dataset.form }); w.fbq?.('track', 'Lead'); } catch { /* egal */ }
    const to = form.dataset.redirect;
    if (to) { location.href = to; return; }
    form.querySelectorAll<HTMLElement>('[data-step], .msf__progress').forEach((s) => (s.hidden = true));
    const done = form.querySelector<HTMLElement>('[data-done]');
    if (done) { done.hidden = false; done.focus(); }
  } catch {
    showError(step, { msg: 'Ihre Anfrage konnte nicht gesendet werden – bitte prüfen Sie Ihre Internetverbindung.' });
    if (fallback) fallback.hidden = false;
  } finally {
    if (btn) { btn.disabled = false; btn.classList.remove('is-loading'); }
  }
}

export function initForms() {
  if (initialised) return;
  initialised = true;
  document.documentElement.classList.add('js-forms');
  let utm = '';
  try { utm = localStorage.getItem('one_utm') || ''; } catch { /* */ }
  // UTM-Parameter merken (wie bisher bei Onepage)
  try {
    const p = new URLSearchParams(location.search); const u: Record<string, string> = {};
    p.forEach((v, k) => { if (k.startsWith('utm_')) u[k.slice(4)] = v; });
    if (Object.keys(u).length) { utm = JSON.stringify(u); localStorage.setItem('one_utm', utm); }
  } catch { /* */ }

  document.querySelectorAll<HTMLFormElement>('form[data-msf]').forEach((form) => {
    form.querySelector<HTMLInputElement>('[data-started]')!.value = String(Date.now());
    form.querySelector<HTMLInputElement>('[data-utm]')!.value = utm;
    const steps = [...form.querySelectorAll<HTMLElement>('[data-step]')];
    setStep(form, 0, false);
    steps.forEach((st, i) => {
      st.querySelector('[data-error]')?.setAttribute('id', `${form.id}-err-${i}`);
      st.querySelector('[data-next]')?.addEventListener('click', () => {
        const err = validate(st);
        showError(st, err);
        if (err) return;
        // Potenzial-Analyse oben → Angaben ans Formular unten übergeben
        const target = form.dataset.handoff ? document.querySelector<HTMLFormElement>(`form[data-instance="${form.dataset.handoff}"]`) : null;
        if (target) {
          fieldsOf(st).forEach((el) => {
            const t = target.querySelector<HTMLInputElement>(`[name="${CSS.escape(el.name)}"]`);
            if (t) t.value = el.value;
          });
          setStep(target, 1, false);
          target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
          setTimeout(() => (fieldsOf(target.querySelector('[data-step][data-active]')!)[0] as HTMLElement | undefined)?.focus({ preventScroll: true }), 500);
          return;
        }
        setStep(form, i + 1);
      });
      // Enter in Textfeld = weiter
      st.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'INPUT' && (e.target as HTMLInputElement).type !== 'checkbox') {
          const next = st.querySelector<HTMLButtonElement>('[data-next]');
          if (next) { e.preventDefault(); next.click(); }
        }
      });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const cur = steps[+(form.dataset.current || 0)] || steps[steps.length - 1];
      const err = validate(cur);
      showError(cur, err);
      if (!err) submit(form);
    });
  });
}
