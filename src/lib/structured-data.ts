import { business, type Weekday } from "@/content/business";
import type { Locale } from "@/i18n/config";
import { pathFor, type RouteKey } from "@/i18n/routes";
import { absoluteUrl } from "./site";

const schemaDay: Record<Weekday, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

/**
 * Données structurées de la boutique. Pas de note agrégée (AggregateRating) ni de prix.
 * Les horaires ne sont publiés qu'une fois confirmés par HussCut.
 */
export function storeJsonLd(locale: Locale, description: string) {
  const openingHoursSpecification = business.hours.confirmed
    ? Object.entries(business.hours.weekly).flatMap(([day, ranges]) =>
        ranges.map(([opens, closes]) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${schemaDay[day as Weekday]}`,
          opens,
          closes,
        })),
      )
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${absoluteUrl("/fr")}#store`,
    name: business.name,
    description,
    url: absoluteUrl(pathFor(locale, "home")),
    image: absoluteUrl("/opengraph-image.jpg"),
    telephone: business.phone.international,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressCountry: business.address.countryCode,
    },
    sameAs: [business.instagram.url],
    ...(openingHoursSpecification ? { openingHoursSpecification } : {}),
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { route: RouteKey; name: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(pathFor(locale, item.route)),
    })),
  };
}

/** Sérialisation sûre pour <script type="application/ld+json">. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
