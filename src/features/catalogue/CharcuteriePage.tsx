import Link from "next/link";
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
  const labels = { askAvailability: dict.actions.askAvailability, sectionCount: dict.meats.sectionCount };
  return (
    <>
      <section className="pt-10 pb-16 lg:pt-16 lg:pb-24" aria-labelledby="page-title">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6">
          <div className="lg:col-span-5">
            <h1 id="page-title" className="display-1">
              {c.title}
            </h1>
            <p className="lede mt-6 max-w-[40ch] text-mute">{c.lede}</p>
            <nav aria-label={c.title} className="mt-8">
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
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Photo photo="coffretFleursJaunes" locale={locale} sizes="(min-width: 64rem) 48vw, 92vw" ratio="4 / 5" large eager className="cut-edge [--cut:14%]" />
          </div>
        </div>
      </section>

      <div className="surface-light pb-16">
        <div className="container-site">
          {charcuterieGroups.map((group) => (
            <CatalogueSection key={group.id} section={group} locale={locale} labels={labels} />
          ))}
          <p className="filet mt-4 max-w-[62ch] text-[0.9375rem] text-mute-ink">{c.speciesNote}</p>
        </div>
      </div>

      <section id={pageAnchors.platters[locale]} className="scroll-mt-20 bg-char py-20 lg:py-28" aria-labelledby="platters-title">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6">
          <div className="lg:col-span-5 lg:col-start-1">
            <Photo photo="coffretFromages" locale={locale} sizes="(min-width: 64rem) 40vw, 92vw" ratio="4 / 5" large reveal />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 id="platters-title" className="display-2">
              {c.platters.title}
            </h2>
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
