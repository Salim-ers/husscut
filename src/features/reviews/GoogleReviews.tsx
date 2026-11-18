import { ExternalLink } from "@/components/ui/ExternalLink";
import { ExternalIcon, StarIcon } from "@/components/ui/icons";
import { business } from "@/content/business";
import { googleReviews } from "@/content/reviews";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { format, typo } from "@/i18n/typography";

/**
 * Bloc « Avis Google » : extraits fidèles (tronqués comme sur Google, sans suite inventée),
 * initiales seulement, note de chaque avis, lien vers la fiche. Pas de note globale figée.
 * Si l'affichage des extraits est désactivé, seul le lien vers la fiche reste.
 */
export function GoogleReviews({ locale, dict, newTabLabel }: { locale: Locale; dict: Dictionary["reviews"]; newTabLabel: string }) {
  const showExcerpts = business.reviews.showExcerpts && googleReviews.length > 0;
  return (
    <section className="surface-light py-20 lg:py-28" aria-labelledby="reviews-title">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <h2 id="reviews-title" className="display-2">
            {dict.title}
          </h2>
          {showExcerpts ? <p className="mt-4 max-w-sm text-mute-ink">{dict.intro}</p> : null}
          <ExternalLink href={business.googleListing.url} newTabLabel={newTabLabel} className="btn btn-secondary mt-8">
            {dict.seeAll}
            <ExternalIcon />
          </ExternalLink>
        </div>

        {showExcerpts ? (
          <ul className="grid gap-10 md:grid-cols-2 lg:col-span-8 lg:gap-8" role="list">
            {googleReviews.map((review, index) => (
              <li key={review.id} className={index === 1 ? "md:mt-16" : undefined}>
                <figure className="filet">
                  <p className="flex gap-0.5 text-bronze" role="img" aria-label={format(dict.rating, { n: review.rating })}>
                    {Array.from({ length: 5 }, (_, star) => (
                      <StarIcon key={star} className={star < review.rating ? "" : "opacity-25"} />
                    ))}
                  </p>
                  <blockquote className="mt-4">
                    <p className="font-[family-name:var(--font-display-italic)] text-[1.5rem] leading-snug italic">
                      {locale === "fr" ? `«\u00a0${review.original} […]\u00a0»` : `“${typo("en", review.translation)} […]”`}
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 text-[0.9375rem]">
                    <span className="font-semibold">{review.author}</span>
                    <span className="block text-mute-ink">
                      {dict.source}, {dict.excerpt.toLowerCase()}
                      {dict.translated ? `. ${dict.translated}.` : "."}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
