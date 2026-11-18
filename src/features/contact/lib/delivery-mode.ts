import "server-only";
import { readEmailConfig } from "../services/email-delivery";

/** Mode du formulaire : e-mail si l'envoi est entièrement configuré, sinon « Préparer mon SMS ». */
export function getContactDeliveryMode(): "sms" | "email" {
  return readEmailConfig() ? "email" : "sms";
}
