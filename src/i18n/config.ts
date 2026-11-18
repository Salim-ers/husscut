export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export const openGraphLocale: Record<Locale, string> = { fr: "fr_FR", en: "en_GB" };

/** Texte localisé simple. */
export type L10n = Record<Locale, string>;

export function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}
