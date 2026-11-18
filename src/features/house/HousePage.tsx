import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ArrowIcon } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import { business } from "@/content/business";
import type { PhotoKey } from "@/content/media";
import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { pathFor } from "@/i18n/routes";

/** « La maison » : le lieu, le comptoir et l'offre, sans biographie non sourcée. */
export function HousePage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.house;
  const chapters: { key: keyof typeof h.chapters; photo: PhotoKey; ratio: string }[] = [
    { key: "cut", photo: "gesteParage", ratio: "3 / 4" },
    { key: "counter", photo: "armoireMaturation", ratio: "4 / 5" },
    { key: "address", photo: "comptoirInterieur", ratio: "3 / 4" },
  ];

  return (
    <>
      <section className="pt-10 pb-20 lg:pt-16 lg:pb-28" aria-labelledby="page-title">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          <figure className="lg:col-span-7">
            <Photo photo="portraitComptoir" locale={locale} sizes="(min-width: 64rem) 56vw, 92vw" ratio="4 / 5" large eager className="cut-edge [--cut:12%]" />
            <figcaption className="mt-3 text-sm text-mute">{h.portraitCaption}</figcaption>
          </figure>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-12">
            <h1 id="page-title" className="display-1">
              {h.title}
            </h1>
            <p className="lede filet mt-6">{h.lede}</p>
          </div>
        </div>
      </section>

      <section className="surface-light py-20 lg:py-28" aria-label={h.title}>
        <div className="container-site flex flex-col gap-20 lg:gap-28">
          {chapters.map((chapter, index) => {
            const copy = h.chapters[chapter.key];
            const reversed = index % 2 === 1;
            return (
              <article key={chapter.key} className="grid gap-8 md:grid-cols-12 md:items-center md:gap-6" aria-labelledby={`chapitre-${chapter.key}`}>
                <div className={`md:col-span-6 lg:col-span-5 ${reversed ? "md:order-2 md:col-start-7 lg:col-start-8" : ""}`}>
                  <Photo photo={chapter.photo} locale={locale} sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 48vw, 92vw" ratio={chapter.ratio} large zoom reveal />
                </div>
                <div className={`md:col-span-6 lg:col-span-5 ${reversed ? "md:order-1 md:col-start-1 lg:col-start-2" : "md:col-start-7 lg:col-start-7"}`}>
                  <h2 id={`chapitre-${chapter.key}`} className="display-2">
                    {copy.title}
                  </h2>
                  <p className="lede mt-5 max-w-[40ch] text-mute-ink">{copy.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <HalalBlock locale={locale} dict={dict} />

      <section className="border-t border-ivory/10 py-20 lg:py-24" aria-labelledby="invite-title">
        <div className="container-site flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="invite-title" className="display-2">
              {h.invite.title}
            </h2>
            <p className="lede mt-4 text-mute">
              <RichText text={h.invite.text} />
            </p>
          </div>
          <Link href={`${pathFor(locale, "contact")}#${pageAnchors.visit[locale]}`} className="btn btn-primary self-start md:self-auto">
            {h.invite.cta}
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  );
}

/**
 * Bloc certification halal. Tant que HussCut n'a pas validé l'organisme, le périmètre et
 * le justificatif (business.halalCertification), il oriente vers la boutique, sans sceau.
 */
function HalalBlock({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.house.halal;
  const certification = business.halalCertification;
  return (
    <section id={pageAnchors.halal[locale]} className="scroll-mt-24 bg-char py-16 lg:py-20" aria-labelledby="halal-title">
      <div className="container-site grid gap-6 lg:grid-cols-12">
        <h2 id="halal-title" className="display-3 lg:col-span-4">
          {h.title}
        </h2>
        <div className="filet lg:col-span-6 lg:col-start-6">
          {certification ? (
            <dl className="grid gap-3">
              <div>
                <dt className="text-sm text-mute">{h.certifier}</dt>
                <dd className="text-lg">{certification.certifier}</dd>
              </div>
              <div>
                <dt className="text-sm text-mute">{h.scope}</dt>
                <dd className="text-lg">{certification.scope[locale]}</dd>
              </div>
              {certification.proofUrl ? (
                <dd>
                  <ExternalLink href={certification.proofUrl} newTabLabel={dict.a11y.newTab} className="link-quiet">
                    {h.proof}
                  </ExternalLink>
                </dd>
              ) : null}
            </dl>
          ) : (
            <p className="lede max-w-[52ch]">{h.pending}</p>
          )}
        </div>
      </div>
    </section>
  );
}
