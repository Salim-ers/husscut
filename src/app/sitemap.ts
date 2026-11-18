import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { pathFor, routeKeys } from "@/i18n/routes";
import { absoluteUrl, isIndexable } from "@/lib/site";

/** Sitemap bilingue avec alternates hreflang ; vide hors production. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable) return [];
  return routeKeys.flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(pathFor(locale, route)),
      changeFrequency: route === "home" || route === "meats" || route === "charcuterie" ? ("weekly" as const) : ("yearly" as const),
      priority: route === "home" ? 1 : ["legal", "privacy", "cookies"].includes(route) ? 0.2 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((alt) => [alt, absoluteUrl(pathFor(alt, route))])),
      },
    })),
  );
}
