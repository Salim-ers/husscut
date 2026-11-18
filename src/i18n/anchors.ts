import { charcuterieGroups, meatCategories } from "@/content/catalogue";
import type { L10n, Locale } from "./config";

/** Ancres de page partageables, localisées. */
export const pageAnchors = {
  visit: { fr: "venir", en: "visit" },
  requestForm: { fr: "formulaire", en: "request-form" },
  platters: { fr: "coffrets", en: "boards-and-boxes" },
  halal: { fr: "halal", en: "halal" },
  map: { fr: "plan", en: "map" },
} as const satisfies Record<string, L10n>;

const allAnchors: readonly L10n[] = [
  ...Object.values(pageAnchors),
  ...meatCategories.map((category) => category.anchor),
  ...charcuterieGroups.map((group) => group.anchor),
];

/** Traduit une ancre (« #boeuf » → « #beef ») pour le sélecteur de langue. */
export function translateAnchor(hash: string, from: Locale, to: Locale): string | null {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return null;
  const match = allAnchors.find((anchor) => anchor[from] === id);
  return match ? match[to] : null;
}
