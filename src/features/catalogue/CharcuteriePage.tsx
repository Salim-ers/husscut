import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";
import { Marquee } from "@/components/motion/Marquee";
import { SplitWords } from "@/components/motion/SplitWords";
import { PageHero } from "@/components/shared/PageHero";
import { Photo } from "@/components/ui/Photo";
import { charcuterieGroups } from "@/content/catalogue";
import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { contactRequestHref } from "@/features/contact/lib/topics";
import { CatalogueSection } from "./CatalogueSection";

/** « La charcuterie » : fines tranches, fumés et secs, à partager, puis planches et coffrets. */
export function CharcuteriePage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.charcuterie;
  const labels = { askAvailability: dict.actions.askAvailability, sectionCount: dict.meats.sectionCount };
  return (
    <>
      <PageHero locale={locale} kicker={c.kicker} title={c.title} lede={c.lede} photo="coffretFleursJaunes" secondPhoto="tranchesPersillees">
            <nav aria-label={c.title}>
              <ul className="flex flex-wrap gap-2" role="list">
                {charcuterieGroups.map((group) => (
                  <li key={group.id}>
                    <a href={`#${group.anchor[locale]}`} className="chip">
                      {group.name[locale]}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`#${pageAnchors.platters[locale]}`} className="chip">
                    {c.platters.title}
                  </a>
                </li>
              </ul>
            </nav>
      </PageHero>
      <div className="overflow-x-clip pb-4">
        <Marquee items={dict.home.marquee.gestures} variant="ink" reverse duration={46} />
      </div>

      <div className="surface-light pb-16">
        <div className="container-site">
          {charcuterieGroups.map((group) => (
            <CatalogueSection key={group.id} section={group} locale={locale} labels={labels} />
          ))}
          <p className="filet mt-4 max-w-[62ch] text-[0.9375rem] text-mute-ink">{c.speciesNote}</p>
        </div>
      </div>

      <section id={pageAnchors.platters[locale]} className="surface-blood scroll-mt-24 overflow-x-clip py-20 lg:py-28" aria-labelledby="platters-title">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6">
          <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:col-start-1">
            <Photo photo="coffretFromages" locale={locale} sizes="(min-width: 64rem) 24vw, 46vw" ratio="4 / 5" large reveal className="-rotate-2" />
            <Photo photo="coffretPenseesJaunes" locale={locale} sizes="(min-width: 64rem) 24vw, 46vw" ratio="4 / 5" large reveal delay={180} className="mt-14 rotate-2" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SplitWords as="h2" id="platters-title" text={c.platters.title} className="display-1" />
            <p className="lede filet mt-6 max-w-[40ch]">{c.platters.text}</p>
            <Link href={contactRequestHref(locale, { topic: "platter" })} className="btn btn-primary mt-8">
              {c.platters.cta}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
