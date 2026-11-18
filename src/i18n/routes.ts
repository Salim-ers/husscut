import { type Locale, locales } from "./config";

/**
 * Table de routage FR/EN : chaque page a un segment stable par langue.
 * C'est la seule source pour les liens, le sélecteur de langue, hreflang et le sitemap.
 */
export const routeSegments = {
  home: { fr: "", en: "" },
  meats: { fr: "viandes", en: "meats" },
  charcuterie: { fr: "charcuterie", en: "charcuterie" },
  house: { fr: "la-maison", en: "our-shop" },
  order: { fr: "commander", en: "order" },
  contact: { fr: "contact", en: "contact" },
  legal: { fr: "mentions-legales", en: "legal-notice" },
  privacy: { fr: "confidentialite", en: "privacy" },
  cookies: { fr: "cookies", en: "cookies" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routeSegments;
export const routeKeys = Object.keys(routeSegments) as RouteKey[];

/** Pages présentes dans le menu principal ; « Commander » y figure comme bouton d'action. */
export const mainNavigation: readonly RouteKey[] = ["meats", "charcuterie", "house", "contact", "order"];

/** Plan du site (pied de page). */
export const siteMap: readonly RouteKey[] = ["home", "meats", "charcuterie", "house", "order", "contact"];

export function pathFor(locale: Locale, key: RouteKey): string {
  const segment = routeSegments[key][locale];
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

/** Retrouve la page correspondant à un chemin, quelle que soit la langue. */
export function matchRoute(pathname: string): { locale: Locale; key: RouteKey } | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  for (const locale of locales) {
    for (const key of routeKeys) {
      if (pathFor(locale, key) === clean) return { locale, key };
    }
  }
  return null;
}

/** Chemin équivalent dans une autre langue (le sélecteur garde la même page). */
export function equivalentPath(pathname: string, target: Locale): string {
  const match = matchRoute(pathname);
  return match ? pathFor(target, match.key) : pathFor(target, "home");
}
