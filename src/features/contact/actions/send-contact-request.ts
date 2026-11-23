"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { findProduct } from "@/content/catalogue";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { composeRequestText } from "../lib/compose-message";
import { createRateLimiter } from "../lib/rate-limit";
import { type FieldErrors, parisToday, validateContact } from "../schemas/contact-schema";
import { readEmailConfig, sendRequestEmail } from "../services/email-delivery";

export type ContactActionState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "sent" }
  | { status: "failed" }
  | { status: "rateLimited" };

const MIN_FILL_TIME_MS = 2500;
const allow = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
const requestIdSchema = z.uuid();

/**
 * Envoi d'une demande par e-mail (mode activé uniquement si RESEND_API_KEY, CONTACT_TO_EMAIL
 * et CONTACT_FROM_EMAIL sont définis). Validation serveur, champ piège, délai minimal de saisie,
 * limitation de débit et clé d'idempotence. « sent » n'est renvoyé qu'après acceptation
 * par le prestataire.
 */
export async function sendContactRequest(_previous: ContactActionState, formData: FormData): Promise<ContactActionState> {
  const config = readEmailConfig();
  if (!config) return { status: "failed" };

  const locale = formData.get("locale");
  if (!isLocale(locale)) return { status: "failed" };

  // Champ piège invisible pour les humains, et délai minimal entre affichage et envoi.
  const trap = formData.get("website");
  const startedAt = Number(formData.get("startedAt"));
  if ((typeof trap === "string" && trap.length > 0) || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return { status: "failed" };
  }

  const requestId = requestIdSchema.safeParse(formData.get("requestId"));
  if (!requestId.success) return { status: "failed" };

  const forwarded = (await headers()).get("x-forwarded-for") ?? "";
  const clientKey = forwarded.split(",")[0]?.trim() || "unknown";
  if (!allow(clientKey)) return { status: "rateLimited" };

  const result = validateContact(
    {
      name: formData.get("name"),
      replyTo: formData.get("replyTo"),
      topic: formData.get("topic"),
      item: formData.get("item"),
      people: formData.get("people"),
      date: formData.get("date"),
      message: formData.get("message"),
    },
    { requireReplyTo: true, today: parisToday(), isKnownItem: (id) => Boolean(findProduct(id)) },
  );
  if (!result.success) return { status: "invalid", errors: result.errors };

  const dict = getDictionary(locale);
  const form = dict.contact.form;
  const request = result.data;
  const product = request.item ? findProduct(request.item) : undefined;
  const text = composeRequestText(request, {
    locale,
    copy: { ...form.lines, topics: form.topics },
    productName: product?.name[locale],
  });
  const replyIsEmail = request.replyTo ? z.email().safeParse(request.replyTo).success : false;

  const outcome = await sendRequestEmail(config, {
    subject: `${form.topics[request.topic]} — ${request.name}`,
    text,
    replyTo: replyIsEmail ? request.replyTo : undefined,
    idempotencyKey: requestId.data,
  });

  return outcome.ok ? { status: "sent" } : { status: "failed" };
}
