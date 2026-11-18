import Image from "next/image";
import Link from "next/link";
import silhouette from "@/assets/photos/silhouette-neon.webp";
import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import { typoDeep } from "@/i18n/typography";
import { errorCopy } from "./error-copy";

/** Contenu de la page 404, utilisable dans la mise en page du site ou en page autonome. */
export function NotFoundView({ locale }: { locale: Locale }) {
  const copy = typoDeep(locale, errorCopy[locale].notFound);
  return (
    <section className="container-site grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-24" aria-labelledby="not-found-title">
      <div className="lg:col-span-6">
        <p className="font-display text-[5rem] leading-none text-gold" aria-hidden="true">
          404
        </p>
        <h1 id="not-found-title" className="display-2 mt-4">
          {copy.title}
        </h1>
        <p className="lede mt-5 max-w-[42ch] text-mute">{copy.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={pathFor(locale, "home")} className="btn btn-primary">
            {copy.home}
          </Link>
          <Link href={pathFor(locale, "meats")} className="btn btn-secondary">
            {copy.meats}
          </Link>
        </div>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <div className="photo photo-lg aspect-[4/5] max-h-[70vh]">
          <Image src={silhouette} alt="" sizes="(min-width: 64rem) 40vw, 92vw" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
