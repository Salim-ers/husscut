import { PageHero } from "@/components/shared/PageHero";
import { meatCategories } from "@/content/catalogue";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { CatalogueFilter } from "./CatalogueFilter";
import { CatalogueSection } from "./CatalogueSection";
import { OrderPanel } from "./OrderPanel";

const LIST_ID = { fr: "etal", en: "counter" } as const;

/** « Les viandes » : étal éditorial filtrable par rayon, sans prix ni panier. */
export function MeatsPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const labels = { rowHint: dict.catalogue.rowHint, sectionCount: dict.meats.sectionCount };
  return (
    <>
      <PageHero locale={locale} kicker={dict.meats.kicker} title={dict.meats.title} lede={dict.meats.lede} photo="steaksPersillesInox" />

      <div className="container-site pb-8">
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
        <p className="mt-10 max-w-[62ch] text-[0.9375rem] text-mute">{dict.meats.footnote}</p>
      </div>

      <OrderPanel locale={locale} dict={dict} />
    </>
  );
}
