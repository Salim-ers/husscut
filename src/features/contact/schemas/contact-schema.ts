import { z } from "zod";
import { contactTopics, type ContactTopic } from "../lib/topics";

export const NAME_MAX = 80;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 1000;
export const PEOPLE_MIN = 1;
export const PEOPLE_MAX = 50;

export type ContactField = "name" | "replyTo" | "topic" | "item" | "people" | "date" | "message";
export type FieldErrorCode =
  | "nameRequired"
  | "nameTooLong"
  | "replyToInvalid"
  | "messageTooShort"
  | "messageTooLong"
  | "peopleInvalid"
  | "dateInvalid"
  | "topicInvalid";
export type FieldErrors = Partial<Record<ContactField, FieldErrorCode>>;

export interface ContactRequest {
  name: string;
  replyTo?: string;
  topic: ContactTopic;
  /** Identifiant produit (catalogue), uniquement pour « Disponibilité ou commande ». */
  item?: string;
  /** Uniquement pour « Planche ou coffret ». */
  people?: number;
  /** AAAA-MM-JJ, uniquement pour « Planche ou coffret ». */
  date?: string;
  message: string;
}

export type ContactInput = Partial<Record<ContactField, unknown>>;

const emptyToUndefined = (value: unknown) => (typeof value === "string" && value.trim() === "" ? undefined : value);
const PHONE = /^\+?[0-9 ().-]{9,20}$/;

export function isPhoneOrEmail(value: string): boolean {
  const trimmed = value.trim();
  if (z.email().safeParse(trimmed).success) return true;
  const digits = trimmed.replace(/\D/g, "");
  return PHONE.test(trimmed) && digits.length >= 9 && digits.length <= 15;
}

/** Date du jour à Paris, format AAAA-MM-JJ. */
export function parisToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/**
 * Schéma partagé navigateur / serveur. Les messages d'erreur sont des codes, traduits à l'affichage.
 * `requireReplyTo` : obligatoire en mode e-mail (en SMS, la boutique reçoit déjà le numéro).
 */
export function contactSchema(options: { requireReplyTo: boolean; today: string; isKnownItem: (id: string) => boolean }) {
  return z.object({
    name: z.string("nameRequired").trim().min(1, "nameRequired").max(NAME_MAX, "nameTooLong"),
    replyTo: options.requireReplyTo
      ? z.string("replyToInvalid").trim().max(254, "replyToInvalid").refine(isPhoneOrEmail, "replyToInvalid")
      : z.preprocess(emptyToUndefined, z.string().trim().max(120).optional()),
    topic: z.enum(contactTopics, "topicInvalid"),
    item: z.preprocess(emptyToUndefined, z.string().refine(options.isKnownItem).optional()),
    people: z.preprocess(
      (value) => (emptyToUndefined(value) === undefined ? undefined : Number(value)),
      z.number("peopleInvalid").int("peopleInvalid").min(PEOPLE_MIN, "peopleInvalid").max(PEOPLE_MAX, "peopleInvalid").optional(),
    ),
    date: z.preprocess(
      emptyToUndefined,
      z
        .string("dateInvalid")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "dateInvalid")
        .refine((date) => date >= options.today, "dateInvalid")
        .optional(),
    ),
    message: z.string("messageTooShort").trim().min(MESSAGE_MIN, "messageTooShort").max(MESSAGE_MAX, "messageTooLong"),
  });
}

export type ValidationResult = { success: true; data: ContactRequest } | { success: false; errors: FieldErrors };

const KNOWN_CODES = new Set<string>([
  "nameRequired",
  "nameTooLong",
  "replyToInvalid",
  "messageTooShort",
  "messageTooLong",
  "peopleInvalid",
  "dateInvalid",
  "topicInvalid",
]);

/** Valide une demande et ne garde que les champs utiles au sujet choisi. */
export function validateContact(
  input: ContactInput,
  options: { requireReplyTo: boolean; today: string; isKnownItem: (id: string) => boolean },
): ValidationResult {
  const result = contactSchema(options).safeParse(input);
  if (!result.success) {
    const errors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as ContactField | undefined;
      if (!field || errors[field]) continue;
      // Un produit inconnu (lien modifié à la main) est simplement ignoré, sans erreur affichée.
      if (field === "item") continue;
      errors[field] = (KNOWN_CODES.has(issue.message) ? issue.message : fallbackCode(field)) as FieldErrorCode;
    }
    if (Object.keys(errors).length === 0) {
      return validateContact({ ...input, item: undefined }, options);
    }
    return { success: false, errors };
  }

  const { name, replyTo, topic, item, people, date, message } = result.data;
  const data: ContactRequest = { name, topic, message };
  if (replyTo) data.replyTo = replyTo;
  if (topic === "availability" && item) data.item = item;
  if (topic === "platter") {
    if (people !== undefined) data.people = people;
    if (date) data.date = date;
  }
  return { success: true, data };
}

function fallbackCode(field: ContactField): FieldErrorCode {
  switch (field) {
    case "name":
      return "nameRequired";
    case "replyTo":
      return "replyToInvalid";
    case "people":
      return "peopleInvalid";
    case "date":
      return "dateInvalid";
    case "topic":
      return "topicInvalid";
    default:
      return "messageTooShort";
  }
}
