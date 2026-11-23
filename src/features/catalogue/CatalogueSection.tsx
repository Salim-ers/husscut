import Link from "next/link";
import { SplitWords } from "@/components/motion/SplitWords";
import { ArrowIcon } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import type { Product, Section } from "@/content/catalogue";
import type { Locale } from "@/i18n/config";
import { format, typo } from "@/i18n/typography";
import { contactRequestHref } from "@/features/contact/lib/topics";

interface Labels {
  /** Fin du nom accessible de chaque ligne (lecteurs d'écran), ex. « demander la disponibilité ». */
  rowHint: string;
  sectionCount: string;
}

/** Une section du catalogue (rayon ou famille) : nom, description, photo d'ambiance et liste. */
export function CatalogueSection<Id extends string>({
  section,
  locale,
  labels,
}: {
  section: Section<Id>;
  locale: Locale;
  labels: Labels;
}) {
  const titleId = `${section.anchor[locale]}-titre`;
  return (
    <section id={section.anchor[locale]} aria-labelledby={titleId} className="scroll-mt-36 border-t border-ivory/10 py-16 lg:scroll-mt-40 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-44">
            <SplitWords as="h2" id={titleId} text={section.name[locale]} className="display-2" />
            <p className="mt-4 max-w-[36ch] text-mute">{typo(locale, section.description[locale])}</p>
            <p className="mt-2 text-sm text-gold">{format(labels.sectionCount, { n: section.products.length })}</p>
            {section.ambiance ? (
              <Photo photo={section.ambiance} locale={locale} sizes="(min-width: 64rem) 30vw, 92vw" ratio="5 / 4" className="mt-8 hidden max-w-sm sm:block" reveal />
            ) : null}
          </div>
        </header>
        <ul className="lg:col-span-7 lg:col-start-6" role="list">
          {section.products.map((product) => (
            <ProductRow key={product.id} product={product} locale={locale} hint={labels.rowHint} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Ligne produit : toute la ligne mène à la demande, produit prérempli. */
function ProductRow({ product, locale, hint }: { product: Product; locale: Locale; hint: string }) {
  const name = typo(locale, product.name[locale]);
  const note = product.note ? typo(locale, product.note[locale]) : null;
  return (
    <li className="border-b border-ivory/10">
      <Link href={contactRequestHref(locale, { topic: "availability", item: product.id })} className="product-row">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[1.25rem] leading-tight font-semibold tracking-[0.02em]">{name}</h3>
          {note ? <span className="mt-1 block text-[0.9375rem] text-mute">{note}</span> : null}
          <span className="sr-only">, {hint}</span>
        </div>
        <ArrowIcon className="flex-none text-gold" />
      </Link>
    </li>
  );
}
