import "@/styles/globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/app/fonts";
import { errorCopy as rawCopy } from "@/features/errors/error-copy";
import { typoDeep } from "@/i18n/typography";

const errorCopy = { fr: typoDeep("fr", rawCopy.fr), en: typoDeep("en", rawCopy.en) };

export const metadata: Metadata = {
  title: "404 | HussCut",
  robots: { index: false, follow: false },
};

/** 404 pour une adresse hors /fr et /en : la langue étant inconnue, la page est bilingue. */
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <main className="container-site grid min-h-dvh content-center gap-16 py-16 lg:grid-cols-2">
          {(["fr", "en"] as const).map((locale) => (
            <section key={locale} lang={locale} aria-labelledby={`title-${locale}`}>
              <p className="font-display text-[4rem] leading-none text-gold" aria-hidden="true">
                404
              </p>
              <h1 id={`title-${locale}`} className="display-3 mt-4">
                {errorCopy[locale].notFound.title}
              </h1>
              <p className="mt-4 max-w-[42ch] text-mute">{errorCopy[locale].notFound.text}</p>
              <Link href={`/${locale}`} className="btn btn-primary mt-6">
                {errorCopy[locale].notFound.home}
              </Link>
            </section>
          ))}
        </main>
      </body>
    </html>
  );
}
