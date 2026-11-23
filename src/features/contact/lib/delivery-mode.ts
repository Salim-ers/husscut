import "server-only";
import { readEmailConfig } from "../services/email-delivery";

export type ContactDeliveryMode = "email" | "preview";

/**
 * Mode du formulaire : « email » si l'envoi est entièrement configuré (la demande part réellement
 * à la boutique) ; sinon « preview » : le formulaire fonctionne mais annonce clairement que la
 * demande n'a pas été transmise, et propose d'appeler la boutique. Jamais « envoyé » à tort.
 */
export function getContactDeliveryMode(): ContactDeliveryMode {
  return readEmailConfig() ? "email" : "preview";
}
