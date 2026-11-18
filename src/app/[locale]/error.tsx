"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { business } from "@/content/business";
import { errorCopy } from "@/features/errors/error-copy";
import { isLocale } from "@/i18n/config";
import { typoDeep } from "@/i18n/typography";

/** Erreur inattendue dans une page : message utile, sans détail technique, et voie de secours. */
export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params.locale) ? params.locale : "fr";
  const copy = typoDeep(locale, errorCopy[locale].generic);

  useEffect(() => {
    // Le digest permet de retrouver l'erreur dans les journaux du serveur, sans exposer la pile.
    console.error("[page] erreur d'affichage", error.digest ?? "");
  }, [error]);

  return (
    <section className="container-site py-20 lg:py-28" aria-labelledby="error-title">
      <h1 id="error-title" className="display-2 max-w-[18ch]">
        {copy.title}
      </h1>
      <p className="lede mt-5 max-w-[48ch] text-mute">{copy.text}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn btn-primary" onClick={reset}>
          {copy.retry}
        </button>
        <Link href={`/${locale}`} className="btn btn-secondary">
          {copy.home}
        </Link>
        <a href={`tel:${business.phone.e164}`} className="btn btn-secondary">
          {business.phone.display}
        </a>
      </div>
    </section>
  );
}
