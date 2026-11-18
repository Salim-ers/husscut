import type { Locale } from "./config";

const NBSP = " ";

/**
 * Micro-typographie appliquée aux textes affichés :
 * - apostrophe typographique dans les deux langues ;
 * - en français, espace insécable avant : ; ! ? » et après «.
 */
export function typo(locale: Locale, text: string): string {
  let out = text.replace(/'/g, "’");
  if (locale === "fr") {
    out = out
      .replace(/ ([:;!?»])/g, `${NBSP}$1`)
      .replace(/« /g, `«${NBSP}`)
      .replace(/(\d) (h|%)/g, `$1${NBSP}$2`);
  }
  return out;
}

type Deep<T> = T extends string ? string : T extends readonly (infer U)[] ? Deep<U>[] : { [K in keyof T]: Deep<T[K]> };

/** Applique `typo` à toutes les chaînes d'un objet (dictionnaires). */
export function typoDeep<T>(locale: Locale, value: T): Deep<T> {
  if (typeof value === "string") return typo(locale, value) as Deep<T>;
  if (Array.isArray(value)) return value.map((item) => typoDeep(locale, item)) as Deep<T>;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, typoDeep(locale, item)])) as Deep<T>;
  }
  return value as Deep<T>;
}

/** Remplace {clé} par sa valeur. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/** Version texte brut (métadonnées, SMS) : retire les marqueurs d'exposant « ^ » et de relief « * ». */
export function plain(text: string): string {
  return text.replace(/[\^*]/g, "");
}
