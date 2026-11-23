import Link from "next/link";
import { SplitWords } from "@/components/motion/SplitWords";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowIcon } from "@/components/ui/icons";
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
  const labels = { rowHint: dict.catalogue.rowHint, sectionCount: dict.meats.sectionCount };
  return (
    <>
      <PageHero locale={locale} kicker={c.kicker} title={c.title} lede={c.lede} photo="tranchesPersillees">
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

      <div className="container-site pb-8">
        {charcuterieGroups.map((group) => (
          <CatalogueSection key={group.id} section={group} locale={locale} labels={labels} />
        ))}
        <p className="mt-4 max-w-[62ch] text-[0.9375rem] text-mute">{c.speciesNote}</p>
      </div>

      <section id={pageAnchors.platters[locale]} className="section scroll-mt-24" aria-labelledby="platters-title">
        <div className="container-site">
          <div className="panel-blood grid gap-10 p-5 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-6 lg:p-14">
            <div className="grid grid-cols-2 gap-4 lg:col-span-6">
              <Photo photo="coffretFromages" locale={locale} sizes="(min-width: 64rem) 22vw, 44vw" ratio="4 / 5" large reveal />
              <Photo photo="rosaceCharcuterie" locale={locale} sizes="(min-width: 64rem) 22vw, 44vw" ratio="4 / 5" large reveal delay={150} className="mt-10" />
            </div>
            <div className="px-2 pb-2 lg:col-span-5 lg:col-start-8 lg:p-0">
              <SplitWords as="h2" id="platters-title" text={c.platters.title} className="display-1" />
              <p className="lede mt-6 max-w-[40ch] text-ivory/85">{c.platters.text}</p>
              <Link href={contactRequestHref(locale, { topic: "platter" })} className="btn btn-primary mt-8">
                {c.platters.cta}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
