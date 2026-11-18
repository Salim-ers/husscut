import Link from "next/link";
import type { CSSProperties } from "react";
import { KnifeRule } from "@/components/motion/KnifeRule";
import { Marquee } from "@/components/motion/Marquee";
import { SplitWords } from "@/components/motion/SplitWords";
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
    { key: "cut", photo: "gesteTrancheMarbree", ratio: "3 / 4" },
    { key: "counter", photo: "armoireMaturation", ratio: "4 / 5" },
    { key: "address", photo: "comptoirInterieur", ratio: "3 / 4" },
  ];
  const gestures: PhotoKey[] = ["gesteCouteauLongueLame", "gesteParage", "coffretNoirFleurs"];

  return (
    <>
      <section className="glow-red overflow-x-clip pt-8 pb-16 lg:pt-14 lg:pb-24" aria-labelledby="page-title">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          <figure className="lg:col-span-7">
            <Photo photo="portraitComptoir" locale={locale} sizes="(min-width: 64rem) 56vw, 92vw" ratio="4 / 5" large eager className="cut-edge [--cut:12%]" />
            <figcaption className="mt-3 text-sm text-mute">{h.portraitCaption}</figcaption>
          </figure>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-12">
            <p className="kicker load-in" style={{ "--i": 0 } as CSSProperties}>
            <span>
              <RichText text={h.kicker} />
            </span>
          </p>
            <SplitWords as="h1" id="page-title" mode="load" text={h.title} className="display-1 mt-6" />
            <p className="lede filet load-in mt-7" style={{ "--i": 2 } as CSSProperties}>
              {h.lede}
            </p>
          </div>
        </div>
      </section>

      <div className="overflow-x-clip pb-4">
        <Marquee items={dict.home.marquee.gestures} variant="ink" duration={46} />
      </div>

      <section className="surface-light py-20 lg:py-28" aria-label={h.title}>
        <div className="container-site flex flex-col gap-24 lg:gap-32">
          {chapters.map((chapter, index) => {
            const copy = h.chapters[chapter.key];
            const reversed = index % 2 === 1;
            return (
              <article key={chapter.key} className="grid gap-8 md:grid-cols-12 md:items-center md:gap-6" aria-labelledby={`chapitre-${chapter.key}`}>
                <div className={`md:col-span-6 lg:col-span-5 ${reversed ? "md:order-2 md:col-start-7 lg:col-start-8" : ""}`}>
                  <Photo photo={chapter.photo} locale={locale} sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 48vw, 92vw" ratio={chapter.ratio} large zoom reveal />
                </div>
                <div className={`md:col-span-6 lg:col-span-5 ${reversed ? "md:order-1 md:col-start-1 lg:col-start-2" : "md:col-start-7 lg:col-start-7"}`}>
                  <span className="index-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <SplitWords as="h2" id={`chapitre-${chapter.key}`} text={copy.title} className="display-1 mt-3" />
                  <p className="lede mt-5 max-w-[40ch] text-mute-ink" data-reveal="up">
                    {copy.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-ink py-20 lg:py-28" aria-labelledby="gestures-title">
        <div className="container-site">
          <p className="kicker" data-reveal="up">
            {h.gestures.kicker}
          </p>
          <SplitWords as="h2" id="gestures-title" text={h.gestures.title} className="display-1 mt-5 max-w-[16ch]" />
          <ul className="mt-14 grid gap-6 sm:grid-cols-3" role="list">
            {gestures.map((photo, index) => (
              <li key={photo} className={index === 1 ? "sm:mt-16" : undefined}>
                <figure>
                  <Photo photo={photo} locale={locale} sizes="(min-width: 64rem) 28vw, (min-width: 40rem) 30vw, 92vw" ratio="3 / 4" large zoom reveal delay={index * 140} />
                  <figcaption className="mt-4 flex items-baseline gap-3">
                    <span className="index-num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[1.25rem] font-semibold tracking-[0.08em] uppercase">{h.gestures.items[index]}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HalalBlock locale={locale} dict={dict} />

      <section className="surface-blood py-20 lg:py-28" aria-labelledby="invite-title">
        <div className="container-site">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SplitWords as="h2" id="invite-title" text={h.invite.title} className="display-1" />
              <p className="lede mt-5 text-ivory/90">
                <RichText text={h.invite.text} />
              </p>
            </div>
            <Link href={`${pathFor(locale, "contact")}#${pageAnchors.visit[locale]}`} className="btn btn-primary self-start md:self-auto">
              {h.invite.cta}
              <ArrowIcon />
            </Link>
          </div>
          <KnifeRule className="mt-14" />
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
    <section id={pageAnchors.halal[locale]} className="scroll-mt-24 border-t border-ivory/10 bg-char py-16 lg:py-20" aria-labelledby="halal-title">
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
