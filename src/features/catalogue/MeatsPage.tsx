import { Photo } from "@/components/ui/Photo";
import { meatCategories } from "@/content/catalogue";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { CatalogueFilter } from "./CatalogueFilter";
import { CatalogueSection } from "./CatalogueSection";

const LIST_ID = { fr: "etal", en: "counter" } as const;

/** « Les viandes » : étal éditorial filtrable par rayon, sans prix ni panier. */
export function MeatsPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const labels = { askAvailability: dict.actions.askAvailability, sectionCount: dict.meats.sectionCount };
  return (
    <>
      <section className="pt-10 pb-16 lg:pt-16 lg:pb-24" aria-labelledby="page-title">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-6">
            <h1 id="page-title" className="display-1">
              {dict.meats.title}
            </h1>
            <p className="lede mt-6 max-w-[44ch] text-mute">{dict.meats.lede}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Photo photo="steaksPersillesInox" locale={locale} sizes="(min-width: 64rem) 40vw, 92vw" ratio="4 / 5" large eager className="cut-edge [--cut:14%]" />
          </div>
        </div>
      </section>

      <div className="surface-light pb-20">
        <div className="container-site">
          <CatalogueFilter
            listId={LIST_ID[locale]}
            labels={{ filterLabel: dict.meats.filterLabel, all: dict.meats.all, count: dict.meats.count, countOne: dict.meats.countOne }}
            sections={meatCategories.map((category) => ({
              id: category.id,
              anchor: category.anchor[locale],
              label: category.name[locale],
              count: category.products.length,
              node: <CatalogueSection section={category} locale={locale} labels={labels} />,
            }))}
          />
          <p className="filet mt-12 max-w-[62ch] text-[0.9375rem] text-mute-ink">{dict.meats.footnote}</p>
        </div>
      </div>
    </>
  );
}
