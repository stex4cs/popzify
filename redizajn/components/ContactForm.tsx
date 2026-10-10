"use client";

import { useEffect, useRef, useState } from "react";
import { dict, type Locale } from "@/lib/i18n";
import styles from "./ContactForm.module.css";

type State = { kind: "idle" | "sending" | "ok" | "err"; msg?: string };

/**
 * Upit sa kontakt stanice.
 *
 * Ruta /api/lead vraca uspeh samo kad je e-mail stvarno otisao, pa se
 * ovde nikad ne prikazuje "hvala" preko greske. Poruka servera ima
 * prednost nad opstom, jer zna sta je tacno palo.
 */
export default function ContactForm({
  locale,
  stranica,
  prosireno,
  usluge,
}: {
  locale: Locale;
  /** Sa koje strane je upit stigao; ulazi u e-mail. */
  stranica?: string;
  /** Kampanjske strane pitaju i za rok i za tempo, da se upit kvalifikuje. */
  prosireno?: boolean;
  /** Sopstveni spisak u polju izbora; bez njega ide opsti. */
  usluge?: string[];
}) {
  const t = dict[locale].form;
  const [state, setState] = useState<State>({ kind: "idle" });
  const srcRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Odakle je posetilac stigao. Cita se tek na klijentu da strana
    // ostane staticna.
    if (!srcRef.current) return;
    const q = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign"]
      .map((k) => q.get(k))
      .filter(Boolean)
      .join(" / ");
    srcRef.current.value = utm || document.referrer || "direktno";
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/lead", { method: "POST", body: new FormData(form) });
      const data = await res.json().catch(() => null);
      if (data?.status === "success") {
        setState({ kind: "ok" });
        return;
      }
      setState({ kind: "err", msg: data?.message });
    } catch {
      setState({ kind: "err" });
    }
  }

  if (state.kind === "ok") {
    return (
      <p className={styles.ok} role="status">
        {t.ok}
      </p>
    );
  }

  const busy = state.kind === "sending";

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <fieldset disabled={busy}>
        <legend className="mono">{t.legend}</legend>

        <div className={styles.row}>
          <label>
            <span className="mono">{t.name}</span>
            <input name="ime" type="text" required autoComplete="name" maxLength={120} />
          </label>
          <label>
            <span className="mono">{t.phone}</span>
            <input name="telefon" type="tel" required autoComplete="tel" maxLength={40} />
          </label>
        </div>

        <div className={styles.row}>
          <label>
            <span className="mono">
              {t.email} <i>{t.optional}</i>
            </span>
            <input name="email" type="email" autoComplete="email" maxLength={160} />
          </label>
          <label>
            <span className="mono">{t.service}</span>
            <select name="usluga" defaultValue="">
              <option value="" disabled>
                {t.servicePick}
              </option>
              {(usluge ?? t.services).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          <span className="mono">
            {t.message} <i>{t.optional}</i>
          </span>
          <textarea name="poruka" rows={3} maxLength={3000} />
        </label>

        {prosireno && (
          <div className={styles.row}>
            <label>
              <span className="mono">{t.when}</span>
              <select name="rok" defaultValue="">
                <option value="" disabled>
                  {t.servicePick}
                </option>
                {t.whenOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="mono">{t.pace}</span>
              <select name="tempo" defaultValue="">
                <option value="" disabled>
                  {t.servicePick}
                </option>
                {t.paceOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        <label className={styles.consent}>
          <input name="saglasnost" type="checkbox" required />
          <span>
            {t.consent}
            <a href={`/${locale}/privatnost`} target="_blank" rel="noopener">
              {t.consentLink}
            </a>
            {t.consentAfter}
          </span>
        </label>

        {/* Nevidljivo ljudima, popunjavaju ga botovi. */}
        <input ref={srcRef} name="izvor" type="hidden" />
        <input name="stranica" type="hidden" value={stranica || "pocetna"} />
        <div className={styles.trap} aria-hidden="true">
          <label>
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <button type="submit" className={styles.submit}>
          {busy ? t.sending : t.submit}
        </button>
      </fieldset>

      <p className={styles.msg} role="status" aria-live="polite">
        {state.kind === "err" ? state.msg || t.error : ""}
      </p>
    </form>
  );
}
