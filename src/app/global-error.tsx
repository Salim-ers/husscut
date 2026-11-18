"use client";

import "@/styles/globals.css";
import { useEffect } from "react";
import { business } from "@/content/business";
import { errorCopy as rawCopy } from "@/features/errors/error-copy";
import { typoDeep } from "@/i18n/typography";

const errorCopy = { fr: typoDeep("fr", rawCopy.fr), en: typoDeep("en", rawCopy.en) };

/** Dernier filet de sécurité si la mise en page elle-même échoue. Bilingue, sans détail technique. */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[app] erreur globale", error.digest ?? "");
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <main className="container-site grid min-h-dvh content-center gap-12 py-16 lg:grid-cols-2">
          {(["fr", "en"] as const).map((locale) => (
            <section key={locale} lang={locale}>
              <h1 className="display-3">{errorCopy[locale].generic.title}</h1>
              <p className="mt-4 max-w-[44ch] text-mute">{errorCopy[locale].generic.text}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn btn-primary" onClick={reset}>
                  {errorCopy[locale].generic.retry}
                </button>
                <a href={`tel:${business.phone.e164}`} className="btn btn-secondary">
                  {business.phone.display}
                </a>
              </div>
            </section>
          ))}
        </main>
      </body>
    </html>
  );
}
