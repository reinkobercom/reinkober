// Formular-Endpunkt für alle Formulare der Website.
// Läuft als Vercel-Funktion (on demand), alle Seiten bleiben statisch.
// Versand über Resend; API-Key nur als Umgebungsvariable RESEND_API_KEY.
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { forms, type FormDef } from '../../data/forms';
import { formRecipients, formSender, site } from '../../data/site';

export const prerender = false;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LEN = 5000;

// Einfaches Rate-Limit je IP (pro Server-Instanz): max. 5 Anfragen pro Minute
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

type Result = { ok: true } | { ok: false; error: string; field?: string; status: number };

function fieldList(form: FormDef) {
  return form.steps.flatMap((s) => s.fields.map((f) => ({ ...f, step: s.title })));
}

function validate(form: FormDef, data: Record<string, string>): Result {
  for (const f of fieldList(form)) {
    const v = (data[f.name] || '').trim();
    if (v.length > MAX_LEN) return { ok: false, status: 400, field: f.name, error: `Das Feld „${f.name}“ ist zu lang.` };
    if (f.required && !v) return { ok: false, status: 400, field: f.name, error: `Bitte füllen Sie das Feld „${f.label || f.placeholder || f.name}“ aus.` };
    if (v && f.type === 'email' && !EMAIL.test(v)) return { ok: false, status: 400, field: f.name, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' };
    if (v && f.type === 'tel' && v.replace(/[^\d]/g, '').length < 6) return { ok: false, status: 400, field: f.name, error: 'Bitte geben Sie eine gültige Telefonnummer ein.' };
    if (v && (f.type === 'choice' || f.type === 'select') && f.options?.length && !f.options.includes(v)) return { ok: false, status: 400, field: f.name, error: 'Ungültige Auswahl.' };
  }
  if (data._privacy !== 'ja') return { ok: false, status: 400, field: '_privacy', error: 'Bitte bestätigen Sie die Datenschutzerklärung.' };
  return { ok: true };
}

function buildMail(form: FormDef, data: Record<string, string>, meta: { page: string; utm: string; ip: string }) {
  const rows = fieldList(form)
    .filter((f) => (data[f.name] || '').trim())
    .map((f) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top;color:#555;width:38%"><strong>${esc(f.name)}</strong>${f.step && f.step !== f.name ? `<br><span style="font-size:12px;color:#888">${esc(f.step)}</span>` : ''}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${esc(data[f.name].trim())}</td></tr>`)
    .join('');
  const text = fieldList(form)
    .filter((f) => (data[f.name] || '').trim())
    .map((f) => `${f.name}: ${data[f.name].trim()}`)
    .join('\n');
  let utm = '';
  try { const u = meta.utm ? JSON.parse(meta.utm) : null; if (u) utm = Object.entries(u).map(([k, v]) => `utm_${k}=${v}`).join(', '); } catch { /* */ }
  const footer = `Gesendet über ${site.url}${meta.page} am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}${utm ? ` · ${utm}` : ''}`;
  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#151f25;line-height:1.5">
<h2 style="margin:0 0 12px">Neue Anfrage: ${esc(form.name)}</h2>
<table style="border-collapse:collapse;width:100%;max-width:720px;font-size:14px">${rows}</table>
<p style="font-size:12px;color:#888;margin-top:16px">${esc(footer)}<br>Datenschutz-Einwilligung: ja</p>
</body></html>`;
  return { html, text: `Neue Anfrage: ${form.name}\n\n${text}\n\n${footer}\nDatenschutz-Einwilligung: ja` };
}

function respond(req: Request, status: number, body: Record<string, unknown>, redirect?: string) {
  const wantsJson = (req.headers.get('accept') || '').includes('application/json') || (req.headers.get('content-type') || '').includes('application/json');
  if (wantsJson) return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
  if (body.ok && redirect) return new Response(null, { status: 303, headers: { Location: redirect } });
  // Ohne JavaScript: einfache, verständliche Rückmeldung
  const msg = body.ok ? 'Vielen Dank! Ihre Angaben sind bei uns angekommen.' : `${body.error || 'Es ist ein Fehler aufgetreten.'}`;
  return new Response(`<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${body.ok ? 'Danke' : 'Hinweis'} | reinkober.com</title>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:15vh auto;padding:0 24px;color:#151f25;line-height:1.6">
<p style="font-size:20px;font-weight:700">${esc(msg)}</p>
${body.ok ? '' : `<p>Bitte gehen Sie zurück und prüfen Sie Ihre Angaben – oder rufen Sie uns an: <a href="${site.phoneHref}">${site.phone}</a>.</p><p><a href="javascript:history.back()">← Zurück zum Formular</a></p>`}
<p><a href="/">Zur Startseite</a></p></body></html>`, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let data: Record<string, string> = {};
  try {
    if ((request.headers.get('content-type') || '').includes('application/json')) {
      const j = await request.json();
      for (const [k, v] of Object.entries(j || {})) data[k] = Array.isArray(v) ? v.join(', ') : String(v ?? '');
    } else {
      const fd = await request.formData();
      for (const [k, v] of fd.entries()) data[k] = data[k] ? `${data[k]}, ${v}` : String(v);
    }
  } catch {
    return respond(request, 400, { ok: false, error: 'Die Anfrage konnte nicht gelesen werden.' });
  }

  const form = forms[data._form];
  if (!form) return respond(request, 400, { ok: false, error: 'Unbekanntes Formular.' });

  // Spamschutz: Honeypot + zu schnelles Absenden (< 3 Sekunden) → still verwerfen
  const started = Number(data._t || 0);
  if (data._website || (started && Date.now() - started < 3000)) {
    console.warn('[anfrage] Spam verworfen', { form: form.key, honeypot: !!data._website });
    return respond(request, 200, { ok: true }, form.redirect || undefined);
  }
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || clientAddress || 'unknown';
  if (limited(ip)) return respond(request, 429, { ok: false, error: 'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in einer Minute erneut.' });

  const v = validate(form, data);
  if (!v.ok) return respond(request, v.status, { ok: false, error: v.error, field: v.field });

  const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[anfrage] RESEND_API_KEY fehlt – Anfrage NICHT versendet', { form: form.key, data });
    return respond(request, 500, { ok: false, error: `Ihre Anfrage konnte gerade nicht übermittelt werden. Bitte rufen Sie uns an: ${site.phone}` });
  }

  const replyEmail = fieldList(form).map((f) => (f.type === 'email' ? (data[f.name] || '').trim() : '')).find((x) => EMAIL.test(x));
  const nameField = ['Name', 'Vorname', 'Firma / Ansprechpartner'].map((n) => data[n]).find(Boolean);
  const subject = `Neue Anfrage: ${form.name}${nameField ? ` – ${nameField.slice(0, 60)}` : ''}`;
  const { html, text } = buildMail(form, data, { page: data._page || '', utm: data._utm || '', ip });

  try {
    const resend = new Resend(apiKey);
    const { data: sent, error } = await resend.emails.send({
      from: formSender.from,
      to: formRecipients[form.key] || formRecipients.kontakt,
      replyTo: replyEmail || undefined,
      subject,
      html,
      text,
      tags: [{ name: 'formular', value: form.key.replace(/[^a-zA-Z0-9_-]/g, '_') }],
    });
    if (error || !sent?.id) {
      // Wichtig: protokollieren, damit keine Anfrage verloren geht (Vercel → Logs)
      console.error('[anfrage] Resend-Fehler', { form: form.key, error, data });
      return respond(request, 502, { ok: false, error: `Ihre Anfrage konnte leider nicht gesendet werden. Bitte rufen Sie uns an: ${site.phone}` });
    }
    console.log('[anfrage] gesendet', { form: form.key, id: sent.id });
    return respond(request, 200, { ok: true, id: sent.id }, form.redirect || undefined);
  } catch (e) {
    console.error('[anfrage] Versand fehlgeschlagen', { form: form.key, error: String(e), data });
    return respond(request, 502, { ok: false, error: `Ihre Anfrage konnte leider nicht gesendet werden. Bitte rufen Sie uns an: ${site.phone}` });
  }
};

export const ALL: APIRoute = () => new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
