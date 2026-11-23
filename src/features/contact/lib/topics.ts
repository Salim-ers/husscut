import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";

export const contactTopics = ["question", "availability", "platter"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export function isContactTopic(value: unknown): value is ContactTopic {
  return typeof value === "string" && (contactTopics as readonly string[]).includes(value);
}

/**
 * Lien vers le formulaire de demande de la page « Commander » (seul formulaire du site),
 * sujet et produit préremplis.
 * Les paramètres sont neutres (identiques en FR et EN) pour survivre au changement de langue.
 */
export function contactRequestHref(
  locale: Locale,
  options: { topic: ContactTopic; item?: string },
): string {
  const params = new URLSearchParams({ topic: options.topic });
  if (options.item) params.set("item", options.item);
  return `${pathFor(locale, "order")}?${params.toString()}#${pageAnchors.requestForm[locale]}`;
}
