// Onboarding-Interview: Startseite → Fragen → Abschluss.
import { validate, showError, collect, fieldsOf } from './forms-client';

export function initInterview() {
  const root = document.querySelector<HTMLElement>('[data-interview]');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = '1';
  const start = root.querySelector<HTMLElement>('[data-itv-start]')!;
  const form = root.querySelector<HTMLFormElement>('[data-itv-form]')!;
  const done = root.querySelector<HTMLElement>('[data-itv-done]')!;
  const pct = root.querySelector<HTMLElement>('[data-itv-pct]')!;
  const fill = root.querySelector<HTMLElement>('[data-itv-fill]')!;
  const steps = [...form.querySelectorAll<HTMLElement>('[data-step]')];
  const total = +(root.dataset.total || steps.length + 2);
  form.querySelector<HTMLInputElement>('[data-started]')!.value = String(Date.now());
  try { form.querySelector<HTMLInputElement>('[data-utm]')!.value = localStorage.getItem('one_utm') || ''; } catch { /* */ }

  const progress = (pos: number) => { const p = `${Math.round(((pos + 1) / total) * 100)}%`; pct.textContent = p; fill.style.width = p; };
  const show = (i: number) => {
    start.hidden = i >= 0 ? true : false;
    form.hidden = i < 0;
    steps.forEach((s, n) => (s.hidden = n !== i));
    progress(i + 1);
    if (i >= 0) { const f = fieldsOf(steps[i])[0] as HTMLElement | undefined; (f || steps[i]).focus({ preventScroll: true }); }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };
  steps.forEach((s) => (s.hidden = true));

  // "Jetzt los legen" auf der Startseite
  start.querySelectorAll<HTMLElement>('[data-form-next], .btn').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); show(0); }));
  steps.forEach((st, i) => {
    st.querySelector('[data-prev]')?.addEventListener('click', () => show(i - 1));
    st.querySelector('[data-next]')?.addEventListener('click', () => {
      const err = validate(st); showError(st, err); if (!err) show(i + 1);
    });
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const st = steps[steps.length - 1];
    const err = validate(st); showError(st, err); if (err) return;
    const btn = st.querySelector<HTMLButtonElement>('[data-submit]');
    const fb = form.querySelector<HTMLElement>('[data-fallback]');
    if (btn) btn.disabled = true;
    try {
      const res = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(collect(form)) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) { showError(st, { msg: json.error || 'Ihre Angaben konnten nicht gesendet werden.' }); if (fb) fb.hidden = false; return; }
      form.hidden = true; done.hidden = false; progress(total - 1); done.focus();
    } catch {
      showError(st, { msg: 'Ihre Angaben konnten nicht gesendet werden – bitte prüfen Sie Ihre Internetverbindung.' }); if (fb) fb.hidden = false;
    } finally { if (btn) btn.disabled = false; }
  });
}
