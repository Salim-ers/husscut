import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import { pathFor, type RouteKey } from "@/i18n/routes";

export const contactTopics = ["question", "availability", "platter"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export function isContactTopic(value: unknown): value is ContactTopic {
  return typeof value === "string" && (contactTopics as readonly string[]).includes(value);
}

/**
 * Lien vers le formulaire de demande, sujet et produit préremplis. Par défaut la page
 * « Commander » (disponibilité, commande, coffret) ; « contact » pour une simple question.
 * Les paramètres sont neutres (identiques en FR et EN) pour survivre au changement de langue.
 */
export function contactRequestHref(
  locale: Locale,
  options: { topic: ContactTopic; item?: string; page?: Extract<RouteKey, "order" | "contact"> },
): string {
  const params = new URLSearchParams({ topic: options.topic });
  if (options.item) params.set("item", options.item);
  return `${pathFor(locale, options.page ?? "order")}?${params.toString()}#${pageAnchors.requestForm[locale]}`;
}
