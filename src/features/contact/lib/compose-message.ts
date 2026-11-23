import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/typography";
import type { ContactRequest } from "../schemas/contact-schema";
import type { ContactTopic } from "./topics";

export interface MessageCopy {
  greeting: string;
  topic: string;
  product: string;
  people: string;
  date: string;
  sentFrom: string;
  topics: Record<ContactTopic, string>;
}

/** « 2026-11-21 » → « samedi 21 novembre 2026 » / « Saturday 21 November 2026 ». */
export function formatRequestDate(locale: Locale, isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Texte de la demande, utilisé comme corps de l'e-mail reçu par la boutique.
 * Les espaces insécables sont remplacées par des espaces simples (lecture dans tout client e-mail).
 */
export function composeRequestText(
  request: ContactRequest,
  context: { locale: Locale; copy: MessageCopy; productName?: string },
): string {
  const { copy, locale } = context;
  const lines = [format(copy.greeting, { name: request.name }), format(copy.topic, { topic: copy.topics[request.topic] })];
  if (request.topic === "availability" && context.productName) lines.push(format(copy.product, { product: context.productName }));
  if (request.topic === "platter" && request.people !== undefined) lines.push(format(copy.people, { n: request.people }));
  if (request.topic === "platter" && request.date) lines.push(format(copy.date, { date: formatRequestDate(locale, request.date) }));
  if (request.replyTo) lines.push(request.replyTo);
  lines.push("", request.message.trim(), "", copy.sentFrom);
  return lines.join("\n").replace(/ /g, " ");
}
