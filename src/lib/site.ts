/** URL publique du site, sans barre finale. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

/** Seul l'environnement de production est indexable par les moteurs. */
export const isIndexable = process.env.SITE_ENV === "production";

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
