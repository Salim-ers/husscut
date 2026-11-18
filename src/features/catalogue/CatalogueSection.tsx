import Link from "next/link";
import { SplitWords } from "@/components/motion/SplitWords";
import { Photo } from "@/components/ui/Photo";
import type { Product, Section } from "@/content/catalogue";
import type { Locale } from "@/i18n/config";
import { format, typo } from "@/i18n/typography";
import { contactRequestHref } from "@/features/contact/lib/topics";

interface Labels {
  askAvailability: string;
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
    <section id={section.anchor[locale]} aria-labelledby={titleId} className="scroll-mt-36 border-t border-ink/15 py-14 lg:scroll-mt-40 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-44">
            <SplitWords as="h2" id={titleId} text={section.name[locale]} className="display-1" />
            <p className="mt-3 max-w-[36ch] text-mute-ink">{typo(locale, section.description[locale])}</p>
            <p className="mt-2 text-sm text-mute-ink">{format(labels.sectionCount, { n: section.products.length })}</p>
            {section.ambiance ? (
              <Photo
                photo={section.ambiance}
                locale={locale}
                sizes="(min-width: 64rem) 30vw, 92vw"
                ratio="5 / 4"
                className="mt-6 hidden max-w-sm sm:block"
                reveal
              />
            ) : null}
          </div>
        </header>
        <ul className="lg:col-span-7 lg:col-start-6" role="list">
          {section.products.map((product) => (
            <ProductRow key={product.id} product={product} locale={locale} labels={labels} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProductRow({ product, locale, labels }: { product: Product; locale: Locale; labels: Labels }) {
  const name = typo(locale, product.name[locale]);
  const note = product.note ? typo(locale, product.note[locale]) : null;
  return (
    <li className="product-row flex flex-col gap-1 border-b border-ink/12 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex items-center gap-4">
        {product.photo ? (
          <Photo photo={product.photo} locale={locale} sizes="112px" ratio="4 / 5" className="w-20 flex-none rounded-[14px] sm:w-24" />
        ) : null}
        <div>
          <h3 className="font-display text-[1.3rem] leading-tight font-semibold tracking-[0.02em]">{name}</h3>
          {note ? <p className="mt-0.5 text-[0.9375rem] text-mute-ink">{note}</p> : null}
        </div>
      </div>
      <Link
        href={contactRequestHref(locale, { topic: "availability", item: product.id })}
        className="product-cta"
      >
        {labels.askAvailability}
        <span className="sr-only"> : {name}</span>
      </Link>
    </li>
  );
}
