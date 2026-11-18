import "server-only";
import type { Locale } from "./config";
import en from "./dictionaries/en";
import fr, { type Dictionary } from "./dictionaries/fr";
import { typoDeep } from "./typography";

const prepared: Record<Locale, Dictionary> = {
  fr: typoDeep("fr", fr),
  en: typoDeep("en", en),
};

/** Dictionnaire prêt à afficher (micro-typographie déjà appliquée). */
export function getDictionary(locale: Locale): Dictionary {
  return prepared[locale];
}

export type { Dictionary };
