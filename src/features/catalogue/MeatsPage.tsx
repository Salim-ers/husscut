import { Marquee } from "@/components/motion/Marquee";
import { PageHero } from "@/components/shared/PageHero";
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
      <PageHero
        locale={locale}
        kicker={dict.meats.kicker}
        title={dict.meats.title}
        lede={dict.meats.lede}
        photo="steaksPersillesInox"
        secondPhoto="wagyuPlateau"
      />
      <div className="overflow-x-clip pb-4">
        <Marquee items={dict.home.marquee.cuts} duration={42} />
      </div>

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
