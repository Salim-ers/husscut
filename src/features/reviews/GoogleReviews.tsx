import type { CSSProperties } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ExternalIcon, StarIcon } from "@/components/ui/icons";
import { business } from "@/content/business";
import { googleReviews } from "@/content/reviews";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { format, typo } from "@/i18n/typography";

/**
 * Bloc « Avis Google » : extraits fidèles (tronqués comme sur Google, sans suite inventée),
 * initiales seulement, note de chaque avis, lien vers la fiche. Pas de note globale.
 * La grille s'adapte au nombre d'avis fournis dans src/content/reviews.ts.
 * Si l'affichage des extraits est désactivé, seul le lien vers la fiche reste.
 */
export function GoogleReviews({ locale, dict, newTabLabel }: { locale: Locale; dict: Dictionary["reviews"]; newTabLabel: string }) {
  const showExcerpts = business.reviews.showExcerpts && googleReviews.length > 0;
  return (
    <section className="glow-red relative overflow-hidden py-24 lg:py-32" aria-labelledby="reviews-title">
      <span
        aria-hidden="true"
        data-text="“"
        className="deco-text pointer-events-none absolute -top-10 right-[-2rem] font-[family-name:var(--font-serif-italic)] text-[18rem] leading-none text-crimson/40 italic select-none lg:text-[26rem]"
      />
      <div className="container-site relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker" data-reveal="up">
              {dict.kicker}
            </p>
            <SplitWords as="h2" id="reviews-title" text={dict.title} className="display-1 mt-5 max-w-[18ch]" />
            {showExcerpts ? (
              <p className="mt-5 max-w-md text-mute" data-reveal="up">
                {dict.intro}
              </p>
            ) : null}
          </div>
          <ExternalLink href={business.googleListing.url} newTabLabel={newTabLabel} className="btn btn-secondary self-start lg:self-auto">
            {dict.seeAll}
            <ExternalIcon />
          </ExternalLink>
        </div>

        {showExcerpts ? (
          <ul
            className={`mt-16 grid gap-6 lg:gap-8 ${googleReviews.length > 2 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2"}`}
            role="list"
          >
            {googleReviews.map((review, index) => (
              <li
                key={review.id}
                data-reveal="up"
                style={{ "--d": index * 140 } as CSSProperties}
                className={index % 2 === 1 ? "md:mt-14" : undefined}
              >
                <figure className="flex h-full flex-col rounded-[24px] border border-ivory/12 bg-char/70 p-7 sm:p-10">
                  <p className="flex gap-1 text-gold" role="img" aria-label={format(dict.rating, { n: review.rating })}>
                    {Array.from({ length: 5 }, (_, star) => (
                      <StarIcon key={star} className={star < review.rating ? "" : "opacity-25"} />
                    ))}
                  </p>
                  <blockquote className="mt-6 flex-1">
                    <p className="font-[family-name:var(--font-serif-italic)] text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-[1.25] italic">
                      {locale === "fr" ? `« ${review.original} […] »` : `“${typo("en", review.translation)} […]”`}
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-ivory/12 pt-5 text-[0.9375rem]">
                    <span aria-hidden="true" className="font-display inline-flex size-11 flex-none items-center justify-center rounded-full bg-crimson text-[0.8rem] font-semibold tracking-wide text-ivory">
                      {review.author.replace(/[^A-Z]/g, "").slice(0, 2)}
                    </span>
                    <span>
                      <span className="font-semibold">{review.author}</span>
                      <span className="block text-mute">
                        {dict.source}, {dict.excerpt.toLowerCase()}
                        {dict.translated ? `. ${dict.translated}.` : "."}
                      </span>
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
