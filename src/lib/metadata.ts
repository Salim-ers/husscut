import type { Metadata } from "next";
import { type Locale, locales, openGraphLocale } from "@/i18n/config";
import { pathFor, type RouteKey } from "@/i18n/routes";
import { plain } from "@/i18n/typography";
import { absoluteUrl, isIndexable } from "./site";

interface PageMetaInput {
  locale: Locale;
  route: RouteKey;
  title: string;
  description: string;
  /** Titre complet, sans gabarit (accueil). */
  absoluteTitle?: boolean;
  siteName: string;
  ogAlt: string;
}

/** Métadonnées d'une page : titre, description, canonical, hreflang, Open Graph, robots. */
export function pageMetadata(input: PageMetaInput): Metadata {
  const path = pathFor(input.locale, input.route);
  const languages = Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(pathFor(locale, input.route))]));
  const title = plain(input.title);
  const description = plain(input.description);

  return {
    title: input.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: { ...languages, "x-default": absoluteUrl(pathFor("fr", input.route)) },
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      siteName: input.siteName,
      title,
      description,
      locale: openGraphLocale[input.locale],
      alternateLocale: locales.filter((l) => l !== input.locale).map((l) => openGraphLocale[l]),
      images: [{ url: absoluteUrl("/opengraph-image.jpg"), width: 1200, height: 630, alt: input.ogAlt }],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}
